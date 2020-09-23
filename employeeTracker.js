//[dependencies]
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employeeDB"
})

connection.connect(function(err){
    if(err) throw err;
    runInquirer();
})


function runInquirer(){
    inquirer.prompt({
        name: "Main",
        type: "list",
        message: "Main Menu: Please choose from the following: ",
        choices: [
            "Add departments, roles, or employee",
            "View departments, roles, or employee",
            "Update employee role",
            "Update employee manager",
            "View employees by manager",
            "Delete department, roles, or employee",
            "View the total utilized budget of a department",
        ]
    }).then(function(answer){
        switch(answer.action){
            case "Add departments, roles, or employee":
                addOption();
                break;
            case "View departments, roles, or employee":
                viewOption();
                break;
            case "Update employee role":
                updateRole();
                break;
            case "Update employee manager":
                updateManager();
                break;
            case "View employees by manager":
                viewManager();
                break;
            case "Delete department, roles, or employee":
                deleteOption();
                break;
            case "View the total utilized budget of a department":
                budget();
                break;
        }
    })
}

