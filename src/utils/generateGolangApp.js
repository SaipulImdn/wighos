const fs = require('fs');
const { execSync } = require('child_process');
const { copyTemplate } = require('./copyTemplate');
const { replaceModuleNameInFiles } = require('./replaceModuleNameInFiles');
const { prompt } = require('../prompts');
const path = require('path');

const golangTemplatePath = path.join(__dirname, '..', 'templates', 'golang');

const generateGolangApp = async (destination) => {
  console.log('Generating Golang app...');
  fs.mkdirSync(destination, { recursive: true });
  copyTemplate(golangTemplatePath, destination);

  const { appName, golangVersion } = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Enter the name of your Golang app:',
      default: path.basename(destination),
    },
    {
      type: 'list',
      name: 'golangVersion',
      message: 'Select the Golang version for your app:',
      choices: ['1.16', '1.18', '1.19', '1.20'],
      default: '1.19',
    },
  ]);

  // Update go.mod
  const goModPath = path.join(destination, 'go.mod');
  if (fs.existsSync(goModPath)) {
    let goModContent = fs.readFileSync(goModPath, 'utf-8');
    goModContent = goModContent.replace('module golang-app', `module ${appName}`);
    goModContent = goModContent.replace('go 1.19', `go ${golangVersion}`);
    fs.writeFileSync(goModPath, goModContent);
  }

  // Replace "golang-app" with the new app name in all Go files
  replaceModuleNameInFiles(destination, 'golang-app', appName);

  console.log(`Golang app "${appName}" generated successfully at ${destination}`);
};

module.exports = { generateGolangApp };
