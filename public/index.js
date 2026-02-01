$(document).ready(function () {
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function casing(string) {
    if (!string) return "";
    return string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  var codeValue = getUrlParameter("code");

  if (!codeValue) {
    $(".page-title").text("Subject Not Found");
    $("main").html('<div class="glass-panel" style="text-align:center"><h3>No subject code provided.</h3></div>');
    return;
  }

  var filePath = "./info/" + codeValue + ".json";

  $.getJSON(filePath, function (data) {
    var subjectData = data[0]; // Assuming array structure
    var fileName = casing(subjectData.name);

    // Update Titles
    $(".page-title").text(subjectData.code + ": " + fileName);
    document.title = fileName + " | Resources";

    // 1. Render Units Table
    var unitTableBody = $("#unitTableBody");
    unitTableBody.empty();

    $.each(subjectData.units, function (index, unit) {
      var row = $("<tr></tr>");

      // Unit Name Column
      row.append("<td>" + casing(unit.name) + "</td>");

      // Action Column
      if (subjectData.syllabus === true) {
        // If syllabus is true, maybe logic differs? 
        // Based on original code: $('th:contains("Syllabus")').remove(); 
        // I'll assume we hide action if syllabus is true or handled elsewhere
        row.append("<td>-</td>");
      } else {
        // Add View Button
        row.append(
          `<td>
            <span class="action-btn unitLink" data-index="${index}">
                View Syllabus
            </span>
           </td>`
        );
      }
      unitTableBody.append(row);
    });

    // 2. Render Resources (if any)
    if (subjectData.links && subjectData.links.length > 0) {
      $(".resources-section").fadeIn();
      var $resGrid = $(".resources-grid");
      $resGrid.empty();

      $.each(subjectData.links, function (index, linkObj) {
        var card = `
            <a href="${linkObj.link}" target="_blank" class="resource-card">
                <span>${linkObj.name}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" fill="#8ad10c"/>
                </svg>
            </a>
        `;
        $resGrid.append(card);
      });
    }

    // 3. Handle Syllabus Click
    $(document).on("click", ".unitLink", function () {
      var index = $(this).data("index");
      var unit = subjectData.units[index];
      var unitInfo = $("#unitInfo");

      // Clear and Rebuild
      unitInfo.empty();
      unitInfo.append("<h3>" + casing(unit.name) + "</h3>");

      var topicsList = $("<ul></ul>");

      $.each(unit.topics, function (i, topic) {
        var topicItem = $("<li><strong>" + topic.topic + "</strong></li>");
        var subTopicsList = $("<ul></ul>");

        $.each(topic.subTopics, function (j, subTopic) {
          subTopicsList.append("<li>" + subTopic + "</li>");
        });

        topicItem.append(subTopicsList);
        topicsList.append(topicItem);
      });

      unitInfo.append(topicsList);

      // Show section and smooth scroll
      $(".info-section").fadeIn();

      $('html, body').animate({
        scrollTop: $(".info-section").offset().top - 80 // Offset for sticky navbar
      }, 500);
    });

  }).fail(function () {
    $(".page-title").text("Error");
    $("main").html(`
        <div class="glass-panel" style="text-align:center; color: #ff6b6b;">
            <h3>Failed to load subject data.</h3>
            <p>Please check if the file exists or try again later.</p>
        </div>
    `);
  });
});