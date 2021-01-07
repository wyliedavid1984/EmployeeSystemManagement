// Import the mysql package
const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require("inquirer");

// Connect to the ice_creamDB database using a localhost connection
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3306,

    // Your MySQL username
    user: 'root',

    // Your MySQL password (leave blank for class demonstration purposes; fill in later)
    password: 'root',

    // Name of database
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.end();
});
function afterConnection() {
    connection.query("SELECT * FROM `songs` WHERE `genre` = 'Oldies'", function (err, res) {
        if (err) throw err;
        console.log(res);
        createSong();
    });
}

function createSong() {
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

    // logs the actual query being run
    console.log(query.sql);
}

function updateSong() {
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

function deleteSong() {
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

function readSongs() {
    console.log("Selecting all songs...\n");
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}

