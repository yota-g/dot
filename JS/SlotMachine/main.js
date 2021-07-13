'use strict';

{
  class Panel {
    constructor () {
      const section = document.createElement('section');
      //セクションはコンストラクターの中でしか使用しないから変数にしている。
      section.classList.add('panel');
      this.img = document.createElement('img');
      this.img.src = './img/seven.png';
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop');
    }
    
  }
}