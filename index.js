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
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View All Departments":
          allDepartments();
          break;
        case "View All Roles":
          allRoles();
          break;
        case "View All Employees":
          allEmployees();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Employees By Department":
          employeesByDept();
          break;
        case "View All Employees By Manager":
          employeesByManager();
          break;
        case "View All Employees by Role":
          employeesByRole();
          break;
        case "exit":
          connection.end();
          break;
        }
    });
}

function addDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "Which department would you like to add?",
    })
    .then(function(res) {
        connection.query("SELECT * FROM top5000 WHERE artist = ?", [res.artist], function(err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    })
}
