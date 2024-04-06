$(document).ready(function () {
  function displaySubjects(subjects) {
    console.log(subjects);
    $(".subjects").empty();
    $.each(subjects, function (index, subject) {
      var $newSubject = $(
        '<div class="click ' + subject.code + ' subject "></div>'
      );
      $newSubject.append("<h1>" + subject.name + "</h1>");
      var $tagsDiv = $('<div class="tags"></div>');

      subject.year &&
        subject.sem &&
        $newSubject.append(
          "<p>Year " + subject.year + " Sem " + subject.sem + "</p>"
        );
      subject.credits &&
        $newSubject.append("<p>Credits: " + subject.credits + "</p>");

      $.each(subject.tags, function (i, tag) {
        $tagsDiv.append("<p>#" + tag + "</p>");
      });
      $newSubject.append($tagsDiv);
      var array = "";
      $.each(subject.info, function (i, tag) {
        array += i == 0 ? tag : `; ${tag}`;
      });
      $newSubject.append("<p class='info'>" + array + ".</p>");
      var $buttonDiv = $('<div class="button"></div>');
      $buttonDiv.append(
        '<button class="click ' + subject.code + '">></button>'
      );
      $newSubject.append($buttonDiv);
      $(".subjects").append($newSubject);
      $(".click").click(function (event) {
        event.preventDefault();
        var classNames = $(this).attr("class").split(" ");
        console.log(classNames);
        var redirectURL = `./public/?code=${classNames[1]}`;
        window.open(redirectURL, "_blank");
      });
    });
  }
  const filePath = "subjects.json";
  $.getJSON(filePath, function (subjectsData) {
    displaySubjects(subjectsData);
  });

  //? Styling
  $(".click-year").click(change);
  $(".click-sem").click(change);
  $(".click-tag").click(change);

  var sort = {
    year: [1, 2, 3, 4],
    sem: [1, 2],
    tags: ["Mathematics and Physics", "Engineering Fundamentals"],
  };
  var first = 0;
  function change() {
    if ($(this).hasClass("inActive")) {
      $(this).removeClass("inActive").addClass("active");
    } else if ($(this).hasClass("active")) {
      $(this).removeClass("active").addClass("inActive");
    }
    sort["year"] = [];
    sort["sem"] = [];
    sort["tags"] = [];
    $(".click-year.active").each(function () {
      var content = $(this).text();
      sort["year"].push(parseInt(content));
      console.log(sort);

      if (first == 0)
        $(".click-sem").removeClass("inActive").addClass("active");
    });
    $(".click-sem.active").each(function () {
      var content = $(this).text();
      sort["sem"].push(parseInt(content));
      console.log(sort);

      if (first == 0)
        $(".click-tag").removeClass("inActive").addClass("active");
      first++;
    });
    $(".click-tag.active").each(function () {
      var content = $(this).text();
      sort["tags"].push(content);
      console.log(sort);
    });
    function filterCourses(courses, filters) {
      return courses.filter((course) => {
        return Object.keys(filters).every((key) => {
          if (Array.isArray(filters[key])) {
            if (key === "tags") {
              return filters[key].some((tag) => course[key].includes(tag));
            } else {
              return filters[key].includes(course[key]);
            }
          } else {
            return course[key] === filters[key];
          }
        });
      });
    }
    $.getJSON(filePath, function (subjectsData) {
      const filteredCourses = filterCourses(subjectsData, sort);
      displaySubjects(filteredCourses);
    });
  }
});
