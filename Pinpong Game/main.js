'use strict';

(() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
    //maxまでのran数を設定する。
    //min以上にするためにmin を加える。
  }
  class Ball{
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      // this.x = 30;
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      // this.vx = 5;
      this.vx = rand(3, 5) * (Math. random() < 0.5 ? 1 : -1);
      // this.vy = 3;
      this.vy = rand(3, 5) *(Math.random() < 0.5 ? 1 : -1);
    }

    update(){
      this.x += this.vx;
      this.y += this.vy;
      //壁に当たったら跳ね返るようにする。
      //半径を考慮しないと壁に食い込んだ状態になるのでそこを反映させる。
      if(
        this.x - this.r< 0 || this.x + this.r > this.canvas.width
      ){
        this.vx *= -1;
      }

      if( this.y - this.r < 0 || this.y + this.r > this.canvas.height ){
        this.vy *= -1;
      }
    }

    draw(){
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.arc(this.x, this.y, this.r, 0 ,2 * Math.PI);
      this.ctx.fill();
    }

  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');  
      this.ball = new Ball(this.canvas);
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
      this.ball.update();
    }

    draw(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
      console.log(new Date());
    }
  }

  const canvas = document.querySelector('canvas');
  if(typeof canvas.getContext === 'undefined'){
    return ; //関数の中でしか使用できないのでブロックを即時関数に変更。
  }

  new Game(canvas);
})();