$(document).ready(function () {
  // Assume your JSON data is stored in a variable called 'subjectsData'
  var subjectsData = [
    {
      name: "Subject 1",
      code: "MSF",
      year: 1,
      sem: 1,
      tags: ["Theory", "Technical"],
      info: "Subject 1 info",
    },
    {
      name: "Subject 2",
      code: "OS",
      year: 2,
      sem: 2,
      tags: ["Lab"],
      info: "Subject 2 info",
    },
    {
      name: "Python",
      code: "PY",
      tags: ["Technical"],
      info: "Subject 2 info",
    },
  ];

  // Loop through each subject in the JSON data

  // Initially, display all subjects

  // Click event for year filter
  // window.history.pushState({}, '', '/?year=' + yearClicked + (semParam ? '&sem='+semParam : '') + (tagParam ? '&tag='+tagParam : ''));
  // Function to display subjects
  function displaySubjects(subjects) {
    // Clear existing subjects
    $(".subjects").empty();

    // Loop through each subject in the filtered data
    $.each(subjects, function (index, subject) {
      // Create a new div element with class 'subject'
      var $newSubject = $('<div class="subject"></div>');

      // Append h1 element with the subject name
      $newSubject.append("<h1>" + subject.name + "</h1>");

      // Create a div element with class 'tags' and append p elements for each tag
      var $tagsDiv = $('<div class="tags"></div>');

      subject.year && $tagsDiv.append("<p>#" + subject.year + " Year</p>");
      subject.sem && $tagsDiv.append("<p>#" + subject.sem + " Sem</p>");

      $.each(subject.tags, function (i, tag) {
        $tagsDiv.append("<p>#" + tag + "</p>");
      });
      $newSubject.append($tagsDiv);

      // Append paragraph element with subject info
      $newSubject.append("<p>" + subject.info + "</p>");

      // Create a div element with class 'button' and append button element
      var $buttonDiv = $('<div class="button"></div>');
      $buttonDiv.append('<button class="click-name">></button>');
      $newSubject.append($buttonDiv);

      // Append the new subject to the div with class 'subjects'
      $(".subjects").append($newSubject);
    });
  }
  displaySubjects(subjectsData);
});
