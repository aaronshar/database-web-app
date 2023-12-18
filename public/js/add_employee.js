// Get the objects we need to modify
let addPersonForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-employee-firstname");
    let inputLastName = document.getElementById("input-employee-lastname");
    let inputStreet = document.getElementById("input-employee-street");
    let inputCity = document.getElementById("input-employee-city");
    let inputState = document.getElementById("input-employee-state");
    let inputZipCode = document.getElementById("input-employee-zipcode");
    let inputEmail = document.getElementById("input-employee-email");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let streetValue = inputStreet.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipCodeValue = inputZipCode.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        street: streetValue,
        city: cityValue,
        state: stateValue,
        zipCode: zipCodeValue,
        email: emailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputStreet.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZipCode.value = '';
            inputEmail.value = '';
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
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let streetCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCodeCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.employeeID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    streetCell.innerText = newRow.street;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipCodeCell.innerText = newRow.zipCode;
    emailCell.innerText = newRow.email;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(streetCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCodeCell);
    row.appendChild(emailCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}