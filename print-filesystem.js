const fs = require('fs').promises;
const path = require('path');

const main = async (testDir) => {
  try {
    const files = await fs.readdir(testDir);
    console.log(files); //[ 'text1.txt', 'text2.txt' ]

    const fileDataPromises = files.map(async (fileName) => {
      const filePath = path.join(testDir, fileName);
      const stats = await fs.stat(filePath);
      console.log(stats);

      return {
        fileName: fileName,
        filePath: filePath,
        size: stats.size,
        createdAt: stats.birthtime.toISOString().split('T')[0],
        isDirectry: stats.isDirectory(),
      };
    });

    const result = await Promise.all(fileDataPromises);

    console.log(JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error('Error reading directory:', error.message);
  }
};

// Example usage:
main('./test');
