'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // // ctx.arc(x, y , r , start, end); 始点と終点の角度をラジアンで指定するといい。
    // //canvasでは0度が右端で時計回りで角度が増えていくことを理解しておくこと。
    // // ctx.arc(100, 100, 50, 0, 2*Math.PI);
    // //Math.Pi は2πの意味 360度の円を書きたいとき
    // // ctx.arc(100, 100, 50, 0, 300/ 360 * 2*Math.PI);  //300度の円を記載したいとき。
    // // ctx.arc(100, 100, 50, 0, 300 / 180 *Math.PI); 
    // //最後の引数にtrueを渡すと反時計回りに描画される。60度の部分が描画される。0から300度までを描画。
    // ctx.arc(100, 100, 50, 0, 300 / 180 *Math.PI, true);

    // // ctx.stroke();
    // ctx.fill();
    //始点と終点が結ばれて中が塗りつぶされる。　
    //ただ円グラフのように扇形にしたい場合は、Pathの始点をは、円の中心に持ってくればいいのでmoveToを記載して中心に持ってくるようにする。そうすると扇形で塗りつぶすことができる。
    //------------------------------------------

    //楕円を描画
    //ctx.ellipse(x, y, rx, ry, rotation(回転角度 楕円の角度を変更できる。), start, end);
    //ctx.beginPath()を省略可
    // ctx.ellipse(100, 100, 50, 30, 0 , 0, 2*Math.PI );
    // ctx.stroke();
    // ctx.fill();

    //-----------------------------------------
    //四角の書き方。　fillRectと引数の書き方は同じで、中が塗りつぶされていない。
    // 四角を書くだけならfillRect, strokeRectでもいいが、pathとして描画できるRectもあるといい。
    ctx.rect( 50, 50 , 50, 50);
    ctx.stroke();

  }

  draw();
}
