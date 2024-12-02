const fs = require('fs');
const path = require('path');

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

module.exports = { updatePackageJson };
