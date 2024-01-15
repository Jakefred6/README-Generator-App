const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
  {
    type: "input",
    name: "title",
    message: "Project Title:",
    validate: (title) => (title.trim().length ? true : "Cannot be left blank."),
  },
  {
    type: "editor",
    name: "description",
    message: "Project Description (Markdown supported):",
    validate: (description) =>
      description.trim().length ? true : "Cannot be left blank.",
  },
  {
    type: "confirm",
    name: "hasInstallation",
    default: true,
    message: "Provide installation instructions?",
  },
  {
    type: "editor",
    name: "installation",
    message: "Installation Instructions (Markdown supported):",
    when: (responses) => responses.hasInstallation,
  },
  {
    type: "editor",
    name: "usage",
    message: "Usage Instructions (Markdown supported):",
  },
  {
    type: "confirm",
    name: "hasTests",
    default: true,
    message: "Does the project include tests?",
  },
  {
    type: "editor",
    name: "tests",
    message: "Information about tests (Markdown supported):",
    when: (responses) => responses.hasTests,
  },
  {
    type: "confirm",
    name: "acceptingContribution",
    default: false,
    message: "Looking for contributions?",
  },
  {
    type: "input",
    name: "contribution",
    message: "Briefly describe how to contribute:",
    when: (responses) => responses.acceptingContribution,
    validate: (contribution) =>
      contribution.trim().length ? true : "Cannot be left blank.",
  },
  {
    type: "confirm",
    name: "hasQuestions",
    default: true,
    message: "Provide contact information for questions?",
  },
  {
    type: "input",
    name: "email",
    message: "Your email:",
    when: (responses) => responses.hasQuestions,
    validate: (email) => (email.trim().length ? true : "Cannot be left blank."),
  },
  {
    type: "input",
    name: "gitHubUserName",
    message: "Your GitHub username:",
    when: (responses) => responses.hasQuestions,
    validate: (gitHubUserName) =>
      gitHubUserName.trim().length ? true : "Cannot be left blank.",
  },
  {
    type: "list",
    name: "license",
    message: "Select a license:",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
      "BSD 3-Clause License",
      "Eclipse Public License 2.0",
      "CC BY",
      "CC BY-SA",
      "CC0",
      "ISC License",
      "Microsoft Public License",
      "Common Development and Distribution License",
      "The Unlicense",
    ],
  },
];

// const questions = [
//     {
//         type: 'input',
//         name: 'title',
//         message: 'What is the title of your project?',
//     },
//     {
//         type: 'editor',
//         name: 'description',
//         message: 'Provide a brief description of your project:',
//     },
//     {
//         type: 'editor',
//         name: 'installation',
//         message: 'How can users install your project? Provide installation instructions:',
//     },
//     {
//         type: 'editor',
//         name: 'usage',
//         message: 'How should users use your project? Provide usage information:',
//     },
//     {
//         type: 'list',
//         name: 'license',
//         message: 'Choose a license for your project:',
//         choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'None'],
//     },
//     {
//         type: 'editor',
//         name: 'contributing',
//         message: 'How can others contribute to your project? Provide contribution guidelines:',
//     },
//     {
//         type: 'editor',
//         name: 'tests',
//         message: 'What are the testing instructions for your project?',
//     },
//     {
//         type: 'input',
//         name: 'username',
//         message: 'What is your GitHub username?',
//     },
//     {
//         type: 'input',
//         name: 'email',
//         message: 'What is your email address?',
//     },
// ];

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err
      ? console.error("Error writing your README file:", err)
      : console.log("README generated successfully!")
  );
}

// Function to initialize app
function init() {
  inquirer.prompt(questions).then((data) => {
    const readmeContent = generateMarkdown(data);
    writeToFile("README.md", readmeContent);
  });
}

// Function call to initialize app
init();
