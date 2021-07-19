'use strict';

{
  let t = 0;

  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    //高解像度ディスプレイに対応させる。
    //解像度の密度に応じて一旦大きな領域に描画した後にそれを縮小すると綺麗になる。
    //計算のためにcanvasの高さと幅を変数で持っておく。
    const CANVAS_WIDTH =  600; 
    const CANVAS_HEIGHT = 240;
    const dpr = window.devicePixelRatio || 1;
    //ディスプレイの密度を取得。描画するときの1picxelが物理picxelいくつ分かを確認できる。取得できなかったときは等倍である１を返すことを指定する。
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    //dprが2だと密度が2倍になるということ
    //canvasを大きくしても図形は大きくならないので、変形のためのscaleを使用する。
    ctx.scale(dpr, dpr); //説明者のディスプレイだと2倍の図形が表示されているがそれを元に戻してあげる。displayによる。
    canvas.style.width =  CANVAS_WIDTH + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';
    //canvas.style.width or heightはブラウザで描画する時のcanvasのサイズを指定している。
    ctx.font = 'bold 48px Verdana';
    ctx.strokeText('Tokyo', 100, 100);

  }

  draw();
}
