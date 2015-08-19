/* Written by Adam Roddick, Swinburne Student 7352328 for Assessment 4 of COS10012 SP4 2014 --> */

// constants
var GST = 0.10; //modify this value if GST is changed in the future

// global variables
var itemQuantity = 0;
var deliveryDistance = 0;
var deliveryCost = 0;
var itemCost = 0;
var totalCostexGST = 0;
var totalGST = 0;
var totalCostincGST = 0;

// sum variables
var sumQuantitySold = 0;
var sumDeliveryDistance = 0;
var sumSalesexGST = 0;
var sumGST = 0;
var sumSalesincGST = 0;
var sumDeliveryCost = 0;
var sumOrders = 0;

// array to store client details
var clientDetails = new Array();

// array to store submitted orders
var ordersArray = new Array();

// array to store order Totals
var totalsArray = new Array();
	
/* called as the form is filled out (on keyup). This function also runs 'onload' to prepare the customerDetails array in the specific case of a user refreshing the HTML page and submitting an
order using pre-existing input field text without typing anything new, consequently not initiating the keyup call of this same function */

function prepareForm() {
	// retrieve input values from HTML form
	itemQuantity = document.getElementById("itemQuantity").value;
	deliveryDistance = document.getElementById("deliveryDistance").value;
		
	// set itemCost variable based on itemQuantity
	if (itemQuantity <= 50) {
		itemCost = 11.10;
	}
	else if (itemQuantity > 50 && itemQuantity < 100) {
		itemCost = (11.10 / 100 * 96);
	}
	else {
		itemCost = (11.10 / 100 * 91);
	}

	//set deliveryCost variable based on deliveryDistance
	if (deliveryDistance <= 20) {
		deliveryCost = 20;
	}
	else {
		deliveryCost = 35;
	}
	
	//calculate totalGST
	totalGST = (totalCostincGST - totalCostexGST);
	totalCostexGST  = (itemQuantity * itemCost + deliveryCost);
	totalCostincGST  = ((itemQuantity * itemCost + deliveryCost) * GST * 11);
	totalGST = (totalCostincGST - totalCostexGST);
}

function calculateOrder() {
	// retrieve input values from HTML form
	itemQuantity = document.getElementById("itemQuantity").value;
	deliveryDistance = document.getElementById("deliveryDistance").value;
		
	// set itemCost variable based on itemQuantity
	if (itemQuantity <= 50) {
		itemCost = 11.10;
	}
	else if (itemQuantity > 50 && itemQuantity < 100) {
		itemCost = (11.10 / 100 * 96);
	}
	else {
		itemCost = (11.10 / 100 * 91);
	}

	//set deliveryCost variable based on deliveryDistance
	if (deliveryDistance <= 20) {
		deliveryCost = 20;
	}
	else {
		deliveryCost = 35;
	}
		
	//calculate totalCostexGST
	totalCostexGST  = (itemQuantity * itemCost + deliveryCost);
	document.getElementById('totalCostexGST').value = totalCostexGST.toFixed(2);
	document.getElementById('itemCostexGST').value = itemCost.toFixed(2);
	
	//calculate totalCostincGST
	totalCostincGST  = ((itemQuantity * itemCost + deliveryCost) * GST * 11);
	document.getElementById("totalCostincGST").value = totalCostincGST.toFixed(2);
	document.getElementById('itemCostincGST').value = (itemCost * GST * 11).toFixed(2);
	
	//calculate totalGST
	totalGST = (totalCostincGST - totalCostexGST);
}

// when the user clicks the submit order button
function submitOrder() {
	// add a zero to the hours and minutes if it is less than 10 minutes i.e. 09 instead of 9
	function formatTime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	
	// retrieve time and date values from the browser
	var newDate = new Date();
	var day = newDate.getDate();
	var month = newDate.getMonth();
	var year = newDate.getFullYear();
	// var time = newDate.getTime(); // not needed, left in code for posterity
	var hours = formatTime(newDate.getHours());
	var minutes = formatTime(newDate.getMinutes());
	
	clientDetails[0] = document.getElementById('clientName').value;
	clientDetails[1] = document.getElementById('clientPhone').value;
	clientDetails[2] = document.getElementById('deliveryAddress').value;
	clientDetails[3] = document.getElementById('itemQuantity').value;
	clientDetails[4] = document.getElementById('deliveryDistance').value;
	clientDetails[5] = "$" + deliveryCost.toFixed(2);
	clientDetails[6] = "$" + document.getElementById('totalCostexGST').value;
	clientDetails[7] = "$" + totalGST.toFixed(2);
	clientDetails[8] = "$" + document.getElementById('totalCostincGST').value;
	clientDetails[9] = hours + ":" + minutes + " " + day + "/" + month + "/" + year;
	
	//input validation
	if(clientDetails[0] == "") {
		alert("Client Name field cannot be left blank.");
		return;
	}
	if(clientDetails[1] == "") {
		alert("Client Phone field cannot be left blank.");
		return;
	}
	if(clientDetails[2] == "") {
		alert("Delivery Address field cannot be left blank.");
		return;
	}
	if(clientDetails[3] == "") {
		alert("Item Quantity field cannot be left blank.");
		return;
	}
	else if(isNaN(clientDetails[3])) {
		alert("Item Quantity field must be a number.");
		return;
	}
	else if(clientDetails[3] <= 0) {
		alert("Item Quantity must be a positive number.");
		return;
	}
	else if(clientDetails[3] % 1 != 0) {
		alert("Item Quantity must be a whole number.");
		return;
	}
	if(clientDetails[4] == "") {
		alert("Delivery Distance field cannot be left blank.");
		return;
	}
	else if(isNaN(clientDetails[4])) {
		alert("Delivery Distance field must be a number.");
		return;
	}
	else if(clientDetails[4] <= 0) {
		alert("Delivery Distance must be a positive number.");
		return;
	}
	else if(clientDetails[4] % 1 != 0) {
		alert("Delivery Distance must be a whole number.");
		return;
	}
	
	generateHistoryTable(clientDetails);
	sumAll();
	
/*	if (confirm("Order Submitted. Do you want to clear the form?")) {
		resetForm();
	}
	else {
	return;
	}
*/
}

function resetForm() {
	document.getElementById("orderForm").reset();
}

function sumAll() {
	// Add the current order values to the sum variables ready to be passed into the totalsArray
	sumOrders += 1;
	sumQuantitySold += Number(itemQuantity);
	sumDeliveryDistance += Number(deliveryDistance);
	sumDeliveryCost += deliveryCost;
	sumSalesexGST += totalCostexGST;
	sumGST += totalGST;
	sumSalesincGST += totalCostincGST;
	
	// Pass sum values into the totalsArray ready for printing to the reportTotals table
	totalsArray[0] = sumOrders;
	totalsArray[1] = sumQuantitySold;
	totalsArray[2] = sumDeliveryDistance;
	totalsArray[3] = "$" + sumDeliveryCost.toFixed(2);
	totalsArray[4] = "$" + sumSalesexGST.toFixed(2);
	totalsArray[5] = "$" + sumGST.toFixed(2);
	totalsArray[6] = "$" + sumSalesincGST.toFixed(2);	

	generateTotalsTable(totalsArray);
}

// generate a report using all the daily orders
function generateHistoryTable(ordersArray) {
	var table = document.getElementById('reportHistory');
    	var tableBody = document.createElement('TBODY');

    	//table rows
	var tr = document.createElement('TR');
    	for (i = 0; i < ordersArray.length; i++) {
            	var td = document.createElement('TD')
            	td.appendChild(document.createTextNode(ordersArray[i]));
            	tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    	reportHistory.appendChild(tableBody);
}

function generateTotalsTable(totalsArray) {	
	var table = document.getElementById('reportTotals');
    	var tableBody = document.createElement('TBODY');
		
		// pass total values into the Order Totals table
		document.getElementById('td1').innerHTML = totalsArray[0];
		document.getElementById('td2').innerHTML = totalsArray[1];
		document.getElementById('td3').innerHTML = totalsArray[2];
		document.getElementById('td4').innerHTML = totalsArray[3];
		document.getElementById('td5').innerHTML = totalsArray[4];
		document.getElementById('td6').innerHTML = totalsArray[5];
		document.getElementById('td7').innerHTML = totalsArray[6];
}

function printHistory() {
	var reportDiv = document.getElementById('reportDiv');
		var newWindow = window.open("");
		newWindow.document.write("<html><head><meta charset='utf-8' /><link rel='stylesheet' href='style.css' /></head><body>Admin Use Only - Order History:<br />")
		newWindow.document.write(reportDiv.innerHTML);
		newWindow.document.write("<script src='script.js'></script></body></html>");
		/* Print testing only - not for production user
		newWindow.print();
		newWindow.close(); */
		return;
	}

function printTotals() {
	var totalsDiv = document.getElementById('totalsDiv');
		var newWindow = window.open("");
		newWindow.document.write("<html><head><meta charset='utf-8' /><link rel='stylesheet' href='style.css' /></head><body>Admin Use Only - Order Totals:<br />")
		newWindow.document.write(totalsDiv.innerHTML);
		newWindow.document.write("<script src='script.js'></script></body></html>");
		/* Print testing only - not for production user
		newWindow.print();
		newWindow.close(); */
		return;
}

function toggleReportDiv(show,hide) {
	var toggleReportDiv = document.getElementById('reportDiv');
	if(toggleReportDiv.style.display == 'block') {
		toggleReportDiv.style.display = 'none';
	}
	else {
		toggleReportDiv.style.display = 'block';
		return;
	}
}

function toggleTotalsDiv(show,hide) {
	var toggleTotalsDiv = document.getElementById('totalsDiv');
	if(toggleTotalsDiv.style.display == 'block') {
		toggleTotalsDiv.style.display = 'none';
	}
	else {
		toggleTotalsDiv.style.display = 'block';
		return;
	}
}

function loadFinalTotals() {
	var totalsDiv = document.getElementById('totalsDiv');
	var newWindow = window.open("","_self");
	
	if (confirm("You are about to close the application and load the final Daily Totals Report.\n\nClick cancel to return to the Ordering System.")) {
		newWindow.document.write("<html><head><meta charset='utf-8' /><link rel='stylesheet' href='style.css' /></head><body>Admin Use Only - Order Totals:<br />")
		newWindow.document.write(totalsDiv.innerHTML);
		newWindow.document.write("<script src='script.js'></script></body></html>");
		return;
	}
	else {
		return;
	}
}