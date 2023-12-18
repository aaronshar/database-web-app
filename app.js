/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 62417;                 // Set a port number at the top so it's easy to change in the future
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
ROUTES
*/
app.get('/', function(req, res)
{
    res.render('home');
});

app.get('/customers', function(req, res)
{
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, (error, rows, fields) =>{
        res.render('customers', {data: rows});
    })
});                                         

app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, street, city, state, zipCode, email) VALUES ('${data.firstName}', '${data.lastName}', '${data.street}', '${data.city}', '${data.state}', '${data.zipCode}', '${data.email}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/employees', function(req, res)
{
    let query1 = "SELECT * FROM Employees;";
    db.pool.query(query1, (error, rows, fields) =>{
        res.render('employees', {data: rows});
    })
});                                         

app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, street, city, state, zipCode, email) VALUES ('${data.firstName}', '${data.lastName}', '${data.street}', '${data.city}', '${data.state}', '${data.zipCode}', '${data.email}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {

            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/products', function(req, res)
{
    let query1 = "SELECT *, CONCAT('$', FORMAT(price, 2)) AS nicePrice FROM Products;";
    db.pool.query(query1, (error, rows, fields) =>{
        res.render('products', {data: rows});
    })
});                                         

app.post('/add-product-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let price = parseFloat(data.price);
    if (isNaN(price))
    {
        price = 'NULL'
    }
    let amountOnHand = parseInt(data.amountOnHand);
    if (isNaN(amountOnHand))
    {
        amountOnHand = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (description, price, amountOnHand) VALUES ('${data.description}', ${price}, ${amountOnHand});`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/sales', function(req, res)
{
    let query1 = "SELECT *, CONCAT('$', FORMAT(orderTotal, 2)) AS niceTotal, DATE_FORMAT(orderDate,'%m/%d/%Y') AS niceDate FROM SalesOrders;";
    let query2 = "SELECT *, CONCAT('$', FORMAT(unitPrice, 2)) AS nicePrice FROM ProductSales;"
    let query3 = "SELECT * FROM Customers"
    let query4 = "SELECT * FROM Employees"
    let query5 = "SELECT * FROM Products"
    let query6 = "SELECT ProductSales.productSalesID AS productOrderID, SalesOrders.orderID AS salesOrderID, CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerName, DATE_FORMAT(SalesOrders.orderDate,'%m/%d/%Y') AS niceDate FROM ProductSales INNER JOIN SalesOrders ON ProductSales.orderID = SalesOrders.orderID INNER JOIN Customers ON SalesOrders.customerID = Customers.customerID GROUP BY ProductSales.orderID"
    db.pool.query(query1, (error, rows, fields) =>{
        let salesOrders = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let productSales = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let customers = rows;
                db.pool.query(query4, (error, rows, fields) => {
                    let employees = rows
                    db.pool.query(query5, (error, rows, fields) => {
                        let products = rows
                        db.pool.query(query6, (error, rows, fields) => {
                            let salesDropdown = rows
                            res.render('sales', {data1: salesOrders, data2: productSales, data3: customers, data4: employees, data5: products, data6: salesDropdown});
                        })
                    })
                })
            })
        })
    })
});                                         

app.post('/add-salesorder-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let employeeID = parseInt(data.employeeID);
    if (isNaN(employeeID))
    {
        employeeID = 'NULL'
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO SalesOrders (orderDate, orderTotal, customerID, employeeID) VALUES ('${data.orderDate}', ${data.orderTotal}, ${data.customerID}, ${employeeID});`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {

            query2 = `SELECT * FROM SalesOrders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-productsales-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO ProductSales (quantity, unitPrice, orderID, productID) VALUES (${data.quantity}, ${data.unitPrice}, ${data.orderID}, ${data.productID});`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on ProductSales
            query2 = `SELECT * FROM ProductSales;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.productID);
    let deleteProduct = `DELETE FROM Products WHERE productID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteProduct, [productID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  
                res.sendStatus(204);

              }
  })});

app.put('/put-salesorder-ajax', function(req,res,next){
    let data = req.body;
  
    let orderID = parseInt(data.orderID);
    let orderTotal = parseFloat(data.orderTotal);
    let customerID = parseInt(data.customerID)
    
    let employeeID = parseInt(data.employeeID);
    if (isNaN(employeeID))
    {
        employeeID = null
    }

    let querySalesOrder = `UPDATE SalesOrders SET orderDate = ?, orderTotal = ?, customerID = ?, employeeID = ? WHERE orderID = ?`;
    let selectSalesOrder = `SELECT * FROM SalesOrders WHERE orderID = ?`

          // Run the 1st query
          db.pool.query(querySalesOrder, [data.orderDate, orderTotal, customerID, employeeID, orderID], function(error, rows, fields){
                if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {

                db.pool.query(selectSalesOrder, [orderID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })

              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});