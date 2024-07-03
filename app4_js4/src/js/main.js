"use strict"

const calendarHeader = document.getElementById("js_calendar-header"); // カレンダーのヘッダー
const calendar = document.getElementById("js_calendar"); // カレンダー
const prevBtn = document.getElementById("js_prev-btn"); // 前のボタン
const nextBtn = document.getElementById("js_next-btn"); // 次のボタン

const week = ["日", "月", "火", "水", "木", "金", "土"]; // 曜日の配列
const today = new Date(); // 現在の日付オブジェクト
const thisYear = today.getFullYear(); // 現在の年
const thisMonth = today.getMonth(); // 現在の月
const thisDay = today.getDate(); // 現在の日

const addEventTitle=document.getElementById("js_add-event_title");
const addEventDate=document.getElementById("js_add-event_date");
const addEventTime=document.getElementsByClassName("js_add-event_time");
const addEventBtn=document.getElementById("js_add-event_btn");

const firstDate = new Date(thisYear, thisMonth, 1);

// ページのロード時のイベント
window.addEventListener("load", () => {
  showCalendar();
  addTimeOption();
});

prevBtn.addEventListener("click", (e) => {
  firstDate.setMonth(firstDate.getMonth() - 1);
  showCalendar();
});

nextBtn.addEventListener("click", (e) => {
  firstDate.setMonth(firstDate.getMonth() + 1);
  showCalendar();
});



/**
 * カレンダーの作成
 */
const createCalendar = (year, month) => {
  const firstDayOfWeek = firstDate.getDay(); // 今月初日の曜日
  const lastDate = new Date(year, month + 1, 0); // 今月の末日日付オブジェクト（0と指定することで末日になる）
  const lastDay = lastDate.getDate(); // 今月の末日
  const lastDateOfLastMonth = new Date(year, month, 0); // 先月末日日付オブジェクト（0と指定することで末日になる）
  const lastDayOfLastMonth = lastDateOfLastMonth.getDate(); // 先月の末日

  // カレンダーの行数
  // 数値の結果の切り上げ((今月初日の曜日 + 今月末日) / 曜日の配列の長さ) 5 or 6が代入される
  const rowNumber = Math.ceil((firstDayOfWeek + lastDay) / week.length);
  let dayCount = 1;
  let calendarHtml = "";

  // 曜日表示のHTML生成
  calendarHtml += `<div class="calendar_table-head d-flex align-items-center">`;
  for (let i = 0; i < week.length; i++) {
    calendarHtml += `<div class="calendar_table-data">${week[i]}</div>`;
  }
  calendarHtml += "</div>";

  // カレンダーの日表示のHTML生成（行のループ）
  for (let w = 0; w < rowNumber; w++) {
    calendarHtml +=  `<div class="calendar_table-row d-flex">`;

    // カレンダーの日表示のHTML生成（列のループ）
    for (let d = 0; d < week.length; d++) {
      // 初週かつdが曜日の長さ未満
      if (w === 0 && d < firstDayOfWeek) {
        // 表を埋めるために前月末週の日付情報を出力（先月の末日 - 今月初日の曜日 + d + 1）
        const num = lastDayOfLastMonth - firstDayOfWeek + d + 1;
        calendarHtml += `<div class="calendar_table-data is-disabled p-1"><span class="calendar_date">${num}</span></div>`;

      // dayCountが今月の末日を超えている
      } else if (dayCount > lastDay) {
        // 表を埋めるために翌月初週の日付情報を出力（dayCount - 今月の末日）
        const num = dayCount - lastDay;
        calendarHtml += `<div class="calendar_table-data is-disabled p-1"><span class="calendar_date">${num}</span></div>`;
        dayCount++;

      // 今日の日付
      } else if (year === thisYear && month === thisMonth && dayCount === thisDay) {
        calendarHtml += `<div class="calendar_table-data p-1 js_calendar-date"><span class="calendar_date calendar_date-current bg-primary text-white">${dayCount}</span></div>`;
        dayCount++;
      
      // 上記条件以外
      } else {
        calendarHtml += `<div class="calendar_table-data p-1 js_calendar-date"><span class="calendar_date">${dayCount}</span></div>`;
        dayCount++;
      }
    }

    calendarHtml += "</div>";
  }

  return calendarHtml;
}


/**
 * カレンダーの表示
 */
const showCalendar = () => {
  // ヘッダーに年・月の表示
  const yearMonthTxt = `${firstDate.getFullYear()}年${firstDate.getMonth() + 1}月`;
  calendarHeader.innerHTML = yearMonthTxt;

  // カレンダーの表示
  const calendarHtml = createCalendar(firstDate.getFullYear(), firstDate.getMonth())
  calendar.innerHTML = calendarHtml;
}

//  const addTimeOption=()=>{
//    let optionItem='';
//    let list=document.getElementById("js_add-event_time");
//    let li=document.createElement('option');

//   for(let j=0;j<=23;j++){
//     for(let i=0;i<=59;i++){
//       if(i%15==0){
//       let str_j=j;
//       let str_i=i;
//       let hour_str=String(str_j.padStart(2,'0'));
//       let min_str=String(str_i.padStart(2,'0'));

//       let li=document.createElement('option');
//       optionItem=`${hour_str}:${min_str}`;
//       li.value=optionItem;
//       li.innerText=optionItem;
//       list.appendChild(li);
//       }
    
//     }
//   }

// };


const addTimeOption = () => {
	// optionのHTMLを生成する変数を定義
  let optionElm = "";

  // 00:00~23:45
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      if (m % 15 == 0) {
        const timeStr = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

        // 最初の要素はselectedをつける
        if (timeStr == "00:00") {
          optionElm += `<option value="${timeStr}" selected>${timeStr}</option>`;
        } else {
          optionElm += `<option value="${timeStr}">${timeStr}</option>`;
        }
      }
    }
  }

  // addEventTime[0],[1]にoptionを追加する
  addEventTime[0].innerHTML = optionElm;
  addEventTime[1].innerHTML = optionElm;
}

// addEventBtn.addEventListener("click", () => {
// 	// タイトル
// 	console.log(addEventTitle.value);
// 	// 日付
// 	console.log(addEventDate.value);
// 	// 開始時間
// 	console.log(addEventTime[0].value);
// 	// 終了時間
// 	console.log(addEventTime[1].value);

//   let ID=1;
//   const event=[
//     {
//     id: ID,
//     title: addEventTitle.value,
//     endDate: ,
//     }
//   ];
// });


addEventBtn.addEventListener("click", () => {
  let newId = 1;

  if (events.length > 0) {
    newId = Math.max(...events.map((item) => item.id)) + 1;
  }

  const eventFirstDate = new Date(`${addEventDate.value} ${addEventTime[0].value}`);
  const eventEndDate = new Date(`${addEventDate.value} ${addEventTime[1].value}`);

  const event = {
    id: newId,
    title: addEventTitle.value,
    firstDate: eventFirstDate,
    endDate: eventEndDate
  };

  events = [...events, event];
});

