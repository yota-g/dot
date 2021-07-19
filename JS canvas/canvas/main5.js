'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, 200, 200);
    //キャラクターを描こう
    ctx.beginPath();
    ctx.ellipse(100, 100, 40 , 30, 0, 0, 2*Math.PI);//楕円を描画
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80, 100, 8 , 8 , 0, 0 , 2* Math.PI);
    ctx.ellipse(120, 100, 8 , 8 , 0, 0 , 2* Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();
    //描画を保存することができるsaveメソッドがある。
    ctx.save();
    //設定を一旦保存する。


    //もう少し同じ図形で小さいのを描画したいときはscallを使用して、x,y方向の倍率を指定できるので指定してそれ以降の図形を描画するようにできる。
    ctx.scale(0.5, 0.5); 
    //半分のサイズで記載される。図形が書かれた作業空間ごとサイズを小さくするという認識
    //その後に同じコードを書けばサイズが小さくなって記載される。
    //図形を移動させるにはtranslateを使用する。
    ctx.translate(400, 0);
    //回転させるにはrotateを使用する。
    ctx.rotate(45 / 180 * Math.PI);


    ctx.fillStyle = 'olive'; //scaleの後だと座標空間ごと小さくなっていることがわかる。
    ctx.fillRect(0, 0, 200, 200);


    ctx.beginPath();
    ctx.ellipse(100, 100, 40 , 30, 0, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80, 100, 8 , 8 , 0, 0 , 2* Math.PI);
    ctx.ellipse(120, 100, 8 , 8 , 0, 0 , 2* Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    //設定を戻すにはrestoreを使用する
    ctx.restore();
    //元の座標空間を意識して記載すればいいのでそれで記載していく。
    ctx.fillStyle = 'black';
    ctx.fillRect(80, 120, 40, 40);
    //色は上で使用されたもののままなので設定してあげればいい。  

  }

  draw();
}
