const fs = require('node:fs/promises');
async function example() {
  try {
    const stats = await fs.stat('');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    console.log(stats.size); // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
