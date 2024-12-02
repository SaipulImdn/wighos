const fs = require('fs');
const { execSync } = require('child_process');
const { copyTemplate } = require('./copyTemplate');
const { prompt } = require('../prompts');
const path = require('path');

const rustTemplatePath = path.join(__dirname, '..', 'templates', 'rust');

const generateRustApp = async (destination) => {
  console.log('Generating Rust app...');
  fs.mkdirSync(destination, { recursive: true });
  copyTemplate(rustTemplatePath, destination);

  const { appName } = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Enter the name of your Rust app:',
      default: path.basename(destination),
    },
  ]);

  // Update Cargo.toml
  const cargoTomlPath = path.join(destination, 'Cargo.toml');
  if (fs.existsSync(cargoTomlPath)) {
    let cargoTomlContent = fs.readFileSync(cargoTomlPath, 'utf-8');
    cargoTomlContent = cargoTomlContent.replace('name = "rust"', `name = "${appName}"`);
    fs.writeFileSync(cargoTomlPath, cargoTomlContent);
  }

  // Run `cargo build` to build the Rust app
  console.log('Running `cargo build`...');
  execSync('cargo build', { cwd: destination, stdio: 'inherit' });

  console.log(`Rust app "${appName}" generated successfully at ${destination}`);
};

module.exports = { generateRustApp };
