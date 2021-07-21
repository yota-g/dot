'use strict';

(() => {
class Puzzle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tiles = [
      [0, 1, 2, 3], 
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15]
    ];
    this.img = document.createElement('img');
    this.img.src = './img/15puzzle.png';
    this.img.addEventListener('load', () =>{
      this.render();
    });
    // this.renderTile(9, 2, 1);
    //9を2列目の1行目に配列したいということを示す。
    // this.renderTile(12,  1, 3);
    // this.render();
    //clickした画像の座標を取得する。
    this.canvas.addEventListener ('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      //canvasの位置やサイズに関するオブジェクトを返す。rect.leftをするとxのcanvasの左側を取得できるのでそれをxから引くとcanvasの左側を視点にできる。
      // console.log(e.clientX, e.clientY);
      console.log(e.clientX - rect.left, e.clientY - rect.top);
      //始点を0の左上の部分に合わせる。
    })
  }

  render() {
    for( let row = 0; row < 4; row++){
      for(let col = 0; col < 4; col ++){
        this.renderTile(this.tiles[row][col], col, row);
      }
    }
  }

  renderTile(n, col, row) {
    // this.img.src = './img/15puzzle.png';
    // this.img.addEventListener('load', () =>{
      this.ctx.drawImage(
        this.img,
        // sx, sy ,70, 70,
        (n % 4) * 70, Math.floor(n / 4) * 70, 70, 70,
        //dx, dy, 70, 70
        col * 70, row * 70, 70, 70
        //sx syから取り出して、canvasのdx,dyに記載するとする。
      );
    // })
  }
}

  const canvas = document.querySelector('canvas');
  if(typeof canvas.getContext === 'undefined'){
    return;
  }

  new Puzzle(canvas);

})();