// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the parent time-block
    var timeBlockId = $(this).parent().attr("id");
    
    // Get the user input from the textarea within the clicked time-block
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage with the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js (24-hour format)
  var currentHour = dayjs().hour();

  // Loop through each time block
  $(".time-block").each(function () {
    // Get the numeric hour from the time block's id
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    // Remove all classes related to past, present, and future
    $(this).removeClass("past present future");

    // Compare the time block's hour to the current hour and apply classes accordingly
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Loop through each time block to retrieve and populate user input from local storage
  $(".time-block").each(function () {
    // Get the id of the time block
    var timeBlockId = $(this).attr("id");

    // Retrieve user input from local storage using the time block id
    var storedInput = localStorage.getItem(timeBlockId);

    // Check if there is stored input and populate the textarea
    if (storedInput !== null) {
      $(this).find(".description").val(storedInput);
    }
  });

  // Get the current date and time using Day.js
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Display the current date and time in the "currentDay" element
  $("#currentDay").text(currentDate);
});