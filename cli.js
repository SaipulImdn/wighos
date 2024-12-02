#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { program } = require('commander');
const { execSync } = require('child_process');

// Template paths
const expressTemplatePath = path.join(__dirname, 'src', 'templates', 'express');
const golangTemplatePath = path.join(__dirname, 'src', 'templates', 'golang');

// Create the prompt instance for inquirer
const prompt = inquirer.createPromptModule();

// Available versions
const nodeVersions = ['14.17.0', '16.0.0', '18.0.0', '20.0.0'];
const npmVersions = ['6.14.8', '7.0.0', '9.0.0'];
const golangVersions = ['1.16', '1.18', '1.19', '1.20'];

// Function to copy files from template folder
const copyTemplate = (templatePath, destination) => {
  const files = fs.readdirSync(templatePath);

  files.forEach((file) => {
    const srcFile = path.join(templatePath, file);
    const destFile = path.join(destination, file);

    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyTemplate(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
};

// Function to replace module name in all Go files
const replaceModuleNameInFiles = (directory, oldModuleName, newModuleName) => {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replaceModuleNameInFiles(filePath, oldModuleName, newModuleName); // Recursive for directories
    } else if (file.endsWith('.go')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      const updatedContent = content.replace(new RegExp(oldModuleName, 'g'), newModuleName);
      fs.writeFileSync(filePath, updatedContent);
    }
  });
};

// Function to update package.json with app name, Node.js, and npm versions
const updatePackageJson = (destination, appName, nodeVersion, npmVersion) => {
  const packageJsonPath = path.join(destination, 'package.json');
  let packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');

  const packageJson = JSON.parse(packageJsonContent);
  packageJson.name = appName;
  packageJson.engines = {
    node: nodeVersion,
    npm: npmVersion,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

// Function to generate Express.js app
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
      choices: nodeVersions,
      default: '16.0.0',
    },
    {
      type: 'list',
      name: 'npmVersion',
      message: 'Select the npm version for your app:',
      choices: npmVersions,
      default: '7.0.0',
    },
  ]);

  updatePackageJson(destination, appName, nodeVersion, npmVersion);

  console.log('Installing dependencies...');
  execSync('npm install', { cwd: destination, stdio: 'inherit' });
};

// Function to generate Golang app (with clean architecture)
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
      choices: golangVersions,
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

// Command to generate app based on user choice
const generateApp = async (destination) => {
  const isAbsolutePath = path.isAbsolute(destination);
  const appDirectory = isAbsolutePath
    ? destination
    : path.join(process.cwd(), destination);

  const answers = await prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which stack would you like to generate?',
      choices: ['express', 'golang'],
    },
  ]);

  if (answers.type === 'express') {
    await generateExpressApp(appDirectory);
  } else if (answers.type === 'golang') {
    await generateGolangApp(appDirectory);
  }
};

// Set up the CLI commands
program
  .command('generate')
  .description('Generate a new app (Express.js or Golang)')
  .argument('<name>', 'Name of the application or destination folder')
  .action(async (name) => {
    await generateApp(name);
  });

program.parse(process.argv);
