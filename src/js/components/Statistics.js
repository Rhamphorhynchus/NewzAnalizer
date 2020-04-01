import { formatDate, formatDateAsShortString } from './../utils/datetime';

export class Statistics {
    constructor(template, articles, q, totalResults, toDate) {
        this._template = template;
        this._articles = articles;
        this._q = q;
        this._totalResults = totalResults;
        this._toDate = typeof toDate === 'string' ?  new Date(toDate) : toDate;
        this._collectStatistics();
    }

    _collectDates() {
        const analytics = {values:{}};
        for (let i = 0; i < this._articles.length; i++) {
            let data = this._articles[i].publishedAt.slice(0, 10);
            analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
        }
        analytics.max = Object.values(analytics.values).reduce((value, max) => ((value > max) ? value : max ), 4);
        return analytics;
    }
    
    _collectRefers() {
        return this._articles.reduce((previousValue, article) => {
            if (article.title.indexOf(this._q) >= 0) previousValue += 1;
            return previousValue;
        }, 0);
    }

    _collectStatistics() {
        this._analytics = this._collectDates();
        this._refersInTitle = this._collectRefers();
    }

    _renderScale() {
        for (let index = 1; index <= 4; index++) {
            document.querySelectorAll(`.table__header-scale-value-${index}`).forEach((element) => element.textContent = Math.floor(index * this._analytics.max / 4));
        }
    }

    _renderHistogram() {
        const date = this._toDate;
        for (let days = 1; days <= 7; days++) {
            const dateIndex = formatDate(date);
            document.querySelector(`.table__histogram-date-${7 - days}`).textContent = `${formatDateAsShortString(date)}`;
            if (this._analytics.values[dateIndex] !== undefined) {
                document.querySelector(`.table__histogram-value-date-${7 - days}`).textContent = this._analytics.values[dateIndex];
                document.querySelector(`.table__histogram-value-date-${7 - days}`).classList.add(`table__histogram-value-${Math.floor((this._analytics.values[dateIndex] / this._analytics.max) * 100)}`)
            } else {
                document.querySelector(`.table__histogram-value-date-${7 - days}`).textContent = 0;
                document.querySelector(`.table__histogram-value-date-${7 - days}`).classList.add(`table__histogram-value-0`)
            }
            date.setDate(date.getDate() - 1);
        }
    }

    _renderHeader() {
        document.querySelector('.statistics__item-total_weekly').textContent = this._totalResults;
        document.querySelector('.statistics__item-total_in-headers').textContent = this._refersInTitle;
        document.querySelector('.statistics__title_quote').textContent = this._q;
    }

    render() {
        this._renderHeader();
        this._renderScale();
        this._renderHistogram();
    }
}