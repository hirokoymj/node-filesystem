# Node.js FileSytem (fs)

**Summary (final)**

```js
const fs = require('fs').promises;
const path = require('path');
//----------------
const files = await fs.readdir(fileDir);
const filePath = path.join(fileDir, fileName);
const stats = await fs.stat(filePath);
stats.size;
stats.birthtime.toISOString().split('T')[0]; //(YYYY-MM-DD)
const data = await fs.readFile(filePath, 'utf8');
await Promise.all(promises);
```

| Topic               | API / Code                     | Purpose                               | Key Notes                                     |
| ------------------- | ------------------------------ | ------------------------------------- | --------------------------------------------- |
| Read directory      | `fs.readdir(fileDir)`          | Reads all file names in a directory   | Returns an array of strings (file names only) |
| Build file path     | `path.join(fileDir, fileName)` | Creates a safe file path              | Cross-platform (Windows / macOS / Linux)      |
| Get file metadata   | `fs.stat(filePath)`            | Reads file information                | Returns a `Stats` object                      |
| File size           | `stats.size`                   | Size of file in bytes                 | Available from `fs.stat()`                    |
| File created date   | `stats.birthtime`              | File creation time                    | Use `toISOString()` for formatting            |
| Async iteration     | `files.map(async () => {})`    | Process multiple files asynchronously | Returns an array of Promises                  |
| Promise aggregation | `Promise.all(promises)`        | Waits for all async tasks             | Runs in parallel (faster than `for...await`)  |
| Error handling      | `try / catch`                  | Handles async errors                  | Required for async/await                      |

https://www.w3schools.com/nodejs/nodejs_event_loop.asp
https://nodejs.org/en

## Non-blocking Examples

```js
const fs = require('fs');
console.log('Before file read');
fs.readFile('myfile.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File contents:', data);
});
console.log('After file read');
// =============
// Before file read
// After file read
// File contents: This is the content of myfile.txt
```

**Ex2**
https://www.w3schools.com/nodejs/nodejs_event_loop.asp

**Event Loop Order**

1. Execute the main script (synchronous code)
2. Process any microtasks (Promises, process.nextTick)
3. Execute timers (setTimeout, setInterval)
4. Run I/O callbacks (file system, network operations)
5. Process setImmediate callbacks
6. Handle close events (like socket.on('close'))

```js
console.log('First');
setTimeout(() => console.log('Third'), 0);
Promise.resolve().then(() => console.log('Second'));
console.log('Fourth');
// =================
// First
// Fourth
// Second
// Third
// 1. Sync code runs first ('First', 'Fourth')
// 2. Microtasks (Promises) run before the next phase ('Second')
// 3. Timers execute last ('Third')
```

https://www.w3schools.com/nodejs/nodejs_event_loop.asp

## Example: Asynchronous File Read

[link](https://www.w3schools.com/nodejs/nodejs_async.asp)

```js
const fs = require('fs');

console.log('1. Starting async read...');
fs.readFile('myfile.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('2. File contents:', data);
});

console.log('3. Done starting read operation');
```

- Output order: 1 → 3 → 2 (doesn't wait for file read to complete)

## Promises

- Pending: Initial state, operation not completed
- Fulfilled: Operation completed successfully
- Rejected: Operation failed

## Creating and Using Promises

**ex1**

```js
const promiseA = new Promise((resolve, reject) => {
  resolve(777);
});
// At this point, "promiseA" is already settled.
promiseA.then((val) => console.log('asynchronous logging has val:', val));
console.log('immediate logging');
```

**ex2**

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all();
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```

## Async/Await

```js
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('myfile.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

readFile();
```

## fs modules

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const stats = await fs.stat('/Users/joe/test.txt');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    console.log(stats.size); // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
```

**Read a file directory**

```js
const readFolder = async (fileDir) => {
  try {
    const files = await readdir(fileDir);
    for (const file of files) console.log(file);
  } catch (err) {
    console.error(`Failed to read directory "${fileDir}":`, err.message);
  }
};
readFolder('./testDir');
```

```js
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
```

Summary(draft)

```js
const fs = require('fs').promises;
const path = require('path');
//----------------
const files = await fs.readdir(fileDir);
const filePath = path.join(fileDir, fileName);
const stats = await fs.stat(filePath);
stats.size;
stats.birthtime.toISOString().split('T')[0]; //(YYYY-MM-DD)
const data = await fs.readFile(filePath, 'utf8');
await Promise.all(promises);
```

| Topic               | API / Code                     | Purpose                               | Key Notes                                     |
| ------------------- | ------------------------------ | ------------------------------------- | --------------------------------------------- |
| Read directory      | `fs.readdir(fileDir)`          | Reads all file names in a directory   | Returns an array of strings (file names only) |
| Build file path     | `path.join(fileDir, fileName)` | Creates a safe file path              | Cross-platform (Windows / macOS / Linux)      |
| Get file metadata   | `fs.stat(filePath)`            | Reads file information                | Returns a `Stats` object                      |
| File size           | `stats.size`                   | Size of file in bytes                 | Available from `fs.stat()`                    |
| File created date   | `stats.birthtime`              | File creation time                    | Use `toISOString()` for formatting            |
| Async iteration     | `files.map(async () => {})`    | Process multiple files asynchronously | Returns an array of Promises                  |
| Promise aggregation | `Promise.all(promises)`        | Waits for all async tasks             | Runs in parallel (faster than `for...await`)  |
| Error handling      | `try / catch`                  | Handles async errors                  | Required for async/await                      |
