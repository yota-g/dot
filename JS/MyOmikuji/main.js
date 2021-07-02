'use strict';

{
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    // btn.textContent = 'hit!';
    // const results = ['大吉', '大吉','大吉','中吉', '凶','凶','末吉'];
    // const n = Math.floor(Math.random()*results.length);
    // btn.textContent= results[n];
    // btn.textContent= results[Math.floor(Math.random()*results.length)];
    //これで配列の中の要素をランダムに指定できる。
    // btn.textContent = n;
    // switch(n){
    //   case 0 :
    //     btn.textContent = "大吉";
    //     break;
    //     case 1 :
    //       btn.textContent = "中吉";
    //       break;
    //     case 2 :
    //       btn.textContent = "凶";
    //       break;
    // }
    const n = Math.random();
    if (n < 0.05) {//5%で大吉を出したい時
      btn.textContent = '大吉';
    }else if (n < 0.2) {
      btn.textContent = '中吉';//15%
    } else {
      //80%
      btn.textContent = '凶';
    }
  });
}

//Math.random は０以上１未満のものをランダムに表す。＊３すると3未満になる。そして、整数が欲しい場合は、Math.floorを使用して整数のみに限定すると小数点を除ける。
//0からnはn+1倍すれば大丈夫。またminからmaxまでとする場合は、min+Math.floor(Math.rendom()**(max+1-min))とすればいい。　

//確率の操作補方法は、配列の中身の量を変えることで確率を変える。
//