const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);
console.log(mineReadFile);
async function main() {
  try {
    let data1 = await mineReadFile('./promise-class.html');
    let data2 = await mineReadFile('./promise-demo.html');
    console.log(data1+data2);
  } catch (error) {
    console.log("error",error);
  }
}
main();
