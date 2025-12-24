const fs = require('node:fs/promises');
const path = require('node:path');

// async function example(file) {
//   try {
//     const absolutePath = path.resolve(file);

//     const stats = await fs.stat(absolutePath);
//     const data = await fs.readFile(absolutePath, 'utf8');

//     const fileInfo = {
//       filename: path.basename(file),
//       filepath: absolutePath,
//       size: stats.size,
//       createdAt: stats.birthtime.toISOString().split('T')[0],
//     };
//     console.log('File Info', JSON.stringify(fileInfo, null, 2));
//     console.log('File Contents', data);
//   } catch (err) {
//     console.error(err);
//   }
// }

const example = async (file) => {
  try {
    const stats = await fs.stat(file);
    const data = await fs.readFile(file, 'utf8');

    const fileInfo = {
      filename: path.basename(file),
      filepath: path.resolve(file),
      size: stats.size,
      extension: path.extname(file),
      createdAt: stats.birthtime.toISOString().split('T')[0],
    };
    console.log('File Info', JSON.stringify(fileInfo, null, 2));
    console.log('File Contents', data);
  } catch (err) {
    console.error('Failed to read file:', err.message);
  }
};
example('myfile.txt');
