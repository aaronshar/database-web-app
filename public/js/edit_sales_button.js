// makes edit menu appear when clicking on edit
function editSalesOrder(orderID, orderDate, customerID, orderTotal, employeeID){ 
    let jump = document.getElementById("jump-here");
    jump.scrollIntoView();

    let editSalesOrderForm = document.getElementById("toggle-salesorder-form");  

    let pElement = document.getElementById("orderid-display");
    pElement.innerText = `Edit Sales Order with ID: ${orderID}`;
    
    let orderidValue = document.getElementById("input-orderid-update");
    let orderDateValue = document.getElementById("input-date-update");
    let orderTotalValue = document.getElementById("input-total-update");
    let orderCustomerValue = document.getElementById("input-sales-customer-update");
    let orderEmployeeValue = document.getElementById("input-sales-employee-update");  
    
    orderidValue.value = orderID
    // orderDateValue.value = orderDate
    orderTotalValue.value = orderTotal

    editSalesOrderForm.style.display = "block";
}

// hides edit menu when clicking on cancel
function cancelUpdate(){
    let hideSalesOrderForm = document.getElementById("toggle-salesorder-form");
    hideSalesOrderForm.style.display = "none";
}
