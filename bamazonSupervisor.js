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

function supervisorStart(){
    inquirer.prompt([{
      type: "list",
      name: "supervisorToDo",
      message: "What would you like to do?",
      choices: [new inquirer.Separator(), "View Product Sales by Department", "Create New Department", "Exit System"]
    }]).then(function(spvInput){
      switch(spvInput.supervisorToDo){
        case "View Product Sales by Department": viewProductByDept();
        break;
        case "Create New Department": createNewDept();
        break;
        case "Exit System": console.log('You are now logged out of the supervisor system.');
      }
    });
  }
  
  //view product sales by department
  function viewProductByDept(){
    
    connection.query('SELECT * FROM departments', function(err, results){
      if(err) throw err;
      console.log(' ');
      console.log('******************************* Product Sales by Department ****************************************');
      console.log('----------------------------------------------------------------------------------------------------')
  
      for(var i = 0; i<results.length;i++){
        console.log("Department ID: " + results[i].department_id + " || " + "Department Name: " + results[i].department_name + " | " + "Over Head Cost: " + (results[i].over_head_cost).toFixed(2) + " | " + "Product Sales: " + (results[i].product_sales).toFixed(2) + " | " + "Total Profit: " + (results[i].product_sales - results[i].over_head_cost).toFixed(2));
        console.log('--------------------------------------------------------------------------------------------------')
      }
      supervisorStart();
    })
  }
  
    //create a new department
    function createNewDept(){
        console.log(' ');
        console.log('******************************* Creating New Department ********************************************');
      
      inquirer.prompt([
      {
        type: "input",
        name: "deptName",
        message: "Department Name: "
      }, {
        type: "input",
        name: "overHeadCost",
        message: "Over Head Cost: ",
        default: 0,
        validate: function(value){
          if(isNaN(value) === false){return true;}
          else{return false;}
        }
      }, {
        type: "input",
        name: "prodSales",
        message: "Product Sales: ",
        default: 0,
        validate: function(value){
          if(isNaN(value) === false){return true;}
          else{return false;}
        }
      }
      ]).then(function(spvInput){
        connection.query('INSERT INTO departments SET ?',{
          department_name: spvInput.deptName,
          over_head_cost: spvInput.overHeadCost,
          product_sales: spvInput.prodSales
        }, function(err, results){
          if(err) throw err;
          console.log('A new department was added.');
        })
        supervisorStart();
      });
    }
  
  supervisorStart();