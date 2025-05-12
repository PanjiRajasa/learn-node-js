const fs = require('fs');
const path = require('path');

const completePath = path.join(__dirname, "../anotherDummyFolder/easy.txt")
const fileContent = fs.readFileSync(completePath, 'utf8');
console.log(fileContent);
console.log(__dirname)