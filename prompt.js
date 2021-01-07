const inquirer = require("inquirer")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

appMenu = () => {
        clear()
        console.log(
            chalk.blue(
                figlet.textSync('Employee   Management', {
                    horizontalLayout: 'fitted'
                })
            )
        );
        // opening questions
        inquirer.prompt([{
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Employee Role']
        }]).then((response) => {
            switch (response.choics) {

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
                    viewDepartment();
                    break;
                case "View Role":
                    viewRole();
                    break;
                case "View Employee":
                    viewEmployee();
                    break;
                case "Update":
                    updatePrompt();
                    break;
            }
        })

     

        module.exports = appMenu();