import './css/index.css';
import './css/index.scss';
import './fonts/iconfont.css';

import '@babel/polyfill';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
promise.then(() => {
  console.log('执行了');
});
