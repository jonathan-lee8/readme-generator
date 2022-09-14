// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./Develop/utils/generateMarkdown')

// TODO: Create an array of questions for user input
const questions = [
      {
          type: 'input',
          name: 'title',
          message: "What is your project's title. (Required)",
          validate: projName => {
              if(projName) {
                  return true;
              } else {
                  console.log('Please enter the name of your project!');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project. (Required)',
          validate: projDesc => {
              if(projDesc){
                  return true;
              } else{
                  console.log('Please enter a project description');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'installation',
          message: 'Enter detailed instructions for how to get the development environment running for your project. (Required)',
          validate: projInstall => {
              if(projInstall){
                  return true;
              } else{
                  console.log('Please enter installation instructions for your project');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'usage',
          message: 'Enter any instructions or examples for use of your project. (Required)',
          validate: projUse => {
              if(projUse){
                  return true;
              } else{
                  console.log('Please enter useage instructions or examples for your project');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'contribution',
          message: 'Enter any guidelines for how you would like individuals to contribute to your project'
      },
      {
          type: 'input',
          name: 'tests',
          message: 'Enter any tests for your project'
      },
      {
          type: 'list',
          name: 'license',
          message: 'Select a license that applies to your project',
          choices: ['GPL', 'CC--0', 'MIT', 'None'],
          validate: licenseChoice => {
            if (licenseChoice) {
                return true;
            } else {
                console.log('Choose a license!')
                return false;
            }
        }
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub username. (Required)',
          validate: ghName => {
              if (ghName){
                  return true;
              }else {
                  console.log('Please enter the GitHub Link for your project')
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'email',
          message: 'Enter your email. (Required)',
          validate: email => {
              if (email){
                  return true;
              }else {
                  console.log('Please enter the GitHub Link for your project')
                  return false;
              }
          }
      }
  ];


// TODO: Create a function to write README file
function writeToFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/README.md', data, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: 'File created! Navigate to the "dist" folder to see your README!'
      });
    });
  });
};

const init = () => {
  return inquirer.prompt(questions);
};

init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})
