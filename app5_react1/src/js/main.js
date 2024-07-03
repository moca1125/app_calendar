"use strict"

const calendarHeader = document.getElementById("js_calendar-header"); // カレンダーのヘッダー
const calendar = document.getElementById("js_calendar"); // カレンダー
const prevBtn = document.getElementById("js_prev-btn"); // 前のボタン
const nextBtn = document.getElementById("js_next-btn"); // 次のボタン

const addEventTitle = document.getElementById("js_add-event_title"); // イベント追加のタイトル入力
const addEventDate = document.getElementById("js_add-event_date"); // イベント追加の日付入力
const addEventTime = document.getElementsByClassName("js_add-event_time"); // イベント追加の時間入力
const addEventBtn = document.getElementById("js_add-event_btn"); // イベント追加の追加ボタン

const week = ["日", "月", "火", "水", "木", "金", "土"]; // 曜日の配列
const today = new Date(); // 現在の日付オブジェクト
const thisYear = today.getFullYear(); // 現在の年
const thisMonth = today.getMonth(); // 現在の月
const thisDay = today.getDate(); // 現在の日

let editEventId;
const editEventTitle = document.getElementById("js_edit-event_title"); // イベント編集のタイトル入力
const editEventDate = document.getElementById("js_edit-event_date"); // イベント編集の日付入力
const editEventTime = document.getElementsByClassName("js_edit-event_time"); // イベント編集の時間入力
const editEventBtn = document.getElementById("js_edit-event_btn"); // イベント編集の編集ボタン
const deleteEventBtn = document.getElementById("js_delete-event_btn"); // イベント編集の削除ボタン

const firstDate = new Date(thisYear, thisMonth, 1);

let events = [
	{
		id: 1,
		title: '授業',
		firstDate: new Date('2024-05-05 12:00'),
		endDate: new Date('2024-05-05 14:00'),
	},
];

// ページのロード時のイベント
window.addEventListener("load", () => {
  showCalendar();
  showEvents();
  addTimeOption();
});

prevBtn.addEventListener("click", () => {
  firstDate.setMonth(firstDate.getMonth() - 1);
  showCalendar();
  showEvents();
});

nextBtn.addEventListener("click", () => {
  firstDate.setMonth(firstDate.getMonth() + 1);
  showCalendar();
  showEvents();
});

addEventBtn.addEventListener("click", () => {
  let newId = 1;

  if (events.length > 0) {
    newId = Math.max(...events.map(item => item.id)) + 1;
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

  showCalendar();
  showEvents();
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


/**
 * イベントをカレンダーに表示
 */
const showEvents = () => {
  // 現在の月と年のイベントを抽出
  const thisEvents = events.filter(event => {
    const eventYear = new Date(event.firstDate).getFullYear();
    const eventMonth = new Date(event.firstDate).getMonth();

    return firstDate.getFullYear() === eventYear && firstDate.getMonth() === eventMonth;
  });

  const calendarDates = calendar.querySelectorAll(".js_calendar-date");

  // 抽出したイベントをカレンダーに表示
  thisEvents.forEach(event => {
    const calendarDate = Array.from(calendarDates).find(dateElm => Number(dateElm.firstChild.innerText) === new Date(event.firstDate).getDate());
  
    const badgeElm = document.createElement("span");
    badgeElm.classList.add("badge", "calendar_event");
    badgeElm.setAttribute("id", event.id);

    const firstDateHour = String(new Date(event.firstDate).getHours()).padStart(2, '0');
    const firstDateMinute = String(new Date(event.firstDate).getMinutes()).padStart(2, '0');

    badgeElm.innerText = `${firstDateHour}:${firstDateMinute} ${event.title}`;

    calendarDate.appendChild(badgeElm);

    		// モーダルを開くためにdata-bs-toggle, targetに値を付与する
    badgeElm.setAttribute("data-bs-toggle", "modal");
    badgeElm.setAttribute("data-bs-target", "#edit-event-modal");

    //クリックしたらイベントが追加される
    badgeElm.addEventListener("click",()=>{
      editEventId=event.id;
      editEventTitle.value=event.title;
      // editEventDate.value=;
      // editEventTime[0]=;//開始
      // editEventTime[1]=;//修了

  editEventDate.value = `${event.firstDate.getFullYear()}-${String(event.firstDate.getMonth() + 1).padStart(2, '0')}-${String(event.firstDate.getDate()).padStart(2, '0')}`; // 日付
  editEventTime[0].value = `${String(event.firstDate.getHours()).padStart(2, '0')}:${String(event.firstDate.getMinutes()).padStart(2, '0')}`; // 開始時間
  editEventTime[1].value = `${String(event.endDate.getHours()).padStart(2, '0')}:${String(event.endDate.getMinutes()).padStart(2, '0')}`; // 終了時間
});
    });
 
}


/**
 * イベント追加モーダルの開始/終了時間に<option>を追加
 */
const addTimeOption = () => {
  let optionElm = "";
  // 00:00~23:45
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      if (m % 15 == 0) {
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

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

    // addEventTime[0],[1]にoptionを追加する
  editEventTime[0].innerHTML = optionElm;
  editEventTime[1].innerHTML = optionElm;
}

editEventBtn.addEventListener("click", () => {
  const eventTitle=editEventTitle.value;
  const eventFirstDate = new Date(`${editEventDate.value} ${editEventTime[0].value}`);
  const eventEndDate = new Date(`${editEventDate.value} ${editEventTime[1].value}`);

  //全eventsを見ている
  events=events.map(item=>{
    if(item.id==editEventId){
      item.title=eventTitle;//ID
      item.firstDate=eventFirstDate;
      item.endDate=eventEndDate;
    }
    return item;
  });

  //表示を忘れないように
  showCalendar();
  showEvents();
});


//イベントの削除
deleteEventBtn.addEventListener("click",()=>{
  events=events.filter(item=>{
    if(item.id!=editEventId){
      return item;
    }
  });

   //表示を忘れないように
  showCalendar();
  showEvents();
});