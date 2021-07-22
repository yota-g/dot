'use strict';

(() => {
  //描画関連を分ける。
  class PuzzleRenderer {
    constructor(puzzle, canvas) {
      this.puzzle = puzzle;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.TILE_SIZE = 70;
      this.img = document.createElement('img');
      // this.img.src = './img/15puzzle.png';
      this.img.src = './img/animal1.png';
      this.img.addEventListener('load', () => {
        this.render();
      });
      this.canvas.addEventListener('click', (e) => {
        if (this.puzzle.getCompletedStatus()) {
          return;
        }
        const rect = this.canvas.getBoundingClientRect();
        console.log(e.clientX - rect.left, e.clientY - rect.top);
        const col = Math.floor((e.clientX - rect.left) / this.TILE_SIZE);
        const row = Math.floor((e.clientY - rect.top) / this.TILE_SIZE);
        console.log(col, row);
        this.puzzle.swapTiles(col, row);
        this.render();
        if (this.puzzle.isComplete() ) {
          // this.isCompleted = true;
          this.puzzle.setCompletedStatus(true);
          this.renderGameClear();
        }
      });
    }

    renderGameClear() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '28px Arial';
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText('GAME CLEAR', 40, 150);
    }

    render() {
      for (let row = 0; row < this.puzzle.getBoardSize(); row++) {
        for (let col = 0; col < this.puzzle.getBoardSize(); col++) {
          // this.renderTile(this.tiles[row][col], col, row);
          this.renderTile(this.puzzle.getTile(row, col), col, row);
        }
      }
    }

    renderTile(n, col, row) {
      if(n === this.puzzle.getBlankIndex() ){
        this.ctx.fillStyle = '#eee';
        this.ctx.fillRect(col * this.TILE_SIZE, row * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
      }else{
        this.ctx.drawImage(
          this.img,
          (n % this.puzzle.getBoardSize()) * this.TILE_SIZE, Math.floor(n / this.puzzle.getBoardSize()) * this.TILE_SIZE,this.TILE_SIZE,this.TILE_SIZE,
          col * this.TILE_SIZE,row * this.TILE_SIZE,this.TILE_SIZE, this.TILE_SIZE
        );
      }
      }
    //   this.ctx.drawImage(
    //     this.img,
    //     // sx, sy ,70, 70,
    //     (n % 4) * 70,
    //     Math.floor(n / 4) * 70,
    //     70,
    //     70,
    //     //dx, dy, 70, 70
    //     col * 70,
    //     row * 70,
    //     70,
    //     70
    //     //sx syから取り出して、canvasのdx,dyに記載するとする。
    //   );
    // }
  }
  class Puzzle {
    constructor(level) {
      // this.canvas = canvas;
      this.level = level;
      // this.ctx = canvas.getContext('2d');
      this.tiles = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];
      this.UDLR = [
        [0, -1], //up
        [0, 1], //down
        [-1, 0], //left
        [1, 0], //right
      ];
      this.isCompleted = false;
      // this.img = document.createElement('img');
      // this.img.src = './img/15puzzle.png';
      // this.img.addEventListener('load', () => {
      //   this.render();
      // });
      // // this.renderTile(9, 2, 1);
      // //9を2列目の1行目に配列したいということを示す。
      // // this.renderTile(12,  1, 3);
      // // this.render();
      // //clickした画像の座標を取得する。
      // this.canvas.addEventListener('click', (e) => {
      //   if(this.isCompleted === true){
      //     return;
      //   }
      //   const rect = this.canvas.getBoundingClientRect();
      //   //canvasの位置やサイズに関するオブジェクトを返す。rect.leftをするとxのcanvasの左側を取得できるのでそれをxから引くとcanvasの左側を視点にできる。
      //   // console.log(e.clientX, e.clientY);
      //   console.log(e.clientX - rect.left, e.clientY - rect.top);
      //   //始点を0の左上の部分に合わせる。
      //   //何列目にあるかを把握するために70で割って計算する。
      //   const col = Math.floor((e.clientX - rect.left) / 70);
      //   const row = Math.floor((e.clientY - rect.top) / 70);
      //   console.log(col, row);
      //   this.swapTiles(col, row);
      //   this.render();
      //   if (this.isComplete() === true) {
      //     this.isCompleted = true;
      //     this.renderGameClear();
      //   }
      // });
      this.BOARD_SIZE = this.tiles.length; //4
      this. BLANK_INDEX = this.BOARD_SIZE **2 - 1; //15
      //shuffleで元に戻ることを防ぐためにdowhileを使用。
      do {
        this.shuffle(this.level);
      } while (this.isComplete() === true);
      // this.shuffle(this.level);
    }

    getBoardSize() {
      return this.BOARD_SIZE;
    }

    getBlankIndex() { 
        return this.BLANK_INDEX;
    }

    getCompletedStatus() {
      return this.isCompleted;
    }

    setCompletedStatus(value) {
      this.isCompleted = value;
    }

    getTile(row, col) {
      return this.tiles[row][col];
    }
    //shuffleの回数で難易度を変えられるので、引数を渡す。
    shuffle(n) {
      let blankCol = this.BOARD_SIZE -1;
      let blankRow = this.BOARD_SIZE - 1;
      //最初に空白の位置を変数に持たせる。
      //範囲外になると繰り返すようにdowhileを使用する。
      for (let i = 0; i < n; i++) {
        let destCol;
        let destRow;
        do {
          const dir = Math.floor(Math.random() * this.UDLR.length);
          //dirの数字に応じてup,down,left,rightを配列にもたせてより簡単に指定する。
          // const UDLR = [
          //   [0, -1], //up
          //   [0 , 1],//down
          //   [-1, 0],//left
          //   [1, 0] //right
          // ]

          // destCol = blankCol + UDLR[dir][0]
          // destRow = blankRow + UDLR[dir][1]
          //プロパティに変更 下のcaseわけでも使用するため
          destCol = blankCol + this.UDLR[dir][0];
          destRow = blankRow + this.UDLR[dir][1];

          //0から3で数値を作って条件分岐をする。
          // switch (dir) {
          // case 0: //top
          //   destCol = blankCol;
          //   destRow = blankRow - 1;
          //   break;
          // case 1: //bottom
          //   destCol = blankCol;
          //   destRow = blankRow + 1;
          //   break;
          // case 2: //left
          //   destCol = blankCol - 1;
          //   destRow = blankRow;
          //   break;
          // case 3: //right
          //   destCol = blankCol + 1;
          //   destRow = blankRow;
          //   break;
          //   }
        } while (this.isOutside(destCol, destRow));
        // while (destCol < 0 || destCol > 3 || destRow < 0 || destRow > 3);

        [this.tiles[blankRow][blankCol], this.tiles[destRow][destCol]] = [
          this.tiles[destRow][destCol],
          this.tiles[blankRow][blankCol],
        ];

        [blankRow, blankCol] = [destRow, destCol];
      }
      //whileで範囲外の条件を指定する。
      // for (let i = 0; i < n; i++) {
      //   let destCol;
      //   let destRow;
      //   const dir = Math.floor(Math.random() * 4);
      //   //0から3で数値を作って条件分岐をする。
      //   switch (dir) {
      //     case 0: //top
      //       destCol = blankCol ;
      //       destRow = blankRow - 1;
      //       break;
      //     case 1: //bottom
      //       destCol = blankCol ;
      //       destRow = blankRow + 1;
      //       break;
      //     case 2: //left
      //       destCol = blankCol  - 1;
      //       destRow = blankRow;
      //       break;
      //     case 3: //right
      //       destCol = blankCol + 1;
      //       destRow = blankRow;
      //       break;
      //   }
      // }
    }

    swapTiles(col, row) {
      if (this.tiles[row][col] === this.BLANK_INDEX) {
        return;
      }
      for (let i = 0; i < this.UDLR.length; i++) {
        let destCol;
        let destRow;

        destCol = col + this.UDLR[i][0];
        destRow = row + this.UDLR[i][1];
        // switch (i) {
        //   case 0: //top
        //     destCol = col;
        //     destRow = row - 1;
        //     break;
        //   case 1: //bottom
        //     destCol = col;
        //     destRow = row + 1;
        //     break;
        //   case 2: //left
        //     destCol = col - 1;
        //     destRow = row;
        //     break;
        //   case 3: //right
        //     destCol = col + 1;
        //     destRow = row;
        //     break;
        // }

        // if (destCol < 0 || destCol > 3 || destRow < 0 || destRow > 3) {
        if (this.isOutside(destCol, destRow) ) {
          continue;
        }

        if (this.tiles[destRow][destCol] === this.BLANK_INDEX) {
          [this.tiles[row][col], this.tiles[destRow][destCol]] = [
            this.tiles[destRow][destCol],
            this.tiles[row][col],
          ];
          break;
        }
      }
    }

    isOutside(destCol, destRow) {
      return destCol < 0 || destCol > this.BOARD_SIZE -1 || destRow < 0 || destRow > this.BOARD_SIZE -1;
    }

    isComplete() {
      let i = 0;
      for (let row = 0; row < this.BOARD_SIZE; row++) {
        for (let col = 0; col < this.BOARD_SIZE; col++) {
          if (this.tiles[row][col] !== i++) {
            return false;
          }
        }
      }
      return true;
    }

    // renderGameClear() {
    //   this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    //   this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    //   this.ctx.font = '28px Arial';
    //   this.ctx.fillStyle = '#fff';
    //   this.ctx.fillText('GAME CLEAR', 40, 150);
    // }

    // render() {
    //   for (let row = 0; row < 4; row++) {
    //     for (let col = 0; col < 4; col++) {
    //       this.renderTile(this.tiles[row][col], col, row);
    //     }
    //   }
    // }

    // renderTile(n, col, row) {
    //   // this.img.src = './img/15puzzle.png';
    //   // this.img.addEventListener('load', () =>{
    //   this.ctx.drawImage(
    //     this.img,
    //     // sx, sy ,70, 70,
    //     (n % 4) * 70,
    //     Math.floor(n / 4) * 70,
    //     70,
    //     70,
    //     //dx, dy, 70, 70
    //     col * 70,
    //     row * 70,
    //     70,
    //     70
    //     //sx syから取り出して、canvasのdx,dyに記載するとする。
    //   );
    //   // })
    // }
  }

  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }

  // new Puzzle(canvas, 2);
  new PuzzleRenderer(new Puzzle(2), canvas);
})();
