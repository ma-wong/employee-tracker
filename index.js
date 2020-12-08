const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

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
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
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
        });
    })
}

function addEmployee() {
    inquirer
      .prompt([
        {
            name: "first",
            type: "input",
            message: "what is the employee's first name?"
        },
        {
            name: "last",
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: 'input',
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson"]
        },
        {
            name: "manager",
            type: 'list',
            message: "Who is the employee's manager?",
            choices: ["None", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik"]
        }
    ])
    .then(function(res) {
        connection.query("SELECT * FROM top5000 WHERE year >= ? AND year <= ?", [res.start, res.end], function(err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    })
}


// function viewDepartments() {
//     connection.query("SELECT * FROM department", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }

// function viewRoles() {
//     connection.query("SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }

function viewEmployees() {
    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name ";
    query += "FROM employees INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employees ", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function employeesByDept() {
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which department would you like to add?",
        choices: []
    })
    .then(function(res) {
        connection.query("SELECT * FROM top5000 WHERE artist = ?", [res.artist], function(err, res) {
            if (err) throw err;
            console.log(res);
        });
    })
}
