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

// function that prompts user for what they want to do
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

// // Function that adds a department
// function addDepartment() {
//     inquirer
//       .prompt({
//         name: "department",
//         type: "input",
//         message: "What department would you like to add?",
//     })
//     .then(function(res) {
//         connection.query("INSERT INTO department SET ?", {
//           dept_name: res.department
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Department was successfully added!");
//           start();
//         });
//     })
// }

// Function that adds a role
function addRole() {
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    inquirer
    .prompt([
      {
      name: "role",
      type: "input",
      message: "What role would you like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary associated with this role?"
      },
      {
        name: "department",
        type: "list",
        message: "Which department is the role in",
        choices: function() {
          var departmentArray = [];
          for (elem of results) {
            departmentArray.push(elem.title);
          }
          return departmentArray;
        }
      }
    ])
    .then(function(res) {
      connection.query("INSERT INTO role SET ?", {
        title: res.role,
        salary: res,salary,
        department_id: res.department
      },
      function(err) {
        if (err) throw err;
        console.log("Role was successfully added!");
        start();
      });
    })
  })
  
}

// Function that adds an employee
function addEmployee() {
  connection.query("SELECT * FROM role", function(err, results) {
    if (err) throw err;
    connection.query("SELECT * FROM employee", function(err, res2) {
      if (err) throw err;
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
          type: 'list',
          message: "What is the employee's role?",
          choices: function() {
            var roleArray = [];
            for (elem of results) {
              roleArray.push(elem.title);
            }
            return roleArray;
          }
        },
        {
          name: "manager",
          type: 'list',
          message: "Who is the employee's manager?",
          choices: function() {
            var managerArray = [];
            for (elem of res2) {
              managerArray.push(elem.first_name);
            }
            return managerArray;
          }
        }
      ])
      .then(function(res) {
        connection.query("INSERT INTO employee SET ?", {first_name: res.first, last_name: res.last, role_id: res.role.role_id, manager_id: res.manager}, function(err, res) {
          if (err) throw err;
          console.log('Employee was added!');
          start();
        });
      })
    })
  })
}

// // Function that displays all departments
// function viewDepartments() {
//     connection.query("SELECT * FROM department", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }

// // Function that displays all roles
// function viewRoles() {
//     connection.query("SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }

// Function that displays all employees
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

// Function to Update Employee's role
function updateRole() {
  inquirer
    .prompt([
      {
          name: "employee",
          type: 'list',
          message: "Which employee's role do you want to update?",
          choices: ["Sales Lead", "Salesperson"]
      },
      {
          name: "role",
          type: 'list',
          message: "Which role do you want to assign to the selected employee?",
          choices: ["None", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik"]
      }
  ])
  .then(function(res) {
      connection.query("UPDATE employee SET role = ? WHERE employee.id = ?", [res.start, res.end], function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
      });
  })
}

// Function that displays all employees in a specific department
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

function employeesByRole() {

}
