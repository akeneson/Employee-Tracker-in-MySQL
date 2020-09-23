//[dependencies]
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
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
        type: "rawlist",
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
        console.log(answer);
        switch(answer.action){
            case "Add departments, roles, or employee":
                addOption();
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

function addOption(){
    console.log("addOption function called");
    inquirer.
        prompt({
            name:"addOption",
            type: "choices",
            message: "Which would you like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee"
            ]            
    })
    .then (function(res){
        console.log(res);
        if (res == "Add department") {
        inquirer.prompt({
                name:"departmentName",
                type:"input",
                message: "What is the name of the new department?"
            }).then(function(res){
                console.log(res);
                connection.query("INSERT INTO department SET ?", {name: res.name},
                function(err, res){
                    if(err) throw err;
                });
            });
        }
    });
}