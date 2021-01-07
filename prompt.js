const inquirer = require("inquirer")

appMenu = () => {
    // makes a dept object
    inquirer.prompt([{
        type: "list",
        name: "initialPrompt",
        choices: ['Add', 'View', 'Update', 'Delete', 'Total Utilized Budget of Department']
    }]).then((reponse) => {
        switch (response) {

            case "Add":
                addPrompts();
                break;
            case "View":
                viewPrompt();
                break;
            case "Update":
                updatePrompt();
                break;
            case "Delete":
                deletePrompt();
                break;
            case "Total Utilized Budget of Department":
                budget();
                break;
            default:
                viewEmployees();
        }
    })
    addPrompts = () => {
        inquirer.prompt([{
            type: 'list',
            name: 'addPrompts',
            choices: ['Add Department', 'Add Roles', 'Add Employees']
        }]).then((response) => {
            switch (response) {
                case "Add Department":
                    addDept();
                    break;
                case "Add Roles":
                    addRole();
                    break;
                case "Add Employees":
                    addEmployee();
                    break;
            }
        })
    }
    function createDept() {
        console.log("Inserting a new song...\n");
        var query = connection.query(
            "INSERT INTO songs SET ?", {
                title: 'My Girl',
                artist: 'Earth, Wind, Fire',
                genre: 'Oldies'
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " song inserted!\n");
                // Call updateSong AFTER the INSERT completes
                updateSong();

            }
        );
        function createRole() {
            console.log("Inserting a new song...\n");
            var query = connection.query(
                "INSERT INTO songs SET ?", {
                    title: 'My Girl',
                    artist: 'Earth, Wind, Fire',
                    genre: 'Oldies'
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " song inserted!\n");
                    // Call updateSong AFTER the INSERT completes
                    updateSong();

                }
            );
            function createEmployee() {
                console.log("Inserting a new song...\n");
                var query = connection.query(
                    "INSERT INTO songs SET ?", {
                        title: 'My Girl',
                        artist: 'Earth, Wind, Fire',
                        genre: 'Oldies'
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " song inserted!\n");
                        // Call updateSong AFTER the INSERT completes
                        updateSong();

                    }
                );
    viewPrompts = () => {
        inquirer.prompt([{
            type: 'list',
            name: 'viewPrompts',
            choices: ['View Department', 'View Roles', 'View Employees', 'View Employee\'s Manager']
        }]).then((response) => {
            switch (response) {
                case "View Department":
                    viewDept();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Employee's Manager":
                    viewEmpManager();
                    break;
            }
        })
    }
    function viewDept() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT * FROM songs", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            connection.end();
        });
    }

    function viewRole() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT * FROM songs", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            connection.end();
        });
    }

    function viewEmployee() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT * FROM songs", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            connection.end();
        });
    }

    function viewEmpManager() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT * FROM songs", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            connection.end();
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
    function updateManager() {
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
    deletePrompts = () => {
        inquirer.prompt([{
            type: 'list',
            name: 'deletePrompts',
            choices: ['Delete Department', 'Delete Roles', 'Delete Employees']
        }]).then((response) => {
            switch (response) {
                case "Delete Department":
                    deleteDept();
                    break;
                case "Delete Roles":
                    deleteRole();
                    break;
                case "Delete Employees":
                    deleteEmployee();
                    break;
            }
        })
    }
    function deleteDept() {
        console.log("Deleting song...\n");
        connection.query(
            "DELETE FROM songs WHERE ?", {
                title: "My Girl"
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Songs deleted!\n");
                // Call readSongs AFTER the DELETE completes
                readSongs();
            }
        );
    }

    function deleteRole() {
        console.log("Deleting song...\n");
        connection.query(
            "DELETE FROM songs WHERE ?", {
                title: "My Girl"
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Songs deleted!\n");
                // Call readSongs AFTER the DELETE completes
                readSongs();
            }
        );
    }

    function deleteEmployee() {
        console.log("Deleting song...\n");
        connection.query(
            "DELETE FROM songs WHERE ?", {
                title: "My Girl"
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Songs deleted!\n");
                // Call readSongs AFTER the DELETE completes
                readSongs();
            }
        );
    }
    // equal to numbers
    //  let newId = value.match(/^[0-9]\d*$/)

}

module.exports = appMenu();