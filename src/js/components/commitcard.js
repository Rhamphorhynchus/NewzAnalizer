import { formatDateAsLongString } from '../utils/datetime';

export class CommitCard {
    constructor(api, template) {
      this.api = api;
      this.cardTemplate = template;
    }
  
    //create(title, url, id, likes, isLikedByMe, isMine) {}
    create(commit) {
      const card = this.cardTemplate.content.cloneNode(true);
      card.querySelector(".commit__link").setAttribute("href", commit.html_url);
      card.querySelector(".commit__date").setAttribute("datetime", commit.commit.author.date);
      card.querySelector(".commit__date").textContent = formatDateAsLongString(new Date(commit.commit.author.date));

      if (commit.author !== null && commit.author.avatar_url !== null) {
          //this._imageNotFoundHandler = this._imageNotFound.bind(this);
          //card.querySelector(".commit__avatar").addEventListener('error', this._imageNotFoundHandler);
          card.querySelector(".commit__avatar").setAttribute("src", commit.author.avatar_url);
      }
      card.querySelector(".commit__avatar").setAttribute("alt", commit.commit.author.name);
      card.querySelector(".commit__author-name").textContent = commit.commit.author.name;
      //card.querySelector(".commit__author-email").setAttribute("href", `mailto:${commit.commit.author.email}`);
      card.querySelector(".commit__author-email").textContent = commit.commit.author.email;
      card.querySelector(".commit__description").textContent = commit.commit.message;
      return card;
    }
  
      _imageNotFound(event) {
          event.target.setAttribute("src", require('../../images/news.jpg'));
          event.target.removeEventListener('error', this._imageNotFoundHandler);
      }
  }