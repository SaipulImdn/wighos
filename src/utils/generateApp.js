const { prompt } = require('../prompts');
const { generateExpressApp } = require('./generateExpressApp');
const { generateGolangApp } = require('./generateGolangApp');
const { generateRustApp } = require('./generateRustApp');
const path = require('path');

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
      choices: ['express', 'golang', 'rust'],
    },
  ]);

  if (answers.type === 'express') {
    await generateExpressApp(appDirectory);
  } else if (answers.type === 'golang') {
    await generateGolangApp(appDirectory);
  } else if (answers.type === 'rust') {
    await generateRustApp(appDirectory); // Handle Rust app generation
  }
};

module.exports = { generateApp };
