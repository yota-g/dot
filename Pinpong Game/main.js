'use strict';

(() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
    //maxまでのran数を設定する。
    //min以上にするためにmin を加える。
  }
  class Ball {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      // this.x = 30;
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      // this.vx = 5;
      this.vx = rand(3, 5) * (Math.random() < 0.5 ? 1 : -1);
      // this.vy = 3;
      this.vy = rand(3, 5) * (Math.random() < 0.5 ? 1 : -1);
    }
    bounce(){
      this.vy *= -1;
    }

    reposition (paddleTop){
      this.y = paddleTop -this.r;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR(){
      return this.r;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      //壁に当たったら跳ね返るようにする。
      //半径を考慮しないと壁に食い込んだ状態になるのでそこを反映させる。
      if (this.x - this.r < 0 || this.x + this.r > this.canvas.width) {
        this.vx *= -1;
      }

      if (this.y - this.r < 0 || this.y + this.r > this.canvas.height) {
        this.vy *= -1;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  class Paddle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.w = 60;
      this.h = 16;
      this.x = this.canvas.width / 2 - (this.w / 2);
      this.y = this.canvas.height - 32;
      this.mouseX = this.x;
      this.addHandler();
    }

    addHandler() {
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        //マウスと壁の位置がズレている。これはclientXの位置がブラウザの端を視点にしているから、その分を引く。
      });
    }

    update(ball) {
      const ballBottom = ball.getY() + ball.getR();
      const paddleTop = this.y;
      const ballTop = ball.getY() - -ball.getR();
      const paddleBottom =this.y + this.h;
      const ballCenter = ball.getX()
      ;
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;
      if(
        ballBottom > paddleTop && 
        ballTop < paddleBottom  &&
        ballCenter > paddleLeft && 
        ballCenter < paddleRight
      ){
        ball.bounce();
        ball.reposition(paddleTop); //ボールが入ってくるとそれをパドルの上に押し戻してあげるということを設定する。

      }
      const rect = this.canvas.getBoundingClientRect();
      this.x = this.mouseX - rect.left - (this.w / 2);
      // -this.wはpaddleの左端がマウスの座標になるのでパドルの真ん中にマウスの座標がくるようにしている。
      if (this.x < 0 ){
        this.x = 0;
      }
      if (this.x > this.canvas.width){
        this.x = this.canvas.width - this.w
      }
    }

    draw() {
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas);
      this.loop();
      this.isGameOver =false;
    }
    //情報を更新して描画するのをゲームループと呼ぶ。
    loop() {
      if(this.isGameOver){
        return;
      }
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
      this.paddle.update(this.ball);
      if (this.ball.getMissedStatus()){
        this.isGameOver = true;
      }
    }

    draw() {
      if(this.isGameOver){
        this.drawGameOver();
        return ;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
      this.paddle.draw();
      // console.log(new Date());
    }

    drawGameOver() {
      this.ctx.font ='28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 50, 150);
    }
  }

  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return; //関数の中でしか使用できないのでブロックを即時関数に変更。
  }

  new Game(canvas);
})();
