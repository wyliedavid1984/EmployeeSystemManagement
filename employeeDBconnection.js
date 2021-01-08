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

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    
});





// Start inquirer prompt
start = () => {
    clear()
    console.log(chalk.blue(figlet.textSync('Employee   Management', {
        horizontalLayout: 'fitted'
    })));
    console.log("help")
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
            }
        );
    })
}

addRole = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the new role?'
    }, {
        type: 'input',
        name: 'salary',
        message: "What is this position paid?"
    }, {
        type: 'input',
        name: 'department_id',
        message: 'What department is this position a part of?'
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
            }
        );
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
            "INSERT INTO role SET ?", {
                first_name: response.firstName,
                last_name: response.lastName,
                department_id: response.role_id,
                manager_id: response.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " song inserted!\n");
                // Call updateSong AFTER the INSERT completes
            })
    })

}
viewDept = () => {

    var query = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
    });
}
viewRole = () => {
    console.log("Selecting all songs...\n");
    var query = connection.query("SELECT roles.*, department.* FROM roles FULL OUTER JOIN department ON role ORDER BY role_id ", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
    });
}
viewEmployee = () => {
    console.log("Selecting all songs...\n");
    var query = connection.query("SELECT * FROM ?", choice, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
    });
}

updateRole = () => {
    console.log('UPDATE')
    console.log("Updating songs...\n");
    var query = connection.query(
        "UPDATE songs SET ? WHERE ?",
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

        }
    );

    // logs the actual query being run
    console.log(query.sql);
}