import "../pages/analytics.css";
console.log("analytics.js");

const totalWeekly = document.querySelector(".statistics__item-total_weekly");

function getDayOfWeek(date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}

function formatDate(date) {
 
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yyyy = date.getFullYear();
      
    return yyyy + '-' + mm + '-' + dd;
}

function setAnalytics(analytics) {
    totalWeekly.textContent = analytics.totalResults;
    const date = new Date()
    for (let days = 1; days <= 7; days++) {
        const dateIndex = formatDate(date);
        document.querySelector(`.table__histogram-date-${7 - days}`).textContent = `${date.getDate()}, ${getDayOfWeek(date)}`;
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

if (sessionStorage.analytics.length > 0) {
    setAnalytics(JSON.parse(sessionStorage.analytics));
}