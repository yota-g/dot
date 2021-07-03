'use strinc'

{
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content')

  menuItems.forEach(item => {
    item.addEventListener('click', e => {
      //eventオブジェクトを引数に渡して、aタグの違うページに遷移する機能を止めるオブジェクト設定を行う。
      e.preventDefault();
      menuItems.forEach(item => {
        item.classList.remove('active');
      })
      item.classList.add('active');

      contents.forEach( content => {
        content.classList.remove('active');
      });
      document.getElementById(item.dataset.id).classList.add('active');
      //クリックされた項目に対するコンテント要素が取得できる。

    })
  })
}