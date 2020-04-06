import { formatDateAsLongString } from '../utils/datetime';

export class NewsCard {
  constructor(template) {
    this.cardTemplate = template;
  }

  //create(title, url, id, likes, isLikedByMe, isMine) {}
  create(article) {
    const card = this.cardTemplate.content.cloneNode(true);
    card.querySelector(".result").setAttribute("href", article.url);
    if (article.urlToImage !== null) {
        this._imageNotFoundHandler = this._imageNotFound.bind(this);
        card.querySelector(".result__image").addEventListener('error', this._imageNotFoundHandler);
        card.querySelector(".result__image").setAttribute("src", article.urlToImage);
    }
    card.querySelector(".result__image").setAttribute("alt", article.title);
    card.querySelector(".result__date").setAttribute("datetime", article.publishedAt);
    card.querySelector(".result__title").textContent = article.title;
    card.querySelector(".result__date").textContent = formatDateAsLongString(new Date(article.publishedAt));
    card.querySelector(".result__text").textContent = article.description;
    card.querySelector(".result__author").textContent = article.source.name;
    return card;
  }

    _imageNotFound(event) {
        event.target.setAttribute("src", require('../../images/news.jpg'));
        event.target.removeEventListener('error', this._imageNotFoundHandler);
    }
}