import data from './assets/mock/data.json';
import './assets/css/index.css';
import './assets/css/index.less';
import './assets/iconfont/iconfont.css';

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
console.log(add(1, 2));
