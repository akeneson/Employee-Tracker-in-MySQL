//[dependencies]
var mysql = require("mysql");
var inquirer = require("inquirer");
const { constants } = require("crypto");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeDB"
})

connection.connect(function (err) {
    if (err) throw err;
    runInquirer();
})


function runInquirer() {
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
    }).then(function (answer) {
        console.log(answer);
        switch (answer.action) {
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
function addOption() {
    console.log("addOption function called");
    inquirer.
        prompt({
            name: "action",
            type: "rawlist",
            message: "Which would you like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "Return to main menu"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            switch (answer.action) {
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
                case "Return to main menu":
                    runInquirer();
                    break;
            }
        });
}
//[ADD DEPARTMENT]
function addDepartment() {
    console.log("addDepartment function called");
    inquirer.prompt({
        type: "input",
        message: "Enter the name of the department: ",
        name: "newDept"
    }).then(function (response) {
        console.log(response);
        connection.query("INSERT INTO department SET ?", { department_name: response.newDept },
            function (error, response) {
                if (error) throw error;
                console.log("Department has been added successfully");
                connection.end();
            });
    })

}
//[ADD ROLES]
function addRoles() {
    console.log("addRoles function called");
    connection.query("SELECT * FROM department", function (error, response) {
        if (error) throw error;
        let departments = [];
        // map department
        departments = response.map(result => ({
            id: result.department_ID,
            name: result.department_name
        }));
        // pass it as a choice
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the new role: ",
                name: "newRole"
            },
            {
                type: "input",
                message: "Enter the salary of the new role: ",
                name: "newSalary"
            },
            {
                type: "list",
                message: "Enter the department ID of the new role: ",
                name: "newDeptID",
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]).then(function (response) {
            console.log(response);
            connection.query("INSERT INTO roles SET ?", {
                title: response.newRole,
                salary: response.newSalary,
                department_ID: response.newDeptID
            },
                function (error, response) {
                    if (error) throw error;
                    console.log("Role has been added successfully");
                    connection.end();
                });
        })

    })

}
// [ADD EMPLOYEES]
function addEmployee() {
    console.log("addEmployee function called");
    // [query roles for list]
    connection.query("SELECT * FROM roles", function (error, response) {
        if (error) throw error;
        // let role = viewRoles();
        // console.log("Role: ", role);
        // map role
        roles = response.map(result => ({
            id: result.role_ID,
            name: result.title
        }));
        console.log("Roles", roles);
        // const getManagerList = getManager(); 
        // [query managers for list]
    // connection.query("SELECT * FROM employee", function (error, response) {
    //     if (error) throw error;
    //     manager = response.map(item => ({
    //         id: item.employee_ID,
    //         name: item.manager_id
    //     }));
        // console.log("Managers", getManagerList);
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the first name of the employee: ",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter the last name of the employee: ",
            name: "lastName"
        },
        {
            type: "list",
            message: "What's is the new employee's title?",
            name: "employeeTitle",
            choices: roles.map(roleItem => ({ name: roleItem.name, value: roleItem.id }))
        },
        {
            type: "input",
            message: "What is the new employee's manager ID?",
            name: "manager"
        }
        // {
        //     type: "list",
        //     message: "Who is the employee's manager?",
        //     name: "employeeManager",
        //     choices: {getManagerList}
        // }
            ]).then(function (response) {
                connection.query("INSERT INTO employee SET ?", {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.employeeTitle,
                    manager_id: response.manager
                    // manager_id: response.employeeManager
                },
                    function (error, response) {
                        if (error) throw error;
                        console.log("Employee has been added successfully");
                        connection.end();
                    });
            })
        })
    // })
}

// [query managers for list]
function getManager() {
    connection.query("SELECT * FROM employee", function (error, response) {
        if (error) throw error;
        manager = response.map(item => ({
            id: item.role_id,
            name: item.manager_id
        }));
        // console.log("Managers", manager);
        const managerInfo = manager.map(managerItem => ({ name: managerItem.name, value: managerItem.id }));
        console.log("getManager function called: ", managerInfo);
        return this.managerInfo;
    })

}
// ---------------------VIEW OPTION --------------------------

function viewOption() {
    console.log("viewOption function called");
    inquirer.
        prompt({
            name: "action",
            type: "rawlist",
            message: "Which would you like to view?",
            choices: [
                "View department",
                "View roles",
                "View employee",
                "Return to main menu"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            switch (answer.action) {
                case "View department":
                    console.log("View departments selected");
                    viewDepartment();
                    break;
                case "View roles":
                    console.log("View roles selected");
                    viewRoles();
                    break;
                case "View employee":
                    console.log("View employee selected");
                    viewEmployee();
                    break;
                case "Return to main menu":
                    runInquirer();
                    break;
            }
        });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function (error, res) {
        console.table(res);
        connection.end();
    })
}


function viewRoles() {
    return connection.query("SELECT * FROM roles", function(error, res){
        console.table(res);
        connection.end();
    })
}

function viewEmployee() {
    return connection.query("SELECT * FROM employee", function(error, res){
        console.table(res);
        connection.end();
    })
}

// ----------------------UPDATE EMPLOYEE ROLE -----------------------
function updateRole(data) {
    connection.query(`UPDATE employee SET role_id = ${data.title} WHERE id = ${data.employee_ID}`, function(error, res){
        if (error) throw error;
    },
    inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Choose employee to update",
            choices: viewEmployee()
        },
        {
            name: "roleID",
            type: "number",
            message: "Enter new role ID: "
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (error, data) {
            console.table(data);
        })
    })
    )
}