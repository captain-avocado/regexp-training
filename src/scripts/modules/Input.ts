import Prism from 'prismjs';

export default class Input {
  private row: HTMLElement;
  private input: HTMLElement;
  private statusBlock: HTMLElement;
  private codeBlock: HTMLElement;
  private outputBlock: HTMLElement;
  public validateFunc: Function;

  private showStatus = (flag: boolean) => {
    this.statusBlock.innerText = flag ? '✅' : '❌';
  }

  private handleChange = (e: Event) => {
    const value = (<HTMLInputElement>e.target).value;
    this.showStatus(this.validateFunc(value));
  }

  constructor(id: string, validateFunc: Function) {
    this.row = document.getElementById(id);
    this.input = this.row.querySelector('.input');
    this.statusBlock = this.row.querySelector('.status'); 
    this.codeBlock = this.row.querySelector('.code');
    this.outputBlock = this.row.querySelector('.output');
    this.validateFunc = validateFunc;
  }

  public init = () => {
    this.input.addEventListener('keyup', this.handleChange);
    console.log(this.validateFunc.toString());
    this.codeBlock.innerText = Prism.highlight(this.validateFunc, Prism.languages.javascript, 'javascript');
    return this;
  }
}
