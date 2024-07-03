'use strict';

const calendarHeader = document.getElementById('js_calendar-header'); // カレンダーのヘッダー
const calendar = document.getElementById('js_calendar'); // カレンダー
const prevBtn = document.getElementById('js_prev-btn'); // 前のボタン
const nextBtn = document.getElementById('js_next-btn'); // 次のボタン

const week = ['日', '月', '火', '水', '木', '金', '土']; // 曜日の配列
const today = new Date(); // 現在の日付オブジェクト
const thisYear = today.getFullYear(); // 現在の年
const thisMonth = today.getMonth(); // 現在の月
const thisDay = today.getDate(); // 現在の日

const firstDate = new Date(thisYear, thisMonth, 1);

// ページのロード時のイベント
window.addEventListener('load', () => {
	// ヘッダーに年・月の表示
	const yearMonthTxt = `${firstDate.getFullYear()}年${
		firstDate.getMonth() + 1
	}月`;
	calendarHeader.innerHTML = yearMonthTxt;

	// カレンダーの表示
	const calendarHtml = createCalendar(
		firstDate.getFullYear(),
		firstDate.getMonth()
	);
	calendar.innerHTML = calendarHtml;
});

/**
 * カレンダーの作成
 */
const createCalendar = (year, month) => {
    const today=new Date();

    const firstDayOfWeek=firstDate.getDay(); //今月の初日の曜日のインデックス番号
    const lastDay=new Date(year,month + 1, 0).getDate(); //今月の最終日の日付
    const lastDayOfLastMonth=new Date(year, month, 0).getDate(); //先月の最終日の日付

    console.log(firstDayOfWeek );
    const rowNumber = Math.ceil((firstDayOfWeek + lastDay) / week.length);
    let dayCount = 1;
    let calendarHtml = "";



	// 曜日表示のHTML生成
	calendarHtml += `<div class="calendar_table-head d-flex align-items-center">`;
	for (let i = 0; i < week.length; i++) {
		calendarHtml += `<div class="calendar_table-data">${week[i]}</div>`;
	}
	calendarHtml += '</div>';

    for(let j=0;j<rowNumber;j++){
        calendarHtml+= `<div class="calendar_table-row d-flex">`;
        for(let i=0;i<week.length;i++){

            //if~elseif は今月以外の処理
            // 初週かつiが曜日の長さ未満
            if (j === 0 && i < firstDayOfWeek) {
            // 表を埋めるために前月末週の日付情報を出力（先月の末日 - 今月初日の曜日 + i + 1）
                let num = lastDayOfLastMonth - firstDayOfWeek + i + 1;
                calendarHtml += `<div class="calendar_table-data is-disabled p-1"><span>${num}</span></div>`;
            }
            // dayCountが今月の末日を超えていたら
            else if (dayCount > lastDay) {
            // 表を埋めるために翌月初週の日付情報を出力（dayCount - 今月の末日）
            const num = dayCount - lastDay;
            calendarHtml += `<div class="calendar_table-data is-disabled p-1"><span>${num}</span></div>`;
            dayCount++;
            }
            // 年、月、日が今日だったら
            else if (year === thisYear && month === thisMonth && dayCount === thisDay) {
            calendarHtml += `<div class="calendar_table-data p-1 js_calendar-date"><span class="calendar_carrent-date bg-primary text-white">${dayCount}</span></div>`;
            dayCount++;
            }
            else{
                calendarHtml+= `<div class="calendar_table-data p-1 js_calendar-date"><span>${dayCount}</span></div>`;
                dayCount++;
            }
            

        
        }
        calendarHtml+="</div>";
    }

	return calendarHtml;
};