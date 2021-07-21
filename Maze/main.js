'use strict';

(() => {
  class MazeRenderer {
    //描画に関して入れるクラスを作成。
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.WALL_SIZE = 10;
    }

    render(data) {
      canvas.height = data.length * this.WALL_SIZE;
      canvas.width = data[0].length * this.WALL_SIZE;
      for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
          if (data[row][col] === 1) {
            this.ctx.fillRect(
              col * this.WALL_SIZE,
              row * this.WALL_SIZE,
              this.WALL_SIZE,
              this.WALL_SIZE
            );
          }
        }
      }
    }
  }

  class Maze {
    // constructor(row, col, canvas) {
    constructor(row, col, renderer) {
      if (row < 5 || col < 5 || row % 2 === 0 || col % 2 === 0) {
        alert('Size not valid!');
      }
      this.renderer = renderer;
      // this.ctx = canvas.getContext('2d');
      this.col = col;
      this.row = row;
      // this.WALL_SIZE = 10
      //マジックナンバー　作った人にしかわからない数値を呼ぶ。それを慣習的に大文字の定数で管理するのでそれをwall_sizeで今回は管理する。
      // canvas.height = this.row * this.WALL_SIZE;
      // canvas.width = this.col * this.WALL_SIZE;

      this.data = this.getData();
    }

    getData() {
      const data = [];
      // for ( let row = 0 ; row< 9 ; row ++){
      for (let row = 0; row < this.row; row++) {
        data[row] = [];
        for (let col = 0; col < this.col; col++) {
          data[row][col] = 1;
        }
      }

      for (let row = 1; row < this.row - 1; row++) {
        for (let col = 1; col < this.col - 1; col++) {
          data[row][col] = 0;
          //ひとまわり小さい配列を作る。
        }
      }
      //行も列も１つ飛ばしでさらにひとまわり小さい配列を作って始点を作成する。
      for (let row = 2; row < this.row - 2; row += 2) {
        for (let col = 2; col < this.col - 2; col += 2) {
          data[row][col] = 1;
        }
      }

      // 1行目の棒をランダムに倒す。2行目以降の棒は上以外でランダムに倒す。
      //上で起点にしたものを使って棒を倒すようにする。
      for (let row = 2; row < this.row - 2; row += 2) {
        for (let col = 2; col < this.col - 2; col += 2) {
          let destRow; //倒す先を保持
          let destCol;
          //1行目について考える。
          //倒す方向が重なったときはやり直すという方法をとるので、その場合は、dowhileを使用する。
          do {
            //rowが2のときは、0か4で、それ以外の時は、1から4で棒を倒す条件分岐をする。そうすることで袋小路ができなくなる。
            const dir =
              row === 2
                ? Math.floor(Math.random() * 4)
                : Math.floor(Math.random() * 3) + 1;

            switch (dir) {
              case 0: //up
                destRow = row - 1;
                destCol = col;
                break;
              case 1: //down
                destRow = row + 1;
                destCol = col;
                break;
              case 2: //left
                destRow = row;
                destCol = col - 1;
                break;
              case 3: //right
                destRow = row;
                destCol = col + 1;
                break;
            }
          } while (data[destRow][destCol] === 1);
          //data[destRow][destCol]が壁である間はdoを繰り返す処理をする。
          //2行目以降は上以外に倒れるようにしないといけない。袋小路みたいになってしまうから。

          // const dir = Math.floor(Math.random()*4);
          // switch(dir) {
          //   case 0 ://up
          //   destRow = row - 1;
          //   destCol = col ;
          //     break;
          //   case 1 ://down
          //   destRow = row + 1;
          //   destCol = col ;
          //     break;
          //   case 2 ://left
          //   destRow = row;
          //   destCol = col -1 ;
          //     break;
          //   case 3 ://right
          //   destRow = row ;
          //   destCol = col + 1;
          //     break;
          // }
          data[destRow][destCol] = 1;
        }
      }

      return data;
    }

    render() {
      this.renderer.render(this.data);
      // //行数分のループを使用する。
      // for( let row = 0; row < this.data.length ; row++){
      //   //中で列数分のループを回す。
      //   for (let col = 0; col< this.data[row].length ; col++){
      //     //配列の中身に応じて描画する。
      //     if(this.data[row][col] === 1 ){
      //       this.ctx.fillRect(
      //         col * this.WALL_SIZE , row * this.WALL_SIZE ,
      //         this.WALL_SIZE ,
      //         this.WALL_SIZE );
      //     }
      //   }
      // }
    }
  }
  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }

  const maze = new Maze(21, 15, new MazeRenderer(canvas));
  // const maze = new Maze(21, 15, canvas);
  //5行9列の迷路を作る。簡単に行数を変更できるように引数を持たせるようにする。
  //行数が増えて、canvasの大きさを超えると下の部分が空白になってしまう。
  // canvasの高さを調整する
  maze.render();
})();
