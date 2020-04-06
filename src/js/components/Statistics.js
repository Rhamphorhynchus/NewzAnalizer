import { formatDate, formatDateAsShortString, getMonthName } from './../utils/datetime';
import { DAYS_INTERVAL, MILLISECONDS_PER_DAY } from "./../constants/constatns";

export class Statistics {
    constructor(template, articles, q, totalResults, toDate) {
        this._template = template;
        this._articles = articles;
        this._q = q;
        this._Q = this._q.toUpperCase();
        this._totalResults = totalResults;
        this._toDate = typeof toDate === 'string' ?  new Date(toDate) : toDate;
        this._fromDate = new Date(toDate - MILLISECONDS_PER_DAY * (DAYS_INTERVAL - 1));
        //this._fromDate.setDate(this._fromDate.getDate() - DAYS_INTERVAL + 1);
        this._analytics = this._collectStatistics();
    }

    /*
    _collectDates() {
        const analytics = {values:{}};
        for (let i = 0; i < this._articles.length; i++) {
            let data = this._articles[i].publishedAt.slice(0, 10);
            analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
        }
        analytics.max = Object.values(analytics.values).reduce((value, max) => ((value > max) ? value : max ), 4);
        return analytics;
    }
    */

    _collectStatistics() {
        const analytics = {values:{}};
        let refersInTitle = 0;
        //for (let i = 0; i < this._articles.length; i++) {
            this._articles.forEach((article) => {
            let data = article.publishedAt.slice(0, 10);
            if (article.title.toUpperCase().indexOf(this._Q) >= 0) {
                refersInTitle += 1;
                analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
            } else if (article.description.toUpperCase().indexOf(this._Q) >= 0) {
                analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
            }});
        //}
        analytics.max = Object.values(analytics.values).reduce((value, max) => ((value > max) ? value : max ), 4);
        analytics.refersInTitle = refersInTitle;
        return analytics;
    }
    
    /*
    _collectRefers() {
        return this._articles.reduce((previousValue, article) => {
            if (article.title.toUpperCase().indexOf(this._Q) >= 0) previousValue += 1;
            return previousValue;
        }, 0);
    }

    _collectStatistics() {
        this._analytics = this._collectDates();
        this._refersInTitle = this._collectRefers();
    }
    */

    _renderMonth() {
        const months = this._toDate.getMonth() === this._fromDate.getMonth() ? getMonthName(this._toDate) :
                    `${getMonthName(this._toDate)}, ${getMonthName(this._fromDate)}`;
        document.querySelector('.table__header-title-months').textContent = months;
    }

    _renderScale() {
        for (let index = 1; index <= 4; index++) {
            document.querySelectorAll(`.table__header-scale-value-${index}`).forEach((element) => element.textContent = Math.floor(index * this._analytics.max / 4));
        }
    }

    _renderHistogram() {
        const date = this._toDate;
        for (let days = 1; days <= DAYS_INTERVAL; days++) {
            const dateIndex = formatDate(date);
            document.querySelector(`.table__histogram-date-${DAYS_INTERVAL - days}`).textContent = `${formatDateAsShortString(date)}`;
            if (this._analytics.values[dateIndex] !== undefined) {
                document.querySelector(`.table__histogram-value-date-${DAYS_INTERVAL - days}`).textContent = this._analytics.values[dateIndex];
                //document.querySelector(`.table__histogram-value-date-${DAYS_INTERVAL - days}`).classList.add(`table__histogram-value-${Math.floor((this._analytics.values[dateIndex] / this._analytics.max) * 100)}`)
                document.querySelector(`.table__histogram-value-date-${DAYS_INTERVAL - days}`).setAttribute("style", `width: ${Math.floor((this._analytics.values[dateIndex] / this._analytics.max) * 100)}%;`);
            } else {
                document.querySelector(`.table__histogram-value-date-${DAYS_INTERVAL - days}`).textContent = 0;
                document.querySelector(`.table__histogram-value-date-${DAYS_INTERVAL - days}`).classList.add(`table__histogram-value-0`)
            }
            date.setDate(date.getDate() - 1);
        }
    }

    _renderHeader() {
        //document.querySelector('.statistics__item-total_weekly').textContent = this._totalResults;
        document.querySelector('.statistics__item-total_weekly').textContent = this._articles.length;
        document.querySelector('.statistics__item-total_in-headers').textContent = this._analytics.refersInTitle;
        document.querySelector('.statistics__title_quote').textContent = this._q;
    }

    render() {
        this._renderMonth();
        this._renderHeader();
        this._renderScale();
        this._renderHistogram();
    }
}