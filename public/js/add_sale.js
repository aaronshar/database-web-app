// Get the objects we need to modify
let addSalesOrderForm = document.getElementById('add-salesorder-form-ajax');

// Modify the objects we need
addSalesOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-date");
    let inputOrderTotal = document.getElementById("input-total");
    let inputCustomerID = document.getElementById("input-sales-customer");
    let inputEmployeeID = document.getElementById("input-sales-employee");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let orderTotalValue = inputOrderTotal.value;
    let customerIDValue = inputCustomerID.value;
    let employeeIDValue = inputEmployeeID.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderDate: orderDateValue,
        orderTotal: orderTotalValue,
        customerID: customerIDValue,
        employeeID: employeeIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-salesorder-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToSalesTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputOrderTotal.value = '';
            inputCustomerID.value = '';
            inputEmployeeID.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToSalesTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("salesorders-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let orderTotalCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");

    let editCell = document.createElement("TD");

    // Fill the cells with correct data

    idCell.innerText = newRow.orderID;
    orderDateCell.innerText = new Date(newRow.orderDate).toLocaleDateString('en-GB');
    orderTotalCell.innerText = newRow.orderTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    customerIDCell.innerText = newRow.customerID;
    employeeIDCell.innerText = newRow.employeeID;

    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function(){
        editSalesOrder(newRow.orderID, newRow.orderDate, newRow.customerID, newRow.orderTotal, newRow.employeeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderDateCell);
    row.appendChild(customerIDCell);
    row.appendChild(orderTotalCell);
    row.appendChild(employeeIDCell);
    row.appendChild(editCell);

    row.setAttribute('data-value', newRow.orderID);
    // Add the row to the table
    currentTable.appendChild(row);
}

let addProductSalesForm = document.getElementById('add-productsales-form-ajax');

// Modify the objects we need
addProductSalesForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductID = document.getElementById("input-productid");
    let inputOrderID = document.getElementById("input-orderid");
    let inputQuantity = document.getElementById("input-quantity");
    let inputUnitPrice = document.getElementById("input-unitprice");
    // let inputSubtotal = document.getElementById("input-subtotal");

    // Get the values from the form fields
    let productIDValue = inputProductID.value;
    let orderIDValue = inputOrderID.value;
    let quantityValue = inputQuantity.value;
    let unitPriceValue = inputUnitPrice.value;
    // let subtotalValue = inputSubtotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        productID: productIDValue,
        orderID: orderIDValue,
        quantity: quantityValue,
        unitPrice: unitPriceValue,
        // subtotal: subtotalValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-productsales-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductID.value = '';
            inputOrderID.value = '';
            inputQuantity.value = '';
            inputUnitPrice.value = '';
            // inputSubtotal.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("productsales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productIDCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");
    // let subtotalCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.productSalesID;
    productIDCell.innerText = newRow.productID;
    orderIDCell.innerText = newRow.orderID;
    quantityCell.innerText = newRow.quantity;
    unitPriceCell.innerText = newRow.unitPrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    // subtotalCell.innerText = newRow.subtotal;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(productIDCell);
    row.appendChild(quantityCell);
    row.appendChild(orderIDCell);
    row.appendChild(unitPriceCell);
    // row.appendChild(subtotalCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}