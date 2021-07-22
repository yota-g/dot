'use strict';

(() => {
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');  
      this.loop();
    }
    //情報を更新して描画するのをゲームループと呼ぶ。
    loop(){
      this.update();
      this.draw();

      //ブラウザの次の描画タイミングに合わせて、渡した関数を実行してくれる。渡した関数でthisを使用するとundefinedになるのでそこで無名関数を使用する。
      requestAnimationFrame(() => {
        this.loop();
        //アロー関数を使用することでこのthis.がGame関数のインスタンスを指すようになる。
      });
    }

    update() {

    }

    draw(){
      console.log(new Date());
    }
  }

  const canvas = document.querySelector('canvas');
  if(typeof canvas.getContext === 'undefined'){
    return ; //関数の中でしか使用できないのでブロックを即時関数に変更。
  }

  new Game(canvas);
})();