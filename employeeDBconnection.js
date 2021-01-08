// built in modules
const inquirer = require("inquirer")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const mysql = require('mysql');
// create modules
const add = require('./lib/add');
const view = require('./lib/view');
const update = require('./lib/update');

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
    start();
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
        console.log(response, "HIT")
        switch (response.choices) {

            case "Add Department":
                add.addDept();
                break;
            case "Add Role":
                add.addRole();
                break;
            case "Add Employee":
                add.addEmployee();
                break;
            case "View Department":
                view.viewDept();
                break;
            case "View Role":
                view.viewRole();
                break;
            case "View Employee":
                view.viewEmployee();
                break;
            case "Update Employee Role":
                update.updateRole();
                break;
            case "EXIT":
                connection.end();
        }
    })
}