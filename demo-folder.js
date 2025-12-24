const fs = require('node:fs/promises');
const path = require('path');

const readFolder = async (fileDir) => {
  try {
    const files = await fs.readdir(fileDir); //[text1.txt, text2.txt]
    console.log(files);
    const fileDataPromises = files.map(async (fileName) => {
      const filePath = path.join(fileDir, fileName);
      const stats = await fs.stat(filePath);
      return {
        fileName,
        size: stats.size,
        createdAt: stats.birthtime.toISOString().split('T')[0],
      };
    });
    console.log(fileDataPromises); //[ Promise { <pending> }, Promise { <pending> } ]
    const result = await Promise.all(fileDataPromises);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Failed to read directory "${fileDir}":`, err.message);
  }
};
readFolder('./testDir');

//https://nodejs.org/docs/v24.12.0/api/fs.html#fspromisesreaddirpath-options
