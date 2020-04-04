import { MAX_NEWS_PER_QUERRY } from './../constants/constatns';
import { DataStorage } from '../modules/DataStorage';

export class SearchInput {
    constructor(form, api, cardList, blockWait, blockNotFound, blockCard) {
        this._form = form;
        this._api = api;
        this._dataStorage = new DataStorage(); 
        this._cardList = cardList;
        this._blockWait = blockWait;
        this._blockNotFound = blockNotFound;
        this._blockCard = blockCard;
        this._form.addEventListener('submit', this._getNews.bind(this));
    }

    _getNews(event) {
        this._blockWait.classList.remove('invisible');
        this._blockNotFound.classList.add('invisible');
        this._blockCard.classList.add('invisible');
        event.preventDefault();
        const q = document.querySelector('.form__input').value;
        const toDate = new Date();
        const fromDate = new Date(toDate);
        fromDate.setDate(fromDate.getDate() - 6);
        const from = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
  
        this._api.everything({q, from, pageSize: MAX_NEWS_PER_QUERRY})
        .then(response => {
            console.log(response);
            if ((response.status == "ok") && (response.totalResults > 0)) {
                this._cardList.setCardsContent(response, q, toDate);
                this._dataStorage.saveData(response, q, toDate);
            } else {
                this._blockNotFound.classList.remove('invisible');
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this._blockWait.classList.add('invisible');
        });
    }
}