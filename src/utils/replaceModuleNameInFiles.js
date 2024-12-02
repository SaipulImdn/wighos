const fs = require('fs');
const path = require('path');

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

module.exports = { replaceModuleNameInFiles };
