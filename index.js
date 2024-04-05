$(document).ready(function () {
  // Assume your JSON data is stored in a variable called 'subjectsData'
  // var subjectsData = [
  //   {
  //     name: "Matrices and Calculus",
  //     code: "M1",
  //     year: 1,
  //     sem: 1,
  //     credits: 4,
  //     tags: ["Math"],
  //     info: [
  //       "Matrices",
  //       " Eigen values and Eigen vectors",
  //       " Calculus",
  //       " Multivariable Calculus",
  //       " Multivariable Calculus",
  //     ],
  //   },
  //   {
  //     name: "Applied Physics",
  //     code: "AP",
  //     year: 1,
  //     sem: 1,
  //     credits: 4,
  //     tags: ["Theory"],
  //     info: [
  //       "Quantum Physics and Solids",
  //       " Semiconductors and Devices",
  //       " Dielectric, Magnetic and Energy Materials",
  //       " Nanotechnology",
  //       " Laser and Fiber Optics",
  //     ],
  //   },
  //   {
  //     name: "Python",
  //     code: "PY",
  //     tags: ["Technical"],
  //     info: ["Subject 2 info"],
  //   },
  // ];

  // Loop through each subject in the JSON data

  // Initially, display all subjects

  // Click event for year filter
  // window.history.pushState({}, '', '/?year=' + yearClicked + (semParam ? '&sem='+semParam : '') + (tagParam ? '&tag='+tagParam : ''));
  // Function to display subjects
  function displaySubjects(subjects) {
    console.log(subjects);
    // Clear existing subjects
    $(".subjects").empty();

    // Loop through each subject in the filtered data
    $.each(subjects, function (index, subject) {
      // Create a new div element with class 'subject'
      var $newSubject = $('<div class="click ' + subject.code + ' subject "></div>');

      // Append h1 element with the subject name
      $newSubject.append("<h1>" + subject.name + "</h1>");

      // Create a div element with class 'tags' and append p elements for each tag
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

      // Append paragraph element with subject info
      var array = "";
      $.each(subject.info, function (i, tag) {
        array += i == 0 ? tag : `; ${tag}`;
      });
      $newSubject.append("<p class='info'>" + array + ".</p>");

      // Create a div element with class 'button' and append button element
      var $buttonDiv = $('<div class="button"></div>');
      $buttonDiv.append(
        '<button class="click ' + subject.code + '">></button>'
      );
      $newSubject.append($buttonDiv);

      // Append the new subject to the div with class 'subjects'
      $(".subjects").append($newSubject);

      //! redirect links
      $(".click").click(function (event) {
        // Prevent the default action of the click event
        event.preventDefault();

        // Get the class names of the clicked button
        var classNames = $(this).attr("class").split(" ");
        console.log(classNames);

        // Construct the redirect URL
        var redirectURL = `./public/?code=${classNames[1]}`;

        // Open the redirect URL in a new tab/window
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
    sort['year'] = [];
    sort['sem'] = [];
    sort['tags'] = [];
    $('.click-year.active').each(function(){
      var content = $(this).text();
      sort['year'].push(parseInt(content));
      console.log(sort);

      if (first == 0) $('.click-sem').removeClass("inActive").addClass('active');
    });
    $('.click-sem.active').each(function(){
      var content = $(this).text();
      sort['sem'].push(parseInt(content));
      console.log(sort);
      
      if (first == 0) $('.click-tag').removeClass("inActive").addClass('active');
      first++;
  });
  $('.click-tag.active').each(function(){
    var content = $(this).text();
    sort['tags'].push(content);
    console.log(sort);
  });
    function filterCourses(courses, filters) {
      return courses.filter((course) => {
        return Object.keys(filters).every((key) => {
          if (Array.isArray(filters[key])) {
            // Check if any tag matches
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
      const filteredCourses = filterCourses(subjectsData,sort);
      displaySubjects(filteredCourses);
    });
  }
});
