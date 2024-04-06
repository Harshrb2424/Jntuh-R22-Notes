$(document).ready(function () {
    $(".table").fadeIn();
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var codeValue = getUrlParameter("code");
    console.log(codeValue);
    $(".title").text(codeValue);
    var filePath = "info/" + codeValue + ".json";
    console.log(filePath);
    $.getJSON(filePath, function (data) {
      var fileName = casing(data[0].name);

      function casing(string) {
        return string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
          return a.toUpperCase();
        });
      }
      console.log(data);
      console.log(data);
      console.log(fileName);
      $(".title").text(data[0].code + ": " + fileName);

      var unitTableBody = $("#unitTableBody");
      $.each(data[0].units, function (index, unit) {
        var row = $("<tr></tr>");
        row.append("<td>" + casing(unit.name) + "</td>");
        if (data[0].syllabus == true) {
          $('th:contains("Syllabus")').remove();
        }
        !data[0].syllabus &&
          row.append(
            '<td><a class="unitLink" data-index="' +
              index +
              '">' +
              "View Syllabus</a></td>"
          );
        unitTableBody.append(row);
      });
      $(".unitLink").click(function () {
        var index = $(this).data("index");
        var unit = data[0].units[index];
        var unitInfo = $("#unitInfo");
        unitInfo.empty();
        unitInfo.append("<h3>" + unit.name + "</h3>");
        var topicsList = $("<ul></ul>");
        $.each(unit.topics, function (index, topic) {
          var topicItem = $("<li>" + topic.topic + "</li>");
          var subTopicsList = $("<ul></ul>");
          $.each(topic.subTopics, function (index, subTopic) {
            subTopicsList.append("<li>" + subTopic + "</li>");
          });
          topicItem.append(subTopicsList);
          topicsList.append(topicItem);
        });
        unitInfo.append(topicsList);
        $(".info").fadeIn();
        var infoElement = $(".info");
        $("html, body").animate(
          {
            scrollTop: infoElement.offset().top,
          },
          200
        );
      });

      if (data[0].links) {
        $.each(data[0].links, function (index, linkObj) {
          $(".resources").slideDown();
          var link = $(
            "<p>" +
              linkObj["name"] +
              ': <a href="' +
              linkObj.link +
              '" target="_blank">view</a></p>'
          );
          $(".resources").append(link);
        });
      } else {
      }
    }).fail(function() {
            $('h2').text('Error fetching details');
            $('table').hide();
        });
  });