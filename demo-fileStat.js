const fs = require('node:fs');

fs.stat('myFile.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB

  const result = {
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    size: stats.size,
  };
  console.log(result);
});

//https://nodejs.org/en/learn/manipulating-files/nodejs-file-stats
