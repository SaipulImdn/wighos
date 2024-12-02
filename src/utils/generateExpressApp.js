const fs = require('fs');
const { execSync } = require('child_process');
const { copyTemplate } = require('./copyTemplate');
const { updatePackageJson } = require('./updatePackageJson');
const { prompt } = require('../prompts');
const path = require('path');

const expressTemplatePath = path.join(__dirname, '..', 'templates', 'express');

const generateExpressApp = async (destination) => {
  console.log('Generating Express.js app...');
  fs.mkdirSync(destination, { recursive: true });
  copyTemplate(expressTemplatePath, destination);

  const { appName, nodeVersion, npmVersion } = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Enter the name of your Express app:',
      default: path.basename(destination),
    },
    {
      type: 'list',
      name: 'nodeVersion',
      message: 'Select the Node.js version for your app:',
      choices: ['14.17.0', '16.0.0', '18.0.0', '20.0.0'],
      default: '16.0.0',
    },
    {
      type: 'list',
      name: 'npmVersion',
      message: 'Select the npm version for your app:',
      choices: ['6.14.8', '7.0.0', '9.0.0'],
      default: '7.0.0',
    },
  ]);

  updatePackageJson(destination, appName, nodeVersion, npmVersion);

  console.log('Installing dependencies...');
  execSync('npm install', { cwd: destination, stdio: 'inherit' });
};

module.exports = { generateExpressApp };
