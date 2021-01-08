const mysql = require('mysql');
const cTable = require('console.table');
const connection = require('../employeeDBconnection').mysql_pool;

class View {

    viewDept() {
        console.log("VIEW")
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
    viewRole() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT roles.*, department.* FROM roles FULL OUTER JOIN department ON role ORDER BY role_id ", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
    viewEmployee() {
        console.log("Selecting all songs...\n");
        connection.query("SELECT * FROM ?", choice, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }

}

module.exports = new View()