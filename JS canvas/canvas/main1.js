'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if ( typeof canvas.getContext === 'undefined'){
      return;
      //undefinedだとcanvasに対応していないのでここで処理を止めるようにする。
    }
    const ctx = canvas.getContext('2d');
    //今回は平面に描画するので2d
    //グラデーションの設定線形と遠景
    // ctx.createLinearGradient(x0始点, y0, x1終点, y1);
    // const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //真横にグラデーションするときはyの終点を０にしておく。

    // const g = ctx.createRadialGradiennt(　円グラディエーション
    //   x0, y0, r0, 始点となるx、yと半径
    //   x1, y1, r1、終点となるもの
    // );
    const g = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2 , 50,
      canvas.width / 2 + 100 , canvas.height/ 2 + 200, 300
    );
    g.addColorStop(0, '#f00');//始点
    // g.addColorStop(0.3, '#0f0');
    g.addColorStop(0.1, '#0f0');
    g.addColorStop(1,'#00f');//終点

    ctx.fillStyle = g;
    // ctx.fillRect(0, 0, 600, 240);
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //Contextはこれを通じて色を設定したり描画したりする。エフレのようなもの。ブラウザがcanvasに対応しているかを確認する必要もいる。 ので、if関数を使用して確認。
    //ctx.fillRect(x, y , width, height);　塗りつぶした図形　色はデフォルトで黒
    // ctx.fillStyle = 'pink';//表現はcssの表現をそのまま使用可能。
    // ctx.fillRect(50 ,  50 , 50 , 50);
    //枠だけにするには、strokeRectで可能になる。
    // ctx.strokeStyle = '#f00'; //strokeの色の変更
    // ctx.lineWidth = 8; //lineの太さを変えれる。pxはいらない。
    // ctx.lineJoin = 'round'; //線が交わるところの形を変えることができる。
    // ctx.lineJoin = 'bevel'; //角のめんどりがされて斜めになっている。
    // ctx.strokeRect(50,50,50,50);
    //2つ記載しても両方とも記載されていて場所をずらすとわかる。
    //この描画に関しては、これ以降の描画にも全て記載されてしまうことを覚えておく。　
    //下に図形を書くと同じようなスタイルが反映される。
    //違うスタイルにするのならその度に記載ないといけない。
    // ctx.fillStyle = 'skyblue';
    // ctx.strokeStyle = '#00b';
    // ctx.fillRect(70, 70,  50, 50);
    // ctx.strokeRect(70,70,50,50);
    //後から書いた図が上に記載できる。

  }

  draw();
}