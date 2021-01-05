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
        case "View All Employees By Role":
          employeesByRole();
          break;
        case "EXIT":
          connection.end();
          break;
        default:
          console.error("Hit unexpected case");
          break;
        }
    });
}

// Function that adds a department
function addDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department would you like to add?",
    })
    .then(function(res) {
        connection.query("INSERT INTO department SET ?", {
          dept_name: res.department
        },
        function(err) {
          if (err) throw err;
          console.log("Department was successfully added!");
          start();
        });
    })
}

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
            departmentArray.push(elem.dept_name);
          }
          return departmentArray;
        }
      }
    ])
    .then(function(res) {
      query = "INSERT INTO role ";
      query += "SET title = ?, salary = ?, department_id = (";
      query += "SELECT id FROM department WHERE department.dept_name = ?)"
      connection.query(query, [res.role, res.salary, res.department], function(err) {
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
    let nameToId = {};
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
              // add names and ids to map here.
              nameToId[elem.first_name] = elem.id;
              managerArray.push(elem.first_name);
            }
            return managerArray;
          }
        }
      ])
      .then(function(res) {
        let managerId = nameToId[res.manager];
        query = "INSERT INTO employee ";
        query += "SET first_name = ?, last_name = ?, ";
        query += "role_id = (SELECT id FROM role WHERE role.title = ?), ";
        query += "manager_id = ?"
        connection.query(query, [res.first, res.last, res.role, managerId], function(err) {
          if (err) throw err;
          console.log('Employee was added!');
          start();
        });
      })
    })
  })
}

// Function that displays all departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function that displays all roles
function viewRoles() {
    connection.query("SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function that displays all employees
function viewEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name ";
    query += "FROM employee INNER JOIN role ON employee.role_id = role.id ";
    query += "INNER JOIN department ON role.department_id = department.id";

    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

// Function to Update Employee's role
function updateRole() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    connection.query("SELECT * FROM role", function(err, res2) {
      if (err) throw err;
      inquirer
      .prompt([
        {
          name: "employee",
          type: 'list',
          message: "Which employee do you want to update?",
          choices: function() {
            var employeeArray = [];
            for (elem of res) {
              employeeArray.push(elem.first_name);
            }
            return employeeArray;
          }
        },
        {
          name: "role",
          type: 'list',
          message: "Which role do you want to assign to the selected employee?",
          choices: function() {
            var roleArray = [];
            for (elem of res2) {
              roleArray.push(elem.title);
            }
            return roleArray;
          }
        }
      ])
      .then(function(response) {
        var query = "UPDATE employee ";
        query += "SET employee.role_id = (SELECT id FROM role WHERE role.title = ?) ";
        query += "WHERE employee.first_name = ? "
        connection.query(query, [response.role, response.employee], function(err) {
          if (err) throw err;
          console.log("Employee Updated!");
          start();
        });
      })
    })
  })
}

// Function that displays all employees in a specific department
function employeesByDept() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to filter by?",
      choices: function() {
        var departmentArray = [];
        for (elem of res) {
          departmentArray.push(elem.dept_name);
        }
        return departmentArray;
      }
    })
    .then(function(res) {
      var query = "SELECT employee.first_name, employee.last_name, department.dept_name ";
      query += "FROM employee ";
      query += "INNER JOIN role ON employee.role_id = role.id ";
      query += "INNER JOIN department ON role.department_id = department.id ";
      query += "WHERE department.dept_name = ?";
      connection.query(query, [res.department], function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    })
  })
}

// Function that displays all employees with have a specific role
function employeesByRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Which role would you like to filter by?",
      choices: function() {
        var roleArray = [];
        for (elem of res) {
          roleArray.push(elem.title);
        }
        return roleArray;
      }
    })
    .then(function(res) {
      var query = "SELECT employee.first_name, employee.last_name, role.title ";
      query += "FROM employee ";
      query += "INNER JOIN role ON employee.role_id = role.id ";
      query += "WHERE role.title = ?";
      connection.query(query, [res.role], function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    })
  })
}

