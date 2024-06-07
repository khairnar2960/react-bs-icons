const fs = require('fs');
const path = require('path');
const { toTitleCase } = require('./string.cjs');
const iconsJson = require('./bs.icons.min.json');

const numbers = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'
];

const generate = (fill, name, _name) => {
  if (fill) {
    _name.push('Fill');
  }
  
  const fileName = _name.join('.'); 
  const classes = ['bi', `bi-${name}${fill ? '-fill' : ''}`];
  const exportStatement = `export const ${_name.join('')} = ({ className, ...props }) => { const c = ['${classes.join("', '")}']; if (className) { c.push(className) } return (<i className={c.join(' ')} {...props} />)}`;
  const outputFilePath = path.join(__dirname, '../dist/icons', fileName.toLowerCase() + '.jsx');
  fs.writeFileSync(outputFilePath, exportStatement, 'utf8');
}

for (const { name, fill } of iconsJson) {
  let _name = name.split(!isNaN(name) ? '' : '-');
  _name = _name.map(n => !isNaN(n) ? numbers[n] : toTitleCase(n));
  
  generate(false, name, _name);
  if (fill) {
    generate(true, name, _name);
  }
}

console.log('icons file has been generated at /dist/icons');