// built in modules
const inquirer = require("inquirer")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// create modules
const add = require('./add');
const view = require('./view');
const update = require('./update');


// Start inquirer prompt
start = () => {
    console.log(
        chalk.blue(
            figlet.textSync('Employee   Management', {
                horizontalLayout: 'fitted'
            })
        )
    );
    console.log("help")
    // opening questions
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Employee Role', 'EXIT']
    }]).then((response) => {
        console.log(response, "HIT")
        switch (response) {

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

module.exports = start();
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
// updatePrompts = () => {
//     inquirer.prompt([{
//         type: 'list',
//         name: 'updatePrompts',
//         choices: ['Update Employee\'s Manager', 'Update Employee Role']
//     }]).then((response) => {
//         switch (response) {
//             case "Update Employee\'s Manager":
//                 updateManager();
//                 break;
//             case "Update Employee Role":
//                 updateRole();
//                 break;
//         }
//     })
// }