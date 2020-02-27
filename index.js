var inquirer = require('inquirer');
var fs = require('fs');
var util = require('util');
const writeFileSync = util.promisify(fs.writeFile);
class Employee {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role; 
    }
}
class manager extends Employee {
    constructor(id, name, role, noOfTeamMembers, idsOfTeamMembers) {
        super(id, name, role);
        this.noOfTeamMembers = noOfTeamMembers;
        this.idsOfTeamMembers = idsOfTeamMembers;
    }
}
var Mengineer;


var teamPlayersArr = [];
var managerArr = [];
var engineerArr = [];
var internArr = [];
function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        message: "add an employee? (Yes/No)",
        name: 'confirmation'
    }]).then(function (responseview) {
        if (responseview.confirmation == 'yes') {
            gatherInformation();
        }
        else if (responseview.confirmation == 'no') {
            
        var arrteams = managerArr[0].idsOfTeamMembers;
            var info = `<h1>Employee Information table</h1>
            <h2>Manager and his team members </h2>
            <ul><li>Employee ID: ${managerArr[0].id}</li>
            <li>Employee Name : ${managerArr[0].name}</li>
            <li>Employee Designation: ${managerArr[0].role}</li></ul>`;
            fs.writeFileSync('index.html', info,function(err){
                if(err){
                  return console.log(err);}
                  console.log('saved successfully');
               
             } );
        
               console.log(`${arrteams}`);
                for(var j=0;j<arrteams.length;j++){
                    // console.log(`${arrteams[j]}`);
                        for(k=0;k<engineerArr.length;k++)
                        {
                            
                        Mengineer = engineerArr.findIndex(obj => obj.id === `${arrteams[j]}`);
                        if(Mengineer >= 0 ){ console.log('entering engineer managers');
                    console.log(`${engineerArr[Mengineer].id},${engineerArr[Mengineer].name},${engineerArr[Mengineer].role},${engineerArr[Mengineer].email},${engineerArr[Mengineer].gitUsername}`);
                    var infolist = `
                    <h2>His Team Members</h2>
                    <h2>Engineers in Team</h2>
                    <ul>
                    <li>Employee ID: ${engineerArr[Mengineer].id}</li>
                    <li>Employee Name : ${engineerArr[Mengineer].name}</li>
                     <li>Employee Designation: ${engineerArr[Mengineer].role}</li>
                     <li>Employee Email : ${engineerArr[Mengineer].email}</li>
                     <li>Employee Git-Hub Username: ${engineerArr[Mengineer].gitUsername}</li></ul>`;
             
                    fs.appendFile('index.html', infolist,function(err){
                        if(err){
                          return console.log(err);}
                          console.log('saved successfully');
                       
                     } );
                
                }

               
                            if(Mengineer == -1)
                            {
                            for(l=0;l<internArr.length;l++)
                            {   
                                // console.log("entered third loop");
                                var Mintern = internArr.findIndex(obj => obj.id === `${arrteams[j]}`); 
                                if(Mintern >= 0 ){console.log('entering engineer managers');
                                    console.log(`${internArr[Mintern].id},${internArr[Mintern].name},${internArr[Mintern].role},${internArr[Mintern].schoolName},${internArr[Mintern].internshipDuration}`);}
                                    let infoteamIntern =`
                                            <h2>Interns in Team</h2>
                                            <ul>
                                            <li>Employee ID: ${internArr[Mintern].id}</li>
                                             <li>Employee Name : ${internArr[Mintern].name}</li>
                                             <li>Employee Designation: ${internArr[Mintern].role}</li>
                                             <li>Employee Email : ${internArr[Mintern].schoolName}</li>
                                             <li>Employee Git-Hub Username: ${internArr[Mintern].internshipDuration}</li>
                                             </ul>
                                             `;
               
                                             fs.appendFile('index.html', infoteamIntern,function(err){
                                                if(err){
                                                  return console.log(err);}
                                                  console.log('saved successfully');
                                               
                                             } );
                            };
                             
                               
                        };
                        
                    };
                    };
                             
                     
                
                               
                                    
                                             
                                   
            
                                            
          
                                            


        }
    });
}
addEmployee();
function gatherInformation() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Employee ID Number?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter Employee Name?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter Employee role in your company?',
            name: 'role'
        }
    ])
        .then(async function (response) {

            if (response.role === 'manager') {
                const roleManager = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'No of Team Members?',
                        name: 'noOfTeamPlayers'
                    }
                ]);
                for (i = 0; i < roleManager.noOfTeamPlayers; i++) {
                    const teamPlayerId = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Please Enter Team Member IDs',
                            name: 'IdOfEmployee'
                        }
                    ]);

                    teamPlayersArr.push(teamPlayerId.IdOfEmployee);
                };
                console.log(`${teamPlayersArr}`);
                var emp = new manager();
                emp.id = response.id;
                emp.name = response.name;
                emp.role = response.role;
                emp.noOfTeamMembers = roleManager.noOfTeamPlayers;
                emp.idsOfTeamMembers = teamPlayersArr;
                teamPlayersArr = [];
                managerArr.push(emp);
                console.log(`${emp.idsOfTeamMembers}`);
                addEmployee();

            }
            else if (response.role === 'engineer') {
                const roleEngineer = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Please enter Employee Email ID?',
                        name: 'empEmail'
                    }, {
                        type: 'input',
                        message: 'Please enter Employee Git-Hub UserName?',
                        name: 'empGithubUserName'
                    }
                ]);
                class engineer extends Employee {
                    constructor(id, name, role, email, gitUsername) {
                        super(id, name, role);
                        this.email = email;
                        this.gitUsername = gitUsername;
                    }
                }
                var eng = new engineer();
                eng.id = response.id;
                eng.name = response.name;
                eng.role = response.role;
                eng.email = roleEngineer.empEmail;
                eng.gitUsername = roleEngineer.empGithubUserName;
                engineerArr.push(eng);
                console.log(`${engineerArr}`);
                addEmployee();
            }
            else if (response.role === 'intern') {
                const roleIntern = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Please enter Employee School?',
                        name: 'school'
                    }, {
                        type: 'input',
                        message: 'Please enter internship duration?',
                        name: 'duration'
                    }
                ]);
                class intern extends Employee {
                    constructor(id, name, role, schoolName, internshipDuration) {
                        super(id, name, role);
                        this.schoolName = schoolName;
                        this.internshipDuration = internshipDuration;
                    }
                }
                var itn = new intern();
                itn.id = response.id;
                itn.name = response.name;
                itn.role = response.role;
                itn.schoolName = roleIntern.school;
                itn.internshipDuration = roleIntern.duration;
                internArr.push(itn);
                console.log(`${internArr}`);
                addEmployee();
            }

        });



};
