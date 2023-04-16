/**
 * Author: Jameson Yeo
 * Student ID: 20104906
 * Description of File:
 * This sets the date and time to the booking.html page
 *
 * This also retreives the information from the booking.html page
 */

/*
 * Global date variable
 */
var date = new Date();
var currentDate;
var currentTime;

function onloadsettings() {
  getDate();
  getTime();
}

/*
 * This function generates the current date
 */
function getDate() {
  //set current date
  currentDate = date
    .toLocaleString("en-GB", { timeZone: "Pacific/Auckland" })
    .slice(0, 10)
    .split("/")
    .reverse()
    .join("-");
  //sends to booking.html by id date
  document.getElementById("date").value = currentDate;
  //sets a min date that can be set
  document.getElementById("date").setAttribute("min", currentDate);
}

/*
 * This function generate the current time
 */
function getTime() {
  //set current time
  currentTime = date.toLocaleTimeString("it-IT").slice(0, 5);
  //send to booking.html by id
  document.getElementById("time").value = currentTime;
}

/*
 *Creating a new booking request and sends it to the php server
 */
function requestBooking() {
  const xhr = createRequest();

  if (xhr) {
    // get data from the booking.html page by id name
    const customerName = document.getElementById("cname").value;
    const phoneNumber = document.getElementById("phone").value;
    const unitNumber = document.getElementById("unumber").value;
    const streetNumber = document.getElementById("snumber").value;
    const streetName = document.getElementById("stname").value;
    const suburb = document.getElementById("sbname").value;
    const destinationSuburb = document.getElementById("dsbname").value;
    const pickUpDate = document.getElementById("date").value;
    const pickUpTime = document.getElementById("time").value;

    //location for reference
    var obj = document.getElementById("targetDiv");

    //uses constatnt to check if it matches date if so cannot work
    if (
      pickUpDate < currentDate ||
      (pickUpDate == currentDate && pickUpTime < currentTime)
    ) {
      obj.innerHTML = "Time cannot be set. PLease try again.";
    } else {
      var requestbody =
        "customerName=" +
        encodeURIComponent(customerName) +
        "&phoneNumber=" +
        encodeURIComponent(phoneNumber) +
        "&unitNumber=" +
        encodeURIComponent(unitNumber) +
        "&streetNumber=" +
        encodeURIComponent(streetNumber) +
        "&streetName=" +
        encodeURIComponent(streetName) +
        "&suburb=" +
        encodeURIComponent(suburb) +
        "&destinationSuburb=" +
        encodeURIComponent(destinationSuburb) +
        "&pickUpDate=" +
        encodeURIComponent(pickUpDate) +
        "&pickUpTime=" +
        encodeURIComponent(pickUpTime);
      xhr.open("POST", "./booking.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          obj.innerHTML = xhr.responseText;
        }
      };
      xhr.send(requestbody);
    }
  }
}

/*
 *Initialize XML
 */
function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}
