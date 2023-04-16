<?php

/**
 * Author: Jameson Yeo
 * Student ID: 20104906
 * Description of File:
 * This file establishes a connection to the database and handles user requests from booking.html and booking.js.
 * This will connect and send in details to the database
 */

//requestion detail informaion from file
require_once("../../conf/info.php");

//connection to database or failed to connect
$conn = @mysqli_connect(
    $sql_host,
    $sql_user,
    $sql_pass,
    $sql_db
) or die("<p>Cannot connect to database</p>");

//get user input information from booking.js
$customerName = $_POST["customerName"];
$phoneNumber = $_POST["phoneNumber"];
$unitNumber = $_POST["unitNumber"];
$streetNumber = $_POST["streetNumber"];
$streetName = $_POST["streetName"];
$suburb = $_POST["suburb"];
$destinationSuburb = $_POST["destinationSuburb"];
$pickUpDate = $_POST["pickUpDate"];
$pickUpTime = $_POST["pickUpTime"];
$status = 'unassigned';

//format date and time to sql
$pickUpDate = date('Y/m/d', strtotime($pickUpDate));
$pickUpTime = date('H:i', strtotime($pickUpTime));

//insert user information into database 
$insert_Query = "INSERT INTO $sql_table (customerName,phoneNumber,unitNumber,streetNumber,streetName,suburb,destinationSuburb,pickUpDate,pickUpTime,status) 
VALUES ('$customerName','$phoneNumber','$unitNumber','$streetNumber','$streetName','$suburb','$destinationSuburb','$pickUpDate','$pickUpTime','$status')";
$insert_results = mysqli_query($conn, $insert_Query) or die("<p>Something wrong with query</p> $insert_Query");

if ($insert_results) {
    //creating the BRN number
    $number = mysqli_insert_id($conn);
    $codeNumber = sprintf('%05d', $number);
    $referenceNumber = 'BRN' . $codeNumber;
    addBRN($conn, $sql_table, $number, $referenceNumber);
    //output display to user
    echo ("<h1>Thank You for your Booking!</h1>");
    echo ("<table>");
    echo ("<tr><td>booking Reference Number:</td><td>&nbsp;</td><td>$referenceNumber</td></tr>");
    echo ("<tr><td>Pickup Time:</td><td>&nbsp;</td><td>$pickUpTime</td></tr>");
    echo ("<tr><td>Pickup Date:</td><td>&nbsp;</td><td>" . date('d/m/Y', strtotime($pickUpDate)) . "</td></tr>"); // convert time to required time values
    echo ("</table>");
} else {
    //failed to insert query
    echo ("<p>There is a problem with your booking. Please try again.</p>");
}

mysqli_close($conn);

//adding a booking reference number to user details in database
function addBRN($conn, $sql_table, $number, $referenceNumber)
{
    $insert_brn_query = "UPDATE $sql_table set bookingRefNo = '$referenceNumber' where id = '$number'";
    mysqli_query($conn, $insert_brn_query) or die("Something wrong with brn query $insert_brn_query");
}
