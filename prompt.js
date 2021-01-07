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

        function addDept() {
            inquirer.prompt([{
                type: 'input',
                name: 'deptName',
                message: 'What is the name of the new Department?'
            }]).then((response) => {
                connection.query(
                    "INSERT INTO department SET ?", response.deptName,
                    function (err, res) {
                        if (err) throw err;
                        console.log('New Department Successfully Added')
                        console.table(res)
                    }
                );
            })
        }

        function addRole() {
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
                        }
                    )
            })

        }

        module.exports = appMenu();