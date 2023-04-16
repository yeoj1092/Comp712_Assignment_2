<?php
/**
 * Author: Jameson Yeo
 * Student ID: 20104906
 * Description of File:
 * This file connects retrieves information serached from the admin and displays all customer booking details to the admin
 * This also allows the admin to assign a driver to the customer.
 * also checks the time if no booking reference number is called.
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

    //switch case for button pressed
    switch($_SERVER['REQUEST_METHOD']){
        //search button
        case 'GET':
            $request_Keyword = strtoupper($_GET['requestKeyword']);

            if(empty($request_Keyword)) {
                echo getBookingList($conn, $sql_table);
            } else {
                echo getSpecifiedBooking($conn, $sql_table, $request_Keyword);
            }
            break;
        //assign taxi button
        case 'POST':
            $reference_Number = $_POST['referenceNumber'];

            if (!isset($reference_Number)) {
                echo("<p>A reference number is needed here</p>");
            } else {
                assignDriver($conn, $sql_table ,$reference_Number);
                getBookingList($conn, $sql_table);
            }
            break;
        default:
            echo("Invalid HTTP REQUEST");
            break;
    }
    /**
     * This is the booking list function where it gets booking from 
     * table which is unassigned and are within the time frame of 2 hours
     */
    function getBookingList($conn, $sql_table) {
        $list_Query = "SELECT * FROM $sql_table WHERE STATUS = 'unassigned' AND (pickUpTime <= (CURRENT_TIME() + INTERVAL 2 HOUR) AND pickUpTime >= (CURRENT_TIME() - INTERVAL 2 HOUR)) AND pickUpDate = CURDATE()";

        $list_Result = $conn->query($list_Query);

        $bookingList = [];
        if($list_Result->num_rows >= 1){
            while($row = mysqli_fetch_assoc($list_Result)) {
                $bookingList[] = $row;
            }
        }
        return json_encode($bookingList);
    }
    /**
     * This function gets results from keyword searched by user
     * sends it back to admin.js
     */

    function getSpecifiedBooking($conn, $sql_table, $requestKeyword) {
        $specific_Query = "SELECT * FROM $sql_table WHERE bookingRefNo = '$requestKeyword'";
        $specific_Result = mysqli_query($conn, $specific_Query);

        $bookingList = [];
        if(mysqli_num_rows($specific_Result) == 1) {
            while($row = mysqli_fetch_assoc($specific_Result)) {
                $bookingList[] = $row;
            }
        }
        return json_encode($bookingList);
    }
    /**
     * This function assigns the driver by updating the database and returning results
     */
    function assignDriver($conn, $sql_table, $referenceNumber) {
        $assign_Query = "UPDATE $sql_table SET status = 'assigned' WHERE bookingRefNo = '$referenceNumber'";
        $assign_Result = mysqli_query($conn, $assign_Query);

        if ($assign_Result === true) {
            //if results is assigned
            echo("Booking $referenceNumber assigned.");
        } else {
            //if failed to assigned
            echo("Booking for $referenceNumber FAILED.");
        }
    }

?>