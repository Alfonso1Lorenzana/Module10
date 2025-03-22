import inquirer from "inquirer";
import DepartmentService from "./services/DepartmentService.js";
import EmployeeService from "./services/EmployeeService.js";
import RoleService from "./services/RoleService.js";


class CLI {
    questionPrompts () : void {
        inquirer.prompt([
         {
             type: 'list', 
             name: 'options',
             message: 'Pick what you would like to do',
             choices: [
                {
                    questionName: 'View All Departments',
                    value: 'VIEW ALL DEPARTMENTS',
                },
                {
                    questionName: 'View All Roles',
                    value: 'VIEW ALL ROLES',
                },
                {
                    questionName: 'View All Employees',
                    value: 'VIEW ALL EMPLOYEES',
                },
                {
                    questionName: 'Add A Department',
                    value: 'ADD A DEPARTMENT',
                },
                {
                    questionName: 'Add A Role',
                    value: 'ADD A ROLE',
                },
                {
                    questionName: 'Add A Employees',
                    value: 'ADD AN EMPLOYEE',
                },
                {
                    questionName: 'Update Employee Role',
                    value: 'UPDATE AN EMPLOYEE ROLE',
                },
                {
                    questionName: 'Quit',
                    value: 'QUIT',
                },
            ], //choices
          }
        ]
    )
    .then(async (answers: {options: string}) => {
        switch(answers.options) {
            case 'VIEW ALL DEPARTMENTS':
                console.log("Fetching all departments...");
                // Add logic to fetch and display departments
                DepartmentService.getDepartments()
                .then((depts) => {
                    console.table(depts);
                    this.questionPrompts();
                })
                .catch((err) => {
                    console.error("Error getting departments: ", err);
                    this.questionPrompts();
                });
                break;
            case 'VIEW ALL ROLES':
                console.log("Fetching all roles...");
                // Add logic to fetch and display roles

                this.questionPrompts();                
                break;
            case 'VIEW ALL EMPLOYEES':
                console.log("Fetching all employees...");
                // Add logic to fetch and display employees
                EmployeeService.getEmployees()
                .then((emps) => {
                    console.table(emps);
                    this.questionPrompts();
                })
                .catch((err) => {
                    console.error("Error getting employees: ", err);
                    this.questionPrompts();
                });

                this.questionPrompts();                
                break;
            case 'ADD A DEPARTMENT':
                console.log("Adding a new department...");
                // Add logic to add a new department

                this.questionPrompts();                
                break;
            case 'ADD A ROLE':
                console.log("Adding a new role...");
                // Add logic to add a new role

                this.questionPrompts();                
                break;
            case 'ADD AN EMPLOYEE':
                console.log("Adding a new employee...");
                // Add logic to add a new employee
                await this.addEmployee();
                this.questionPrompts();                
                break;
            case 'UPDATE AN EMPLOYEE ROLE':
                console.log("Updating employee role...");
                // Add logic to update an employee role

                this.questionPrompts();                
                break;
            case 'QUIT':
                console.log("Exiting application...");
                process.exit();
                break;
            default:
                console.log("Invalid option selected.");
                this.questionPrompts();
                break;
        }
    })
}

async addEmployee(): Promise<void> {
    try {
      // Fetch all roles asynchronously
      const roles = await RoleService.getRoles();
      if (!roles || roles.length === 0) {
        console.log("No roles available.");
        return;
      }

      // Prepare the role choices (name as label and id as value)
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      // Fetch all roles asynchronously
      const managers = await EmployeeService.getEmployees();

      // Check if roles are fetched successfully
      if (!managers || managers.length === 0) {
        console.log("No managers available.");
        return;
      }

      // Prepare the role choices (name as label and id as value)
      const managerChoices = managers.map((manager) => ({
        name: `${manager?.first_name || ""} ${manager?.last_name || ""}`,
        value: manager.id,
      }));

      // Prompt user for role title, salary, and department choice
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter employee's first name?",
          validate: (input: string) => {
            if (!input.trim()) {
              return "First name cannot be empty.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter employee's last name?",
          validate: (input: string) => {
            if (!input.trim()) {
              return "Last name cannot be empty.";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices,
          validate: (input: number) => {
            if (!input) {
              return "Please choose a role.";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "managerId",
          message: "Who is the manager?",
          choices: [{ name: "None", value: null }, ...managerChoices],
          validate: (input: number) => {
            if (input === null || input === -1) {
              return true; // Allow "None" or a specific value
            }
            if (!input) {
              return "Please choose a manager.";
            }
            return true;
          },
        },
      ]);

      // At this point, answers contains roleTitle, salary, and departmentId
      const { firstName, lastName, roleId, managerId } = answers;

      // You can now use these values, for example, to create a new role or save them
      console.log(
        `Given firstName: ${firstName}, lastName: ${lastName}, roleId: ${roleId}, managerId: ${managerId}`
      );

      const employee = await EmployeeService.addEmployee(
        firstName,
        lastName,
        roleId,
        managerId
      );
      console.log(
        `Employee ${employee.first_name} ${employee.last_name} is added to the database`
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

}

export default CLI;
