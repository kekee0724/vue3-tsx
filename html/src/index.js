import data from './data.json';
import './index.css';
import './index.less';
import './iconfont/iconfont.css'

console.log(data);
/**
 *  * webpack ./src/index.js -o ./build/built.js --mode=development
 *  * webpack ./src/index.js -o ./build/built.js --mode=production
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function add(x, y) {
  return x + y;
}
console.log(add(1,2));
