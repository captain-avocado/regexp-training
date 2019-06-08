import Input from './modules/Input';

const handler = (value: string) => {
  return value.search(/\d/g) >= 0 ? true : false;
}
const input = new Input('task1', handler).init();



// querySelectorAll<HTMLInputElement>('input').

