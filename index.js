$(document).ready(function () {
  const filePath = "subjects.json";
  let subjectsData = [];
  const $grid = $(".subjects-grid");

  const STORAGE_KEY = "selected_filter";

  function applyFilter(filterValue) {
    localStorage.setItem(STORAGE_KEY, filterValue);
    $(".filter-pill").removeClass("active");
    $(`.filter-pill[data-filter="${filterValue}"]`).addClass("active");

    if (filterValue === "all") {
      displaySubjects(subjectsData);
    } else {
      const [year, sem] = filterValue.toString().split(".").map(Number);
      const filtered = subjectsData.filter(s => s.year === year && s.sem === sem);
      displaySubjects(filtered);
    }
  }

  // Function to render subject cards
  function displaySubjects(subjects) {
    $grid.empty();

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
                    ${subject.year && subject.sem
          ? `<span class="badge badge-year">${subject.year}.${subject.sem}</span>`
          : ""
        }
                    ${subject.credits
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
      const classes = $(this).attr("class").split(/\s+/);
      const code = classes.find(c => c !== "subject-card");

      if (code) {
        const redirectURL = `./public/?code=${code}`;
        window.open(redirectURL, "_self");
      }
    });
  }

  // Fetch JSON
  $.getJSON(filePath, function (data) {
    subjectsData = data;

    const savedFilter = localStorage.getItem(STORAGE_KEY) || "all";
    applyFilter(savedFilter);
    
  }).fail(function () {
    $grid.html('<div class="loading-state"><p>Error loading data.</p></div>');
  });

  // Filter Logic
  $(".filter-pill").click(function () {
    const filterValue = $(this).data("filter");
    applyFilter(filterValue);
  });
});