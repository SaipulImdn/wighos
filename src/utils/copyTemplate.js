const fs = require('fs');
const path = require('path');

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

module.exports = { copyTemplate };
