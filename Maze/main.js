'use strict';

(() => {
  class Maze {
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.data = this.getData();
    }

    getData() {
      const data = [];
      for ( let row = 0 ; row< 9 ; row ++){
        data[row] = [];
        for ( let col = 0; col < 7; col ++) {
          data[row][col] = 1;
        }
      }
      return data;
    }

    render() {
      //行数分のループを使用する。
      for( let row = 0; row < this.data.length ; row++){
        //中で列数分のループを回す。
        for (let col = 0; col< this.data[row].length ; col++){
          //配列の中身に応じて描画する。
          if(this.data[row][col] === 1 ){
            this.ctx.fillRect( col * 10 , row * 10 , 10 , 10 ); 
          }
        }
      }
    }
  }
  const canvas = document.querySelector('canvas');
  if( typeof canvas.getContext === 
    'undefined'){
      return;
    }

    const maze = new Maze(canvas);
    maze.render();
})();