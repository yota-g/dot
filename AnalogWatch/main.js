'use strict';

(() => {
  class ClockDrawer {
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
    }
    draw(angle, func) {
      this.ctx.save();
      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.rotate((Math.PI / 180) * angle);
      this.ctx.beginPath();
      func(this.ctx);
      this.ctx.stroke();
      this.ctx.restore();
    }

    clear(){
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  class Clock {
    constructor(drawer) {
      this.r = 100;
      this.drawer = drawer;
      // this.h = new Date().getHours();
      // this.m = new Date().getMinutes();
      // this.s = new Date().getSeconds();
    }

    drawFace() {
      //盤面の描画のみにする。
      // const canvas = document.querySelector('canvas');
      // if(typeof canvas.getContext === 'undefined'){
      //   return;
      // }
      // const ctx = canvas.getContext('2d');
      // const width = canvas.width;
      // const height = canvas.height;
      for (let angle = 0; angle < 360; angle += 6) {
        this.drawer.draw(angle, (ctx) => {
          ctx.moveTo(0, -this.r);
          if (angle % 30 === 0) {
            ctx.width = 2;
            ctx.lineTo(0, -this.r + 10);
            ctx.font = '13px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(angle / 30 || 12, 0, -this.r + 25);
          } else {
            ctx.lineTo(0, -this.r + 5);
          }
        });
        // ctx.save(); //ループが戻るときに原点が移動しないようにsaveとrestoreを使用
        // ctx.translate(width /2 , height / 2);
        // //始点を指定。
        // ctx.rotate(Math.PI/180 * angle);
        // //回転させる。
        // ctx.beginPath();
        // // ctx.moveTo(0, -this.r);
        // // // 半径分上に移動しないといけから-this.r
        // // if(angle % 30 === 0){
        // //   ctx.width = 2;
        // //   ctx.lineTo( 0, -this.r + 10);
        // //   ctx.font = '13px Arial';
        // //   ctx.textAlign = 'center';
        // //   ctx.fillText(angle / 30 || 12 , 0 , -this.r + 25);
        // //   //位置は25下がったところにangle/30で割った時の数字を記載する。
        // //   //jsで0がfalseと判定されるところからfalseだったら12を使いなさいよというように指定ができる。
        // // }else{
        // //   ctx.lineTo(0, -this.r + 5);
        // // }
        // ctx.stroke();
        // ctx.restore();
      }
    }

    drawHands() {
      //hour
      this.drawer.draw(this.h * 30 + this.m * 0.5, (ctx) => {
        //分が反映されるようにthis.m * 05にする。
        ctx.lineWidth = 6;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -this.r + 50);
      });
      //mins
      this.drawer.draw(this.m * 6, (ctx) => {
        ctx.lineWidth = 4;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -this.r + 30);
      });
      //seconds
      this.drawer.draw(this.s * 6, (ctx) => {
        ctx.strokeStyle = 'red';
        ctx.moveTo(0, 20);
        ctx.lineTo(0, -this.r + 30);
      });
    }

    update(){
      this.h = new Date().getHours();
      this.m = new Date().getMinutes();
      this.s = new Date().getSeconds();
    }

    run() {
      this.update();
      //描画する前に一旦キャンバスをクリアしないと前回のが残っている。
      this.drawer.clear();
      this.drawFace();
      this.drawHands();
      setTimeout(() => {
        this.run();
        //描画前に現在時刻の更新をしないと動かない。
      }, 100);
    }
  }

  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }

  const clock = new Clock(new ClockDrawer(canvas));
  clock.run();
})();
