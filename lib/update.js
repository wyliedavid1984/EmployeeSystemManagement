const mysql = require('mysql')
const cTable = require('console.table');
const connection = require('../employeeDBconnection').mysql_pool;

module.exports = function updateRole() {
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