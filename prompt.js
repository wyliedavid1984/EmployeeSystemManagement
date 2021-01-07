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
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Employee Role','EXIT']
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
            case "EXIT":
                connection.end();
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



        function viewDept(choice) {
            console.log("Selecting all songs...\n");
            connection.query("SELECT * FROM ?", choice, function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
            });
        }


        updatePrompts = () => {
            inquirer.prompt([{
                type: 'list',
                name: 'updatePrompts',
                choices: ['Update Employee\'s Manager', 'Update Employee Role']
            }]).then((response) => {
                switch (response) {
                    case "Update Employee\'s Manager":
                        updateManager();
                        break;
                    case "Update Employee Role":
                        updateRole();
                        break;
                }
            })
        }

        function updateRole() {
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
                    deleteSong();
                }
            );

            // logs the actual query being run
            console.log(query.sql);
        }

    }
}
module.exports = appMenu();
// viewPrompts = () => {
//     inquirer.prompt([{
//         type: 'list',
//         name: 'viewPrompts',
//         choices: ['View Department', 'View Roles', 'View Employees', 'View Employee\'s Manager']
//     }]).then((response) => {
//         switch (response) {
//             case "View Department":
//                 viewDept(department);
//                 break;
//             case "View Roles":
//                 viewRole(role);
//                 break;
//             case "View Employees":
//                 viewEmployee(employee);
//                 break;
//                 // case "View Employee's Manager":
//                 //     viewEmpManager();
//                 //     break;
//         }
//     })
// }  // deletePrompts = () => {
//     inquirer.prompt([{
//         type: 'list',
//         name: 'deletePrompts',
//         choices: ['Delete Department', 'Delete Roles', 'Delete Employees']
//     }]).then((response) => {
//         switch (response) {
//             case "Delete Department":
//                 deleteDept();
//                 break;
//             case "Delete Roles":
//                 deleteRole();
//                 break;
//             case "Delete Employees":
//                 deleteEmployee();
//                 break;
//         }
//     })
// }
// function deleteDept() {
//     console.log("Deleting song...\n");
//     connection.query(
//         "DELETE FROM songs WHERE ?", {
//             title: "My Girl"
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " Songs deleted!\n");
//             // Call readSongs AFTER the DELETE completes
//             readSongs();
//         }
//     );
// }

// function deleteRole() {
//     console.log("Deleting song...\n");
//     connection.query(
//         "DELETE FROM songs WHERE ?", {
//             title: "My Girl"
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " Songs deleted!\n");
//             // Call readSongs AFTER the DELETE completes
//             readSongs();
//         }
//     );
// }

// function deleteEmployee() {
//     console.log("Deleting song...\n");
//     connection.query(
//         "DELETE FROM songs WHERE ?", {
//             title: "My Girl"
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " Songs deleted!\n");
//             // Call readSongs AFTER the DELETE completes
//             readSongs();
//         }
//     );
// }
// equal to numbers
//  let newId = value.match(/^[0-9]\d*$/)

// function updateManager() {
//     console.log("Updating songs...\n");
//     var query = connection.query(
//         "UPDATE songs SET ? WHERE ?",
//         [{
//                 artist: "The Temptations"
//             },
//             {
//                 title: "My Girl"
//             }
//         ],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " Songs updated!\n");
//             // Call deleteSong AFTER the UPDATE completes
//             deleteSong();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// }
// function viewEmpManager() {
//     console.log("Selecting all songs...\n");
//     connection.query("SELECT * FROM songs", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//     });
// }