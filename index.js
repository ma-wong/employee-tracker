var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "secretpassword",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "Add Department", 
        "Add Role", 
        "Add Employee", 
        "View All Departments", 
        "View All Roles", 
        "View All Employees", 
        "Update Employee Role", 
        "View All Employees By Department",
        "View All Employees By Manager", 
        "View All Employees By Role", 
        "EXIT"]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          multiSearch();
          break;
        case "Add Employee":
          rangeSearch();
          break;
        case "View All Departments":
          songSearch();
          break;
        case "View All Roles":
          songSearch();
          break;
        case "View All Employees":
          songSearch();
          break;
        case "Update Employee Role":
          songSearch();
          break;
        case "View All Employees By Department":
          songSearch();
          break;
        case "View All Employees By Manager":
          songSearch();
          break;
        case "View All Employees by Role":
          songSearch();
          break;
        case "exit":
          connection.end();
          break;
        }
    });
}
