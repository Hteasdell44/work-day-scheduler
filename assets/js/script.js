// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Global Variables //

var currentDay = document.querySelector('#current-day');

var hourNine = document.querySelector('#hour-9'); 
var hourTen = document.querySelector('#hour-10'); 
var hourEleven = document.querySelector('#hour-11'); 
var hourTwelve = document.querySelector('#hour-12'); 
var hourThirteen = document.querySelector('#hour-13'); 
var hourFourteen = document.querySelector('#hour-14'); 
var hourFifteen = document.querySelector('#hour-15'); 
var hourSixteen = document.querySelector('#hour-16'); 
var hourSeventeen = document.querySelector('#hour-17'); 

var timeArr = [hourNine, hourTen, hourEleven, hourTwelve, hourThirteen, 
                hourFourteen, hourFifteen, hourSixteen, hourSeventeen];

// Functions //

function setCurrentDay() {

  var timeVar = dayjs().format('dddd, MMMM D');
  currentDay.innerHTML = timeVar + "th";
}

function setTense() {

  var currentHour = dayjs().format('H');
  
  for (var i = 9; i <= 17; i++) {
    
    var timeDiff = currentHour - i;

    if (timeDiff > 0) {
      
      timeArr[i - 9].className += " past";
    }

    if (timeDiff == 0) {

      timeArr[i-9].className += " present";
    }

    if (timeDiff < 0) {

      timeArr[i-9].className += " future";
    }

  }
}

function handleSave(event) {

  var textInput = event.target.parentNode.childNodes[3];

  if (textInput == undefined) {

    textInput = event.target.parentNode.parentNode.childNodes[3];
  }
  
  var userInput = textInput.value;

  var hourTracker = event.target.parentNode.dataset.hour;

  if (hourTracker == undefined) {

    hourTracker = event.target.parentNode.parentNode.dataset.hour;
  }

  localStorage.setItem(hourTracker, userInput);

  // setPlaceholder(textInput, hourTracker);
}

function setEventListeners() {

  for (var i = 0; i < timeArr.length; i++) {

    timeArr[i].addEventListener("click", handleSave);
  }
}

function initializeTasks() {

  for (var i = 9; i <= 17; i++) {

    var currentDiv = document.querySelector('#hour-' + i);
    currentDiv.childNodes[3].innerHTML = localStorage.getItem(i);
  }

}

// Function Calls //

setInterval(setTense, 60000);
setCurrentDay();
setTense();
setEventListeners();
initializeTasks();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
