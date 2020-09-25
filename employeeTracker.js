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
        name: "action",
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
            console.log("actionOption chosen");
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
// ------------------------ADD OPTION---------------------------
function addOption(){
    console.log("addOption function called");
    inquirer.
        prompt({
            name: "action",
            type: "rawlist",
            message: "Which would you like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee"
            ]            
    })
    .then (function(answer){
        console.log(answer);
        switch(answer.action){
            case "Add department":
                console.log("Add departments selected");
                addDepartment();
                break;
            case "Add role":
                console.log("Add roles selected");
                addRoles();
                break;
            case "Add employee":
                console.log("Add employee selected");
                addEmployee();
                break;
            case "Return to previous menu":
                runInquirer();
                break;
        }
    });
}
//[ADD DEPARTMENT]
function addDepartment(){
    console.log("addDepartment function called");
    inquirer.prompt({
        type: "input",
        message: "Enter the name of the department: ",
        name:"newDept"
    }).then(function(response){
        console.log(response);
        connection.query("INSERT INTO department SET ?", { Department_name: response.name },
        function(error,response){
        if (error) throw error;
    });
    })
    
}
//[ADD ROLES]
function addRoles(){
    console.log("addRoles function called");
    inquirer.prompt([
    {
        type: "input",
        message: "Enter the title of the new role: ",
        name:"newRole"
    },
    {
        type: "input",
        message: "Enter the salary of the new role: ",
        name:"newSalary"
    },
    {
        type: "input",
        message: "Enter the department ID of the new role: ",
        name: "newDeptID"
    }
    ]).then(function(response){
        console.log(response);
        connection.query("INSERT INTO roles SET ?", { 
            title: response.newRole,
            salary: response.newSalary,
            department_ID: response.newDeptID
         },
        function(error,response){
        if (error) throw error;
    });
    })
   
}
// [ADD EMPLOYEES]
function addEmployee(){
    console.log("addEmployee function called");
    inquirer.prompt([
    {
        type: "input",
        message: "Enter the first name of the employee: ",
        name:"firstName"
    },
    {
        type: "input",
        message: "Enter the first name of the employee: ",
        name:"lastName"
    },
    {
        type: "list",
        message: "What's is the employee's title?",
        name: "employeeTitle",
        choices: showRoles
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "employeeManager",
        choices: showManger
    }
    ]).then(function(response){
        console.log(response);
        connection.query("INSERT INTO employee SET ?", { 
            First_name: response.first_name,
            Last_name: response.last_name,
            Fole_id: response.employeeTitle,
            Manager_id: response.employeeManager 
         },
        function(error,response){
        if (error) throw error;
    });
    })
}
// Not working
function showRoles(){
    connection.query("SELECT * from role", function(error,res){
        console.table(res);
    })
}
// Not working
function showManager(){
    connection.query("SELECT * from role", function(error,res){
        console.table(res);
    })
}

// ---------------------VIEW OPTION --------------------------

function viewOption(){
    console.log("viewOption function called");
    inquirer.
        prompt({
            name: "action",
            type: "rawlist",
            message: "Which would you like to view?",
            choices: [
                "View department",
                "View role",
                "View employee"
            ]            
    })
    .then (function(answer){
        console.log(answer);
        switch(answer.action){
            case "View department":
                console.log("View departments selected");
                viewDepartment();
                break;
            case "View role":
                console.log("View roles selected");
                viewRoles();
                break;
            case "View employee":
                console.log("View employee selected");
                viewEmployee();
                break;
            case "Return to previous menu":
                runInquirer();
                break;
        }
    });
}