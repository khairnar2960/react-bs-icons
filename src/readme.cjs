const fs = require('fs');
const path = require('path');
const iconsJson = require('./bs.icons.min.json');
const packageJson = require('../package.json');

// Helper function to convert icon names to a readable format
const toTitleCase = (str) => {
  return str.replace(/(?:^|\s|[-_])\w/g, (match) => match.toUpperCase());
};

const numbers = [
'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'
];

// Generate the list of icons in markdown format
const generateIconsList = () => {
  let iconsList = '';
  iconsJson.forEach(({ name, fill }) => {
	let _name = name.split(!isNaN(name) ? '' : '-');
	const formattedName = _name.map(n => !isNaN(n) ? numbers[n] : toTitleCase(n)).join('');

    iconsList += `- ${formattedName}${fill ? ' (Filled)' : ''}\n`;
  });
  return iconsList;
};

// Main content for the README file
const readmeContent = `# React Bootstrap Icons
![npm](https://img.shields.io/npm/v/react-bs-icons) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/react-bs-icons/${packageJson.version}) ![GitHub release (by tag)](https://img.shields.io/github/downloads/khairnar2960/react-bs-icons/stable/total) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/react-bs-icons) ![npm](https://img.shields.io/npm/dy/react-bs-icons) ![GitHub issues](https://img.shields.io/github/issues-raw/khairnar2960/react-bs-icons) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/khairnar2960/react-bs-icons)

Bootstrap icons for React. This package provides over 2000 Bootstrap icons as React components.

## Installation

Install the package using npm or yarn:

\`\`\`bash
npm install react-bs-icons
\`\`\`

or

\`\`\`bash
yarn add react-bs-icons
\`\`\`

## Usage

### Dynamic Import

You can dynamically import icons as needed:

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { loadIcon } from 'react-bs-icons';

const MyComponent = () => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    loadIcon('Activity').then(setIcon);
  }, []);

  return (
    <div>
      {Icon && <Icon className="my-icon" />}
    </div>
  );
};

export default MyComponent;
\`\`\`

### Static Import

You can also statically import individual icons:

\`\`\`jsx
import React from 'react';
import { Activity } from 'react-bs-icons/icons/activity';

const MyComponent = () => (
  <div>
    <Activity className="my-icon" />
  </div>
);

export default MyComponent;
\`\`\`

## Available Icons

Below is the list of available icons:

${generateIconsList()}

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Harshal Khairnar

- GitHub: [Harshal Khairnar](https://github.com/khairnar2960)
`;

// Write the README content to a README.md file
const outputFilePath = path.join(__dirname, '../README.md');
fs.writeFileSync(outputFilePath, readmeContent, 'utf8');

console.log(`README.md file has been generated at ${outputFilePath}`);
