const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const generatePage = require('./utils/generateMarkdown.js');

const profileDataArgs = process.argv.slice(2);

const [data] = profileDataArgs;


inquirer
    .prompt([
        questions
    ])
// array of questions for user
const questions = [
    'What is the title of your project?',
    'Write a description of your project.',
    'If you have a link to a preview of your project, paste it here:',
    'What is the URL to the repository?',
    'How do you install the project?',
    'How do you use this project?',
    'Who contributed to this project?',
    'What kind of license would you like your project to have?',
    'How can others contribute to your project?',
    'What is your GitHub username?',
    'What is your email?',
    'How do you test this project?'
];

// destructured array into const
const title = questions[0];
const description = questions[1];
const preview = questions[2];
const url = questions[3];
const install = questions[4];
const use = questions[5];
const whoContributed = questions[6];
const license = questions[7];
const contribute = questions[8];
const username = questions[9];
const email = questions[10];
const test = questions[11];

//console.log(title, description, preview, url, install, use, whoContributed, license, contribute, username, email, test);

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
function init() {
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching GitHub data next...");

        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error)
    }
};

// function call to initialize program
init();
