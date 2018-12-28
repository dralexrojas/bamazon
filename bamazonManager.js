var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "GCSMySQL",
  database: "bamazon"
});

var inquirer = require('inquirer');

connection.connect();

function managerStart(){
    inquirer.prompt([{
      type: "list",
      name: "managerToDo",
      message: "What would you like to do?",
      choices: [new inquirer.Separator(),"View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit System"]
    }]).then(function(mgrInput){
       switch(mgrInput.managerToDo){
        case "View Products for Sale": viewProducts();
        break;
        case "View Low Inventory": viewLowInventory();
        break;
        case "Add to Inventory": addToInventory();
        break;
        case "Add New Product": addNewProduct();
        break;
        case "Exit System": console.log('You are now logged out of the manager system.');
      }
    });
  }
  
  //views all inventory
  function viewProducts(){
    console.log(' ');
    console.log('************************************ Viewing Products **********************************************');
  
    connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<results.length;i++){
      
    console.log("ID: " + results[i].item_id + " || " + "Product: " + results[i].product_name + " || " + "Department: " + results[i].department_name + " || " + "Price: $" + results[i].price + " || " + "Inventory: " + results[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
    }
  
    managerStart();
    });
  }
  
  //views inventory lower than 200
  function viewLowInventory(){
    console.log(' ');
    console.log('************************************** Viewing Low Inventory **************************************');
  
    connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<results.length;i++){
      if(results[i].stock_quantity <= 200){
      console.log("ID: " + results[i].item_id + " || " + "Product: " + results[i].product_name + " || " + "Department: " + results[i].department_name + " || " + "Price: $" + results[i].price + " || " + "Inventory: " + results[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------');
      }
    }
  
    managerStart();
    });
  }
  
  //prompt to add more product
  function addToInventory(){
    console.log(' ');
    console.log('************************************* Adding to Inventory *****************************************');
  
    connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    var productArray = [];
    //pushes each item into an productArray
    for(var i=0; i<results.length; i++){
      productArray.push(results[i].product_name);
    }
  
    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: productArray,
      message: "Which product would you like to add inventory?"
    }, {
      type: "input",
      name: "quantity",
      message: "How much would you like to add?",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
      }]).then(function(mgrInput){
        var currentQty;
        for(var i=0; i<results.length; i++){
          if(results[i].product_name === mgrInput.product){
            currentQty = results[i].stock_quantity;
          }
        }
        connection.query('UPDATE products SET ? WHERE ?', [
          {stock_quantity: currentQty + parseInt(mgrInput.quantity)},
          {product_name: mgrInput.product}
          ], function(err, results){
            if(err) throw err;
            console.log('The inventory has been updated.');
            console.log(' ');
            managerStart();
          });
        })
    });
  }
  
  //add a completely new product
  function addNewProduct(){
    console.log(' ');
    console.log('*************************************** Adding New Product ****************************************');
    var deptNames = [];
  
    //var for name of departments
    connection.query('SELECT * FROM departments', function(err, results){
      if(err) throw err;
      for(var i = 0; i<results.length; i++){
        deptNames.push(results[i].department_name);
      }
    })
  
    inquirer.prompt([{
      type: "input",
      name: "product",
      message: "Product: ",
      validate: function(value){
        if(value){return true;}
        else{return false;}
      }
    }, {
      type: "list",
      name: "department",
      message: "Department: ",
      choices: deptNames
    }, {
      type: "input",
      name: "price",
      message: "Price: ",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "quantity",
      message: "Quantity: ",
      validate: function(value){
        if(isNaN(value) == false){return true;}
        else{return false;}
      }
    }]).then(function(mgrInput){
      connection.query('INSERT INTO products SET ?',{
        product_name: mgrInput.product,
        department_name: mgrInput.department,
        price: mgrInput.price,
        stock_quantity: mgrInput.quantity
      }, function(err, results){
        if(err) throw err;
        console.log('A new product has been added.');
        console.log(' ');
      })
      managerStart();
    });
  }
  
  managerStart();