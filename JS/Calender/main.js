'use strict';

console.clear();
//コンソールをクリアできる。クロムの

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); //7月 月は0から始まるので5月は4

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      //30
      //29 30
      //28 29 30 のように取得するのでunshiftで入れていく。
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }

  // getCalendarHead();

  function getCalenderBody() {
    const dates = []; //dateは日付、dayは曜日
    const lastDate = new Date(year, month + 1, 0).getDate();
    //終日は翌月1日の1日前ということで翌月の0日目を指定することで今月の末日を取得できる。
    for (let i = 1; i <= lastDate; i++) {
      // dates.push(i);
      //オブジェクトの配列にする
      //todayを示したりするので普通の配列ではなくオブジェクトにする。
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
        //todayを取るかどうかの真偽値と前月と翌月のdisabledの真偽値を格納するようにする。
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
      //配列では日付は-1日なのでそれを利用して配列をしてする。
      //だが、翌月の同じ日付も太文字になるので月や年も調べてif分で作るようにする
    }

    // console.log(dates);
    return dates;
  }
  // getCalenderBody();

  function getCalenderTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    // console.log(lastDay);
    return dates;
  }
  // getCalenderTail();'

  function clearClalendar() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    //monthをStringで示して、padStartで桁数を指定して、足りない部分を第二引数で賄うようにできる。
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    //monthが0から始まるので+1されることを忘れないようにする。
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    //配列の中に3つ配列が入っている。
    //スプレッド構文を使うと配列の全ての要素が入る変わる。
    //週ごとの配列に分けるので7個ずつに分ける。
    const weeks = [];
    const weeksCount = dates.length / 7;
    //何週あるかわdateの個数を7で割れば大丈夫。
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    // console.log(dates);
    // console.log(weeks);
    weeks.forEach((week) => {
      const tr = document.createElement('tr');
      week.forEach((date) => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearClalendar();
    renderTitle();
    renderWeeks();
  }

  createCalendar();

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11; //12月が11で表示されいるから。
    }
    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0; //1月が0で表示されいるから。
    }
    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => { 
    year = today.getFullYear();
    month = today.getMonth();
    createCalendar();
  });
}

//new Data (year, month , 0)とすれば先月の最終日を表しgetDateで取得できる。
//getDayで曜日(数字)を取得できる。
//0123456の順で曜日が日から土で取得できる。
//カレンダーに残る前月の日程の曜日は、n = new Date(year, month , 1).getDay();とすることで個数を表すことができる。木曜なら4でそれまでの前月の表示される数は4個になるから。
