'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    //--------------------------------------
    // ctx.beginPath();
    // ctx.moveTo(0, 100);
    // ctx.lineTo(canvas.width, 100);
    // ctx.moveTo(100, 0);
    // ctx.lineTo(100, canvas.height);
    // ctx.stroke();

    // ctx.font = 'bold 64px Verdana';
    // //フォントを指定する。
    // //標準だとこの状態だと引いた線にくっついた状態なので、それを変更する。
    // //ctx.textAlign = 'right';
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'top';
    // //始点がテキストの上の右側に揃えられる。
    // // ctx.fillText('Tokyo', 100, 100, 100);
    // //テキストを記載する。第4引数はテキストの幅を指定することができる。
    // //枠線だけでやりたいときは、
    // ctx.strokeText('Tokyo', 100,100, 100);
    // //文字の中が塗りつぶされていないものが入力できる。
    //--------------------------------------

    // const img = document.createElement('img');
    // img.src = 'img/logo.png';

    // img.addEventListener('load', () => {
    //   // ctx.drawImage( img , 0, 0);//0,0は位置を指定。
    //   // 幅と高さも指定できるので指定する。
    //   // // ctx.drawImage(img, 0 , 0, 40, 40 );
    //   // const pattern  = ctx.createPattern(img, 'repeat');
    //   //repeatすることもできる。縦横方向に敷き詰めることができる。片方ならrepeat-x , repeat-y、repeatしたくないとno-repeatにする。
    //   const pattern = ctx.createPattern (img, 'repeat-x');
    //   ctx.fillStyle = pattern;
    //   ctx.fillRect( 0, 0, canvas.width, canvas.height);
    //   //指定した幅と高さを指定することができる。
    // });
    //-----------------------------------------
    //画像の一部を切り抜く

    const img = document.createElement('img');
    img.src = './img/sprite.png';
    img.addEventListener('load', () => {
      // ctx.drawImage(img, 0, 0);
      ctx.drawImage(
        img,
        //切り出し元の画像を指定して
        //切り出し元の座標を指定する。　
        //sx, sy, sw, sh 
        70*2 , 70 , 70 , 70,
        //dx,dy,dw,dh　切り出した画像の描画先を指定。
        0, 0 , 35, 35
        //元の１マスの幅は、70*70なのでそれを元に座標を指定して切り抜く。6だけが切り抜けている。
      );
    });

  }

  draw();
}
