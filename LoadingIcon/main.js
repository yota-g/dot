'use strict';

(() => {
  class IconDrawer {
    //インスタンスを渡すことで描画を任してあげることができる。
    constructor (canvas){
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.r = 60;
    }
    //描画関連をこちらに格納。
    draw(angle) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.save();
      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.rotate((Math.PI / 180) * angle);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0 - this.r - 5);
      this.ctx.lineTo(0, 0 - this.r + 5);
      this.ctx.strokeStyle = 'orange';
      this.ctx.lineWidth = 6;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  class Icon {
    constructor(drawer) {
      this.drawer = drawer;
      //IconDrawerのインスタンスを引き継ぐ
      // this.ctx = canvas.getContext('2d');
      // this.width = canvas.width;
      // this.height = canvas.height;
      // this.r = 60; //円の半径
      this.angle = 0;
      //回転させる角度を指定。
    }
    draw(){
      this.drawer.draw(this.angle);
    }
    // draw() {
    //   //描画したものを消していく。領域を半透明な物で塗りつぶすという方法を使用する。
    //   this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    //   this.ctx.fillRect(0, 0, this.width, this.height);

    //   this.ctx.save();
    //   this.ctx.translate(this.width / 2, this.height / 2);
    //   //原点を移動させる。
    //   this.ctx.rotate((Math.PI / 180) * this.angle);
    //   //translateとrotateを繰り返していると座標区間が狂ってしまう。描画ごとに座標と空間をsaveすればいい。

    //   //angle分ズレた位置に描画される。
    //   //後はangleをずらしながら行えばいいので、
    //   //更新系はupdateにまとめるようにする。

    //   // this.ctx.beginPath();
    //   // this.ctx.arc(this.width / 2 , this.height / 2, this.r , 0, 2 * Math.PI);
    //   // this.ctx.arc(0 , 0, this.r , 0, 2 * Math.PI);
    //   // this.ctx.stroke();

    //   this.ctx.beginPath();
    //   // this.ctx.moveTo(this.width / 2, this.height / 2 - this.r - 5);
    //   this.ctx.moveTo(0, 0 - this.r - 5);
    //   // this.ctx.lineTo(this.width / 2, this.height / 2 - this.r + 5);
    //   this.ctx.lineTo(0, 0 - this.r + 5);
    //   this.ctx.strokeStyle = 'orange';
    //   this.ctx.lineWidth = 6;
    //   this.ctx.stroke();

    //   //canvasの中心から図形の原点を円の中心に持ってくる。そこから座標空間ごと回転させるという技を使用する。

    //   this.ctx.restore();
    //   //restoreすると原点が0,0戻って再度呼び出すと原点が同じになる。
    // }

    update() {
      //12度ずつ増やすようにする。
      this.angle += 12;
    }

    run() {
      this.update();
      this.draw();
      setTimeout(() => {
        this.run();
      }, 100);
    }
  }

  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  // const icon = new Icon(canvas);
  const icon = new Icon(new IconDrawer(canvas));
  icon.run();
})();
//returnは関数内でしか使用できないので今回は即時関数にする。{}ではなくて。
