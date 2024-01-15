// Object of license badges and their corresponding URLs
const licenses = {
  "GNU AGPLv3": "AGPL-3.0",
  "GNU GPLv3": "GPL-3.0",
  "GNU LGPLv3": "LGPL-3.0",
  "Mozilla Public License 2.0": "MPL-2.0",
  "Apache License 2.0": "Apache-2.0",
  "MIT License": "MIT",
  "Boost Software License 1.0": "BSL-1.0",
  "BSD 3-Clause License": "BSD-3-Clause",
  "Eclipse Public License 2.0": "EPL-2.0",
  "CC BY": "CC%20BY",
  "CC BY-SA": "CC%20BY-SA",
  "CC0": "CC0",
  "ISC License": "ISC",
  "Microsoft Public License": "Ms-PL",
  "Common Development and Distribution License": "CDDL-1.0",
  "The Unlicense": "Unlicense",
};

// Returns a license badge based on which license is passed in
function renderLicenseBadge(license) {
  // CHECK IF license is a key within object of licenseBadges and combine value with URL; ELSE empty string
  if (licenses[license]) {
    return `[![${license}](https://img.shields.io/badge/License-${licenses[license]}-blue)](#license)`;
  } else {
    return "";
  }
}

// Returns the license link
function renderLicenseLink(license) {
  // DECLARE Base URL + appendages depending on license
  let baseURL = "https://opensource.org/licenses/";

  // If license is a key within object of licenses, append value to baseURL and return; ELSE empty string
  if (licenses[license]) {
    baseURL += licenses[license];
    return baseURL;
  } else {
    return "";
  }
}

// Returns the license section of README
function renderLicenseSection(license) {
  if (license) {
    return `## License \n This application is covered under the [${license}](${renderLicenseLink(
      license
    )}) license.`;
  } else {
    return "";
  }
}

function renderTableOfContentsSection() {
  // sections is an array of objects with 'title' and 'link' properties
  const sections = [
    { title: "Introduction", link: "#introduction" },
    { title: "Installation", link: "#installation" },
    { title: "Usage", link: "#usage" },
    { title: "Tests", link: "#tests" },
    { title: "Contribution", link: "#contribution" },
    { title: "Questions", link: "#questions" },
    { title: "License", link: "#license" },
  ];

  let tableOfContents = "## Table of Contents\n";

  // For each section, add a line to the table of contents
  sections.forEach((section, index) => {
    tableOfContents += `${index + 1}. [${section.title}](${section.link})\n`;
  });

  return tableOfContents;
}

// FUNCTION to render a Test section
function renderTestSection(hasTests, tests) {
  // CHECK IF hasTests is true, then generate markdown with Test content; ELSE placeholder text
  if (hasTests) {
    return `${tests}`;
  } else {
    return `This project does not currently include any tests.`;
  }
}

function renderContributionSection(acceptingContribution, contribution) {
  if (acceptingContribution) {
    return `## Contribution\n${contribution}`;
  }
  return "This project is not currently accepting contributions. Thank you for your interest!";
}

function renderQuestionsSection(hasEmail, email, gitHubUserName) {
  let questionsSection = "## Questions\n";

  if (hasEmail) {
    questionsSection += `- For any questions related to the project, you can reach out to me at [${email}](mailto:${email}).\n`;
  }

  if (gitHubUserName) {
    questionsSection += `- You can also find me on GitHub: [${gitHubUserName}](https://github.com/${gitHubUserName}).\n`;
  }

  return questionsSection;
}

// Function to generate an Introduction section
function renderIntroductionSection(title, description, license) {
  // DECLARE licenseBadge variable and assign to renderLicenseBadge function
  let licenseBadge = renderLicenseBadge(license);
  let intro = "## Introduction\n";
  intro += `# ${title} ${licenseBadge} \n\n${description}`;
  return intro;
}

// Function to generate an Installation section
function renderInstallationSection(installation) {
  return `## Installation\n${installation}`;
}

// Function to generate Usage
function renderUsageSection(usage) {
  if (!usage || usage.trim().length === 0) {
    return "## Usage\nThis project does not currently have usage instructions.";
  }

  return `## Usage\n${usage}`;
}

function generateMarkdown(data) {
  return `
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&duration=2000&pause=1000&width=435&lines=++Welcom+To+My+Project+;${data.title.replace(
    / /g,
    "+"
  )})](https://git.io/typing-svg)  
---

${renderIntroductionSection(data.title, data.description, data.license)}

---

${renderTableOfContentsSection()}
${renderInstallationSection(data.installation)}
${renderUsageSection(data.usage)}
${renderTestSection(data.tests)}
${renderContributionSection(data.acceptingContribution, data.contribution)}
${renderQuestionsSection(data.hasEmail, data.email, data.gitHubUserName)}
${renderLicenseSection(data.license)}
`;
}

module.exports = generateMarkdown;
