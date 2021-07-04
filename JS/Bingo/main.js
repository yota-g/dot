'use strict';
//splice(9,1)9個目の要素から１つ要素を取り除ける。
{
  function createColumn(col) {
    //汎用化
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
    // console.log(source);
    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(
        Math.floor(Math.random() * source.length), 1)[0];
    };
    // console.log(column);
    return column;
  }

  // columns[0] = createColumn(0);
  // columns[1] = createColumn(1);
  // columns[2] = createColumn(2);
  // columns[3] = createColumn(3);
  // columns[4] = createColumn(4);
  function createColumns () {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'FREE';
    return columns
  }

  // console.table(columns);

  // function createBingo(columns) {
  //   const bingo = [];
  //   for (let row = 0; row < 5; row++) {
  //     bingo[row] = [];
  //     for (let col = 0; col < 5; col++) {
  //       bingo[row][col] = columns[col][row];
        //ここをrowとcolを反転するだけで良さそうなのでこの関数を削除して、renderBingoにそのままcreateColumnsを入れる
  //     }
  //   }
  //   console.table(bingo);
  //   return bingo;
  // }

  //反転した配列を表示するようにする。
  // const bingo = [];
  // for (let row = 0; row < 5; row++) {
  //   bingo[row] = [];
  //   for (let col = 0; col < 5; col++) {
  //     bingo[row][col] = columns[col][row];
  //     //配列を反転することができる。
  //   }
  // }
  // console.table(bingo);

  const tr = document.createElement('tr');
  // for ( let col = 0; col < 5; col++){
  //   const td = document.createElement('td');
  //   td.textContent= bingo[0][col];
  //   tr.appendChild(td);
  // }

// function renderBingo (bingo) {
//   for (let row = 0; row < 5; row++) {
//     const tr = document.createElement('tr');
//     for (let col = 0; col < 5; col++) {
//       const td = document.createElement('td');
//       td.textContent = bingo[row][col];
//       tr.appendChild(td);
//     }
//     document.querySelector('tbody').appendChild(tr);
//   }
// }

function renderBingo (columns) {
  for (let row = 0; row < 5; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 5; col++) {
      const td = document.createElement('td');
      td.textContent = columns[col][row];
      tr.appendChild(td);
    }
    document.querySelector('tbody').appendChild(tr);
  }
}
const columns = createColumns();
// const bingo = createBingo(columns);
// renderBingo(bingo);
renderBingo(columns);

  // for (let row = 0; row < 5; row++) {
  //   const tr = document.createElement('tr');
  //   for (let col = 0; col < 5; col++) {
  //     const td = document.createElement('td');
  //     td.textContent = bingo[row][col];
  //     tr.appendChild(td);
  //   }
  //   document.querySelector('tbody').appendChild(tr);
  // }

  //配列の中に配列があることが綺麗に表示することができる。

  // const source = [ 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14,15];
  // const source = [];
  // for ( let i = 0 ; i < 15 ; i ++){
  //1 から15の範囲になっていた。
  //   source[i] = i + 1;
  // }
  //Math.floor(Math.random()*(14+1))
  //Math.floor(Math.random()*(source.length))
  // const b = [];
  // b[0] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  // b[1] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  // b[2] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  // b[3] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  // b[4] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  //spliceは複数要素を取ることがあるので配列要素で取得される。なので、要素の1つ目をとることを指定するとbの配列の中に配列が格納されることがなくなる。
  // for ( let i = 0 ; i < 5; i ++){
  //   b[i] = source.splice(Math.floor(Math.random() * source.lenght), 1)[0];
  // };
  //   console.log(b);
}
//多くなると機能ごとに関数をまとめるといい。