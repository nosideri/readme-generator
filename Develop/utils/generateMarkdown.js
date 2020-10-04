// function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}
  # ${data.description}
  # ${data.preview}
  # ${data.url}
  # ${data.install}
  # ${data.use}
  # ${data.whoContributed}
  # ${data.license}
  # ${data.contribute}
  # ${data.username}
  # ${data.email}
  # ${data.test}
`;
}

module.exports = generateMarkdown;
