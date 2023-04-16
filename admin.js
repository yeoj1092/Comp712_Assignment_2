/**
 * Author: Jameson Yeo
 * Student ID: 20104906
 * Description of File:
 * this is the connection point inbetween the admin.php and admin.html pages
 * this will create the table to the admin to see
 * also it will allow the admin to see the assigned driver.
 */
/**
 * This checks assigns the driver by booking reference number
 * @param {*} bookingRefNo 
 */
function assignDriver(bookingRefNo) {
    const xhr = createRequest();
    if(xhr){
		var obj = document.getElementById("assignConfirmOutput");

		var requestbody = "referenceNumber="+encodeURIComponent(bookingRefNo);
		xhr.open("POST", "./admin.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                obj.innerHTML = xhr.responseText;
                searchBooking("");
            }
		}//end anonymous call-back function
		xhr.send(requestbody);
	}
}

/**
 * This creates the table and checks if results is there
 * @param {*} bookingList 
 */
function appendBookingTable(bookingList) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    if(bookingList.length === 0) {
        //seconday results if time exceeds 2 hour time frame
        const eachRow = document.createElement("tr");
        eachRow.appendChild(createTableColumn("No Booking Result."));
        table.appendChild(eachRow);
    } 
    //displays results from user search if matched or within time frame and creates the table
    else {
        bookingList.forEach(element => {
            const eachRow = document.createElement("tr");
    
            eachRow.appendChild(createTableColumn(element.bookingRefNo));
            eachRow.appendChild(createTableColumn(element.customerName));
            eachRow.appendChild(createTableColumn(element.phoneNumber));
            eachRow.appendChild(createTableColumn(element.suburb));
            eachRow.appendChild(createTableColumn(element.destinationSuburb));
            //combine date and time into one output
            date = element.pickUpDate.toLocaleString('en-GB', { timeZone: 'Pacific/Auckland' }).slice(0, 10).split( '-' ).reverse( ).join( '/' );
            time = element.pickUpTime.slice(0, 5);
            dateTime = date + " / " + time;
            eachRow.appendChild(createTableColumn(dateTime));
            eachRow.appendChild(createTableColumn(element.status));
            eachRow.appendChild(createAssignButton(element.bookingRefNo, element.status));
            
            table.appendChild(eachRow);
        });
    }
}


/**
 * creates the table column for the table
 * @param {*} element 
 * @returns 
 */

function createTableColumn(element) {
    const column = document.createElement("td");
    column.appendChild(document.createTextNode(element));
    return column;
}

/**
 * creates an assign button to the table.
 * @param {*} referenceNumber 
 * @param {*} status 
 * @returns 
 */
function createAssignButton(referenceNumber, status) {
    const column = document.createElement("td");
    const button = document.createElement("input");
    button.className = "btn btn-primary mt-2";
    button.name = "assign";
    button.type="button";
    button.value="Assign Driver";
    //prevent assign button to be clicable for taken
    if(status=="assigned") {
        button.disabled="true"
    }
    button.addEventListener("click", () => assignDriver(referenceNumber), false);
    column.appendChild(button);
    return column;
}

/**
 * This will search for a customer booking in the database
 * @param {*} requestKeyword 
 */
function searchBooking(requestKeyword) {
    const xhr = createRequest();
    let bookingList = [];
    if(xhr) {
        var obj = document.getElementById("targetDiv");
        var url = "admin.php?requestKeyword="+requestKeyword;
        xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                bookingList = JSON.parse(xhr.responseText);
                appendBookingTable(bookingList);
            }
        }
        xhr.send(null);
    }
}

/**
 * Initialize XML 
 */
function createRequest() {
    var xhr = false;  
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}