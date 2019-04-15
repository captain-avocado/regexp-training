import { menuSelect } from './modules/menu';
menuSelect();

const doc: Node = document.querySelector('body');
console.log('hello', ': ', doc);

const calcX = (): number => {
  return 5;
};

calcX();
