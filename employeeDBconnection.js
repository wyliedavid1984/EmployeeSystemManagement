// built in modules
const inquirer = require("inquirer")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const mysql = require('mysql');
const cTable = require('console.table');

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

start();
addDept = () => {

    inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new Department?'
    }]).then((response) => {
        var query = connection.query(
            "INSERT INTO department SET ?", response.deptName,
            function (err, res) {
                if (err) throw err;
                console.log('New Department Successfully Added')
                console.table(res)
                start();
            }
        );
    })

}

addRole = () => {
    connection.query("SELECT * FROM department", function (err, res) {
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
                    deptArray.push(res[i].name);
                }
                return deptArray;
            },
            message: 'What department is this position a part of?',
        }]).then((response) => {
            console.log("Inserting a new song...\n");
            var query = connection.query(
                "INSERT INTO role SET ?", {
                    title: response.title,
                    salary: response.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " song inserted!\n");
                    // Call updateSong AFTER the INSERT completes
                    start();
                }
            );
        })
    })
}

addEmployee = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'What is the employees first name?'
    }, {
        type: 'input',
        name: 'lastName',
        message: "What is the employees Last name?"
    }, {
        type: 'input',
        name: 'role_id',
        message: 'What is the role?'
    }, {
        type: 'input',
        name: "manager_id",
        message: "What is the Manager's name"
    }]).then((response) => {

        var query = connection.query(
            "INSERT INTO employee SET ?", {
                first_name: response.firstName,
                last_name: response.lastName,
                department_id: response.role_id,
                manager_id: response.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " song inserted!\n");
                // Call updateSong AFTER the INSERT completes
                start();
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
    console.log("Updating songs...\n");
    var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{
                artist: "The Temptations"
            },
            {
                title: "My Girl"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Songs updated!\n");
            // Call deleteSong AFTER the UPDATE completes
            start();
        }
    );

    // logs the actual query being run
    console.log(query.sql);

}