$(document).ready(function () {
  const filePath = "subjects.json";
  let subjectsData = [];
  const $grid = $(".subjects-grid");

  // Function to render subject cards
  function displaySubjects(subjects) {
    $grid.empty(); // Clear current content

    if (subjects.length === 0) {
      $grid.append(
        '<div class="loading-state"><p>No subjects found for this selection.</p></div>'
      );
      return;
    }

    $.each(subjects, function (index, subject) {
      // 1. Build Tags HTML
      let tagsHtml = "";
      if (subject.tags) {
        $.each(subject.tags, function (i, tag) {
          tagsHtml += `<span class="tag">#${tag}</span>`;
        });
      }

      // 2. Build Info String
      let infoText = "";
      if (subject.info) {
        infoText = Object.values(subject.info).join("; ");
      }

      // 3. Create Card HTML
      const cardHtml = `
        <div class="subject-card ${subject.code}" role="button" tabindex="0">
            <div class="card-header">
                <h2>${subject.name}</h2>
                <div class="badges">
                    ${
                      subject.year && subject.sem
                        ? `<span class="badge badge-year">${subject.year}.${subject.sem}</span>`
                        : ""
                    }
                    ${
                      subject.credits
                        ? `<span class="badge badge-credits">${subject.credits} Credits</span>`
                        : ""
                    }
                </div>
            </div>
            
            <div class="tags-container">
                ${tagsHtml}
            </div>

            <p class="card-info">${infoText}.</p>

            <div class="card-footer">
                <button class="open-btn" aria-label="Open Resources">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"/>
                    </svg>
                </button>
            </div>
        </div>
      `;

      $grid.append(cardHtml);
    });

    // Handle Card Click (Delegated event)
    $(".subject-card").off("click").on("click", function () {
        // Extract code from class list (assuming logic: class="subject-card CS3101")
        // NOTE: Ensure your JSON codes don't have spaces or match other class names
        const classes = $(this).attr("class").split(/\s+/);
        // Find the class that isn't 'subject-card' (Simple logic, can be improved based on JSON data structure)
        const code = classes.find(c => c !== "subject-card");
        
        if(code) {
             const redirectURL = `./public/?code=${code}`;
             window.open(redirectURL, "_blank");
        }
    });
  }

  // Fetch JSON
  $.getJSON(filePath, function (data) {
    subjectsData = data;
    displaySubjects(subjectsData); // Show all initially
  }).fail(function() {
      $grid.html('<div class="loading-state"><p>Error loading data.</p></div>');
  });

  // Filter Logic
  $(".filter-pill").click(function () {
    // UI Updates
    $(".filter-pill").removeClass("active");
    $(this).addClass("active");

    const filterValue = $(this).data("filter");

    if (filterValue === "all") {
      displaySubjects(subjectsData);
    } else {
      // Logic: filterValue is string "3.1", split into numbers
      const [year, sem] = filterValue.toString().split(".").map(Number);
      
      const filtered = subjectsData.filter(
        (s) => s.year === year && s.sem === sem
      );
      displaySubjects(filtered);
    }
  });
});