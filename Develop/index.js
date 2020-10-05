const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const api = require('./utils/app.js');
const generatePage = require('./utils/generateMarkdown.js');

// const profileDataArgs = process.argv.slice(2);

// const [data] = profileDataArgs;



// array of questions for user
const questions = [
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your email?",
        name: 'email',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid email must be entered.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your GitHub username?",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo name is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What are the steps required to install your project?",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide a link of an example of how you use your project.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "How can other developers contribute to your project?",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Are there any tests written for your application? If yes, provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "What license would you like for your project?",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }

        console.log("Success! Your README.md has been generated!")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// function to initialize program
async function init() {
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching GitHub data next...");

        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        console.log("Generating your README next...")
        const markdown = generatePage(userResponses, userInfo);
        console.log(markdown);

        await writeFileAsync('README.md', markdown);

    } catch (error) {
        console.log(error)
    }
};

// function call to initialize program
init();
