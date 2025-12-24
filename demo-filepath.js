const path = require('node:path');

const myfile = 'myFile.txt';

path.dirname(myfile); // /users/joe
path.basename(myfile); // notes.txt
path.extname(myfile); // .txt

const temp = {
  dirName: path.dirname(myfile),
  baseName: path.basename(myfile),
  extension: path.extname(myfile),
};
console.log(temp);

//https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
