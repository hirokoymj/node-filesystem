const fs = require('node:fs/promises');

async function example() {
  try {
    const data = await fs.readFile('myfile.txt', { encoding: 'utf8' });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
example();
//node demo-readFile.js
//this is my file.
//the promise-based fsPromises.readFile()
//https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
