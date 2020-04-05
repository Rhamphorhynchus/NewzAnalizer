import {    MAX_NEWS_PER_QUERRY, ERROR_TEXT_REQUIRED, ERROR_TEXT_WRONG_LENGTH,
            BLOCK_NOT_FOUND_TITLE, BLOCK_NOT_FOUND_TEXT, BLOCK_NOT_FOUND_ERROR_TITLE,
            BLOCK_NOT_FOUND_ERROR_TEXT  } from './../constants/constatns';
import { DataStorage } from '../modules/DataStorage';

export class SearchInput {
    constructor(form, input, api, cardList, blockWait, blockNotFound, blockCard) {
        this._form = form;
        this._input = input;
        this._api = api;
        this._dataStorage = new DataStorage(); 
        this._cardList = cardList;
        this._blockWait = blockWait;
        //this._blockError = blockError;
        this._blockNotFound = blockNotFound;
        this._blockCard = blockCard;
        this._setHandlers();
    }

    _setHandlers() {
        this._form.addEventListener('submit', this._getNews.bind(this));
        this._input.addEventListener('input', this._checkValidity.bind(this));
        this._input.addEventListener('focus', this._checkValidity.bind(this));
        this._form.addEventListener('focus', this._checkValidity.bind(this), true);
        //this._input.addEventListener('blur', (event) => {this._input.setCustomValidity("");});
    }

    _disableSendButton() {
        document.querySelector('.form__button').setAttribute('disabled', '');
    }

    _enableSendButton() {
        document.querySelector('.form__button').removeAttribute('disabled');
    }

    _checkValidity() {
        const input = document.querySelector('.form__input');
        //if (!input.checkValidity()) {
        if (input.validity.valueMissing) {
            input.setCustomValidity(ERROR_TEXT_REQUIRED);
            input.reportValidity();
            this._disableSendButton();
            return false;
        } else if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(ERROR_TEXT_WRONG_LENGTH);
            input.reportValidity();
            this._disableSendButton();
            return false;
        } else {
            input.setCustomValidity("");
            this._enableSendButton();
            return true;
        }
    }

    _showBlockNotFound(title, text) {
        this._blockNotFound.querySelector('.not-found__title').textContent = title;
        this._blockNotFound.querySelector('.not-found__text').textContent = text;
        this._blockNotFound.classList.remove('invisible');
    }

    

    _getNews(event) {
        if (this._checkValidity()) {
            this._blockWait.classList.remove('invisible');
            this._blockNotFound.classList.add('invisible');
            this._blockCard.classList.add('invisible');
            event.preventDefault();
            const q = document.querySelector('.form__input').value;
            const toDate = new Date();
            const fromDate = new Date(toDate);
            fromDate.setDate(fromDate.getDate() - 6);
            const from = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
    
            this._api.everything({q, from, pageSize: MAX_NEWS_PER_QUERRY, language: 'ru'})
            .then(response => {
                console.log(response);
                if ((response.status == "ok") && (response.totalResults > 0)) {
                    this._cardList.setCardsContent(response, q, toDate);
                    this._dataStorage.saveData(response, q, toDate);
                } else {
                    this._showBlockNotFound(BLOCK_NOT_FOUND_TITLE, BLOCK_NOT_FOUND_TEXT);
                }
            }).catch(error => {
                console.log(error);
                this._showBlockNotFound(BLOCK_NOT_FOUND_ERROR_TITLE, BLOCK_NOT_FOUND_ERROR_TEXT);
                //alert(error);
            }).finally(() => {
                this._blockWait.classList.add('invisible');
            });
        }
    }
}