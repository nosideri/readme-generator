// function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {
  let draftTBC = '## Table Of Contents';

  if (userResponses.installation !== '') {draftTBC += '* [Installation](#installation)'};
  if (userResponses.usage !== '') {draftTBC += '*[Usage](#usage)'};
  if (userResponses.contributing !== '') {draftTBC += '*[Contributing](#contributing)'};
  if (userResponses.tests !== '') {draftTBC += '*[Tests](#tests)'};

  let draftMarkdown = 
  `# ${userResponses.title} 
  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor) Check out the badges hosted by [shields.io](https://shields.io/). 
  ## Description 
  ${userResponses.description}
  `

  draftMarkdown += draftTBC;

  draftMarkdown += `*[License](#license)`;

  if (userResponses.installation != '') {draftMarkdown += `## Installation ${userResponses.installation}`
  };

  if (userResponses.usage !== '') {draftMarkdown += `## Usage ${userResponses.usage}`
  };

  if (userResponses.contributing !== '') {`## Contributing ${userResponses.contributing}`
  };

  if (userResponses.tests !== '') {draftMarkdown += `## Tests ${userResponses.tests}`
  };

  draftMarkdown += `## License ${userResponses.license}`;

  let draftDev = `## Contact 
  For any questions, please contact me at [@${userInfo.login}](${userInfo.url}) or at my email:`;
  if  (userInfo.email !== null) { draftDev += 'Email: ${userInfo.email} '};

  draftMarkdown += draftDev;

  return draftMarkdown;
}

module.exports = generateMarkdown;
