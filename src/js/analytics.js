import "../pages/analytics.css";
//import { formatDate, formatDateAsShortString } from './utils/datetime';
import { Statistics } from './components/Statistics';
import { DataStorage } from './modules/DataStorage';

console.log("analytics.js");

//const totalWeekly = document.querySelector(".statistics__item-total_weekly");

/*
function getDayOfWeek(date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}
*/

/*
function setAnalytics(analytics) {
    totalWeekly.textContent = analytics.totalResults;
    const date = new Date()
    for (let days = 1; days <= 7; days++) {
        const dateIndex = formatDate(date);
        //document.querySelector(`.table__histogram-date-${7 - days}`).textContent = `${date.getDate()}, ${getDayOfWeek(date)}`;
        document.querySelector(`.table__histogram-date-${7 - days}`).textContent = `${formatDateAsShortString(date)}`;
        if (analytics.values[dateIndex] !== undefined) {
            document.querySelector(`.table__histogram-value-date-${7 - days}`).textContent = analytics.values[dateIndex];
            document.querySelector(`.table__histogram-value-date-${7 - days}`).classList.add(`table__histogram-value-${Math.floor((analytics.values[dateIndex] / analytics.max) * 100)}`)
        } else {
            document.querySelector(`.table__histogram-value-date-${7 - days}`).textContent = 0;
            document.querySelector(`.table__histogram-value-date-${7 - days}`).classList.add(`table__histogram-value-0`)
        }
        date.setDate(date.getDate() - 1);
    }
}
*/

const dataStorage = new DataStorage();

if (dataStorage.hasData()) {
    const newzAnalyzerData = dataStorage.loadData();
    const statistics = new Statistics(null, newzAnalyzerData.response.articles, newzAnalyzerData.q,  newzAnalyzerData.response.totalResults, newzAnalyzerData.date);
    statistics.render();
}