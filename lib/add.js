const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');


class Add {
    
    addDept = () => {
        console.log('ADD')
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
}

module.exports = new Add();