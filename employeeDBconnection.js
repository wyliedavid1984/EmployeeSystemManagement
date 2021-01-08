// built in modules
const inquirer = require("inquirer")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const mysql = require('mysql');
const cTable = require('console.table');
const _ = require('lodash');

// Connect to the ice_creamDB database using a localhost connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_db',

});
console.log(chalk.blue(figlet.textSync('Employee   Management', {
    horizontalLayout: 'fitted'
})));
connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

});

// Start inquirer prompt
start = () => {

    // opening questions
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Employee Role', 'EXIT']
    }]).then((response) => {

        switch (response.choices) {

            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View Department":
                viewDept();
                break;
            case "View Role":
                viewRole();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "EXIT":
                connection.end();
        }
    })
}
// starting with a function
start();

// add dept 
addDept = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new Department?'
    }]).then((response) => {
        var query = connection.query(
            "INSERT INTO department SET ?", {
                name: response.deptName
            },
            function (err, res) {
                if (err) throw err;
                console.log('New Department Successfully Added')
                start();
            }
        );
    })

}

// adding a role
addRole = () => {
    connection.query("SELECT * FROM department ORDER BY id", function (err, res) {
        inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the new role?'
        }, {
            type: 'input',
            name: 'salary',
            message: "What is this position paid?"
        }, {
            type: 'rawlist',
            name: 'department_id',
            choices: function (value) {
                var deptArray = [];
                for (var i = 0; i < res.length; i++) {
                    deptArray.push({
                        value: res[i].id,
                        name: res[i].name
                    });
                }
                console.log(deptArray)
                return deptArray;
            },
            message: 'What department is this position a part of?',
        }]).then((response) => {
            console.log(response);
            var query = connection.query(
                "INSERT INTO role SET ?", {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('New Role Successfully Added')
                    start();
                }
            );
        })
    })
}

addEmployee = () => {
    connection.query("SELECT * FROM role ORDER BY id", async function (err, res) {
        console.table(res)
        const roles = _.map(res, _.iteratee('id'));
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is the employees Last name?"
        }, {
            type: 'rawlist',
            name: 'role_id',
            choices: roles,
            message: 'What is the role?'
        }]).then((response) => {
            connection.query("SELECT employee.first_name, employee.last_name, employee.id FROM employee ORDER BY id", function (err, res) {
                console.table(res);
                const managers = _.map(res, _.iteratee('id'));
                inquirer.prompt([{
                    type: 'rawlist',
                    name: "manager_id",
                    choices: managers,
                    message: "What is the Manager's name"
                }]).then((respond) => {
                    var query = connection.query(
                        "INSERT INTO employee SET ?", {
                            first_name: response.firstName,
                            last_name: response.lastName,
                            role_id: response.role_id,
                            manager_id: respond.manager_id
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " song inserted!\n");
                            start();
                        })
                })
            })
        })

    })
}



viewDept = () => {
    console.log("Selecting all departments..\n")
    var query = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    })
};

viewRole = () => {
    console.log("Selecting all roles...\n");
    var query = connection.query(
        "SELECT role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res.title)
            console.table(res);
            start();
        });

}

viewEmployee = () => {
    console.log("Selecting all employees...\n");
    var query = connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });

}

updateRole = () => {
    connection.query("SELECT employee.first_name, employee.last_name, employee.id FROM employee", function (err, res) {
        console.table(res)
        const employee = _.map(res, _.iteratee('id'));
        inquirer.prompt([{
            type: 'rawlist',
            name: 'employeePicked',
            choices: employee,
            message: "What employee's role are we changing?",
        }]).then((response) => {
            console.log(response)
            connection.query("SELECT * FROM role", function (err, res) {
                console.table(res)
                const roles = _.map(res, _.iteratee('id'));
                inquirer.prompt([{
                    type: 'rawlist',
                    name: 'roleid',
                    choices: roles,
                    message: "What's the new role?",
                }]).then((res) => {
                    var query = connection.query("UPDATE employee SET ? WHERE ?", [{
                            role_id: res.roleid
                        }, {

                            id: response.employeePicked
                        }],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " song inserted!\n");
                            start();
                        })
                })
            })
        })
    })
}