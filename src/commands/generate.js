const { program } = require('commander');
const { generateApp } = require('../utils/generateApp');

program
  .command('generate')
  .description('Generate a new app (Express.js, Golang, or Rust)')
  .argument('<name>', 'Name of the application or destination folder')
  .action(async (name) => {
    await generateApp(name);
  });

program.parse(process.argv);
