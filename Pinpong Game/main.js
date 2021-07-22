'use strict'

(() => {
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      
    }
  }

  const canvas = document.querySelector('canvas');
  if(typeof canvas.getContext === 'undefined'){
    return ; //関数の中でしか使用できないのでブロックを即時関数に変更。
  }

  new Game(canvas);
})();