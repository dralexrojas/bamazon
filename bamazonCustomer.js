var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

var inquirer = require('inquirer');

connection.connect();

function productMenu() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        console.log(' ');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ WELCOME TO BAMAZON ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('..................................................................................');

        for (var i = 0; i < results.length; i++) {

            console.log("ID: " + results[i].item_id + " || " + "Product: " + results[i].product_name + " || " + "Department: " + results[i].department_name + " || " + "Price: $" + results[i].price);
            console.log('..................................................................................');
        }
        console.log(" ");
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please enter the ID number of the product you would like to purchase.",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= results.length && parseInt(value) > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        ]).then(function (selection) {
            var purchaseItem = (selection.id) - 1;
            var purchaseQty = parseInt(selection.quantity);
            var totalPurchase = parseFloat(((results[purchaseItem].price) * purchaseQty).toFixed(2));

            if (results[purchaseItem].stock_quantity >= purchaseQty) {
                connection.query('UPDATE products SET ? WHERE ?', [
                    { stock_quantity: (results[purchaseItem].stock_quantity - purchaseQty) },
                    { item_id: selection.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Thank you for your order.  Your total is $" + totalPurchase.toFixed(2) + ".  Your item(s) will be shipped to you in 3 - 5 business days.");
                    console.log(' ');
                    restart();
                });

                connection.query('SELECT * FROM departments', function (err, departmentResults) {
                    if (err) throw err;
                    var index;
                    for (var i = 0; i < departmentResults.length; i++) {
                        if (departmentResults[i].department_name === results[purchaseItem].department_name) {
                            index = [i];
                        }
                    }
                    connection.query("UPDATE departments SET ? WHERE ?", [
                        { product_sales: departmentResults[index].product_sales + totalPurchase },
                        { department_name: results[purchaseItem].department_name }
                    ], function (err, departmentResults) {
                        if (err) throw err;
                    });
                });

            }
            else {
                console.log("We apologize, but we don't have enough in stock.");
                restart();
            }
        })
    })
};

function restart(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "response",
            message: "Would you like to continue shopping?"
        }
    ]).then(function(answer){
        if (answer.response){
            productMenu();
        }
        else{
            console.log("Please shop with us again soon.");
        }
    });
};

productMenu();