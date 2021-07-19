'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    //   ctx.shadowOffsetX = 4;
    //   ctx.shadowOffsetY = 4;
    //   ctx.shadowBlur = 4;
    //   ctx.shadowColor = 'rgba(0, 0, 0 , 0.3)';
    //   ctx.fillRect(50, 50, 50, 50);

    //----------------------------------------
    // ctx.beginPath();
    // ctx.moveTo(50, 50);
    // ctx.lineTo(100, 50);
    //指定した場所から横にだけラインを引きたいからyを50のままにする。
    // ctx.lineTo(100,  100);
    //指定した場所からした方向にだけラインを引きたいからyを100にする。
    // ctx.lineTo(50, 100);//これを３つ目に指定するとコになる
    // ctx.closePath();//closePathを入れることで始点と終点を繋ぐことができる。パスを閉じるという。

    // ctx.stroke(,);//描画のために使用する。pathの通りに線が弾かれる。横線を引いて、縦線を引いたようになる。

    // ctx.fill();//strokeではなくfillを使用することでpathで囲んだものを塗ることができる自由に図形を書くことができる。
    //----------------------------------------

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.setLineDash([5, 10]);
    //5線を引いて、10間隔を開ける。配列で指定する。
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.setLineDash([]);
    //2本線を引くときは、上で点線を指定したのでこちらで実践にするために配列を空白にする。
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(200, 150);
    ctx.lineWidth = 16; //lineの太さを指定する。 
    ctx.lineCap = 'round'; //角がまるくなる。
    ctx.stroke();

  }

  draw();
}
