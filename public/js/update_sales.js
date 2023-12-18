// Get the objects we need to modify
let updateSalesOrderForm = document.getElementById('update-salesorder-form-ajax');

// Modify the objects we need
updateSalesOrderForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-orderid-update");
    let inputOrderDate = document.getElementById("input-date-update");
    let inputOrderTotal = document.getElementById("input-total-update");
    let inputCustomerID = document.getElementById("input-sales-customer-update");
    let inputEmployeeID = document.getElementById("input-sales-employee-update");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let orderDateValue = inputOrderDate.value;
    let orderTotalValue = inputOrderTotal.value;
    let customerIDValue = inputCustomerID.value;
    let employeeIDValue = inputEmployeeID.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderID: orderIDValue,
        orderDate: orderDateValue,
        orderTotal: orderTotalValue,
        customerID: customerIDValue,
        employeeID: employeeIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-salesorder-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, orderIDValue, orderDateValue, orderTotalValue, customerIDValue, employeeIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, orderID, orderDate, orderTotal, customerID, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("salesorders-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdOrderDate = updateRowIndex.getElementsByTagName("td")[1];
            let tdCustomerID = updateRowIndex.getElementsByTagName("td")[2];
            let tdOrderTotal = updateRowIndex.getElementsByTagName("td")[3];
            let tdEmployeeID = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            tdOrderDate.innerHTML = new Date(parsedData[0].orderDate).toLocaleDateString('en-GB'); 
            tdCustomerID.innerHTML = parsedData[0].customerID; 
            tdOrderTotal.innerHTML = parsedData[0].orderTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}); 
            tdEmployeeID.innerHTML = parsedData[0].employeeID; 
       }
    }
    cancelUpdate();
}