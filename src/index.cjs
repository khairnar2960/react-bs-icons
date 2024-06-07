const fs = require('fs');
const path = require('path');
const { toTitleCase } = require('./string.cjs');
const iconsJson = require('./bs.icons.min.json');

let importStatements = `
export const loadIcon = async (iconName) => {
  switch (iconName) {
`;

iconsJson.forEach(({ name, fill }) => {
  let _name = name.split(!isNaN(name) ? '' : '-');
  const numbers = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  _name = _name.map(n => !isNaN(n) ? numbers[n] : toTitleCase(n));
  let baseName = _name.join('');
  
  if (fill) {
    _name.push('Fill');
  }
  
  const exportName = _name.join('');
  const fileName = _name.join('.').toLowerCase();
  
  importStatements += `
    case '${exportName}':
      return import('./icons/${fileName}').then(module => module.${exportName});
  `;
  
  if (fill) {
    _name.pop(); // Remove 'Fill' for the non-fill version
    importStatements += `
    case '${baseName}':
      return import('./icons/${_name.join('.').toLowerCase()}').then(module => module.${baseName});
    `;
  }
});

importStatements += `
    default:
      throw new Error(\`Unknown icon: \${iconName}\`);
  }
};
`;

const outputFilePath = path.join(__dirname, '../dist', 'index.jsx');
fs.writeFileSync(outputFilePath, importStatements, 'utf8');

console.log(`index.jsx file has been generated at ${outputFilePath}`);
