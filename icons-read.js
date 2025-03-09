const fs = require('fs');
const path = require('path');

function fetchIcons() {
  const iconsDir = 'src/assets/icons';
  const files = fs.readdirSync(iconsDir);

  const icons = files.reduce((acc, file) => {
    const iconName = path.parse(file).name;

    acc[iconName] = `url('/assets/icons/${file}')`;
    return acc;
  }, {});

  return { icons };
}

const config = fetchIcons();
module.exports = config;
