"use strict"

// src/js/main.js
const calendarHeader = document.getElementById("js_calendar-header"); // カレンダーのヘッダー
const calendar = document.getElementById("js_calendar"); // カレンダー
const prevBtn = document.getElementById("js_prev-btn"); // 前ボタン
const nextBtn = document.getElementById("js_next-btn"); // 次のボタン

const today=new Date();
const thisYear=today.getFullYear();
const thisMonth=today.getMonth();
const thisDate=today.getDate();
const week=["日","月","火","水","木","金","土"];
const thisDay=week[today.getDay()];

// thisDayの定義の下
const firstDate = new Date(thisYear, thisMonth, 1); // 現在の年月の1日オブジェクト

window.addEventListener('load', () => {
  // ヘッダーに年・月の表示
    const yearMonthTxt = `${firstDate.getFullYear()}年${
    firstDate.getMonth() + 1
    }月`;
    calendarHeader.innerHTML = yearMonthTxt;

    const calendarHtml = createCalendar(
    firstDate.getFullYear(),
    firstDate.getMonth()
    );


    calendar.innerHTML = calendarHtml;
});

// const createCalendar = (year, month) => {
//     let calendarHtml = '';

//     calendarHtml = '<div class="calendar_table-head d-flex align-items-center">';
//     for(let i=0;i<Week.length;i++){
//         calendarHtml+=`<div class="calendar_table-data>${i}</div>`;
//     }
//     calendarHtml+='</div>';
//     return calendarHtml;
// };

const createCalendar = (year, month) => {
  let calendarHtml = '';

  calendarHtml += '<div class="calendar_table-head d-flex aling-items-center">';

  for (let index = 0; index < week.length; index++) {
    calendarHtml += `<div class="calendar_table-data">${week[index]}</div>`;
  }

  calendarHtml += '</div>';

  return calendarHtml;
};

