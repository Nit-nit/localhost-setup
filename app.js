const fs = require('fs');
const path = require('path');

// Get the folder name from the command-line argument.
const folderName = process.argv[2];

if (!folderName) {
  console.error('Please provide a folder name as a command-line argument.');
  process.exit(1);
}

// Function to create a unique project folder name.
function getUniqueFolderName(baseFolderName) {
  let folderName = baseFolderName;
  let count = 2;

  while (fs.existsSync(folderName)) {
    folderName = `${baseFolderName}${count}`;
    count++;
  }

  return folderName;
}

// Create a unique project folder.
const projectFolder = getUniqueFolderName(folderName);

// Create frontend and backend folders.
const frontendFolder = path.join(projectFolder, 'frontend');
const backendFolder = path.join(projectFolder, 'backend');

fs.mkdirSync(projectFolder);
fs.mkdirSync(frontendFolder);
fs.mkdirSync(backendFolder);

// Create index.html content.
const indexHtmlContent = `
<html>
  <head>
    <title>sample</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="script.js"></script>
  </head>

  <body>
    <p>Your project has been set up successfully</p>
  </body>
</html>
`;

// Create index.html file in the frontend folder.
fs.writeFileSync(path.join(frontendFolder, 'index.html'), indexHtmlContent);

// Create style.css content.
const styleCssContent = `/* Your CSS styles go here */`;

// Create style.css file in the frontend folder.
fs.writeFileSync(path.join(frontendFolder, 'style.css'), styleCssContent);

// Create script.js content.
const scriptJsContent = `// Your JavaScript code goes here`;

// Create script.js file in the frontend folder.
fs.writeFileSync(path.join(frontendFolder, 'script.js'), scriptJsContent);

// Update app.js content to serve frontend files correctly.
const appJsContent = `const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('frontend'));

app.listen(port, () => {
  console.log('The server is running at http://localhost:3000');
});
`;

// Create app.js file in the backend folder.
fs.writeFileSync(path.join(backendFolder, 'app.js'), appJsContent);

// Log a success message.
console.log(`Your sample project has been set up successfully as "${projectFolder}"`);
