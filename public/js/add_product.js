// Get the objects we need to modify
let addPersonForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDescription = document.getElementById("input-description");
    let inputPrice = document.getElementById("input-price");
    let inputAmountOnHand = document.getElementById("input-amountonhand");

    // Get the values from the form fields
    let descriptionValue = inputDescription.value;
    let priceValue = inputPrice.value;
    let amountOnHandValue = inputAmountOnHand.value;

    // Put our data we want to send in a javascript object
    let data = {
        description: descriptionValue,
        price: priceValue,
        amountOnHand: amountOnHandValue,

    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDescription.value = '';
            inputPrice.value = '';
            inputAmountOnHand.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let amountOnHandCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.productID;
    descriptionCell.innerText = newRow.description;
    priceCell.innerText = newRow.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    amountOnHandCell.innerText = newRow.amountOnHand;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.productID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(amountOnHandCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.productID);
    // Add the row to the table
    currentTable.appendChild(row);
}