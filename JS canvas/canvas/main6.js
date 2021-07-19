'use strict';

{
  let t = 0;

  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //四角で領域をクリアできる。　

    //キャラクターにアニメーションを入れる。
    ctx.beginPath();
    ctx.ellipse(100, 100, 40 , 30, 0, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    //三角関数を使用する。マイナス1から１で変化する値を取得することができる。
    ctx.ellipse(80 + 2* Math.sin(t/30) , 100, 8 , 8 , 0, 0 , 3* Math.PI);
    ctx.ellipse(120 + 2 * Math.sin(t/30), 100, 8 , 8 , 0, 0 , 3* Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    t ++ ;
    setTimeout( draw, 10);

  }

  draw();
}
