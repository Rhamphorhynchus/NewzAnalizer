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
      card.querySelector(".commit__date").setAttribute("datetime", commit.commit.committer.date);
      card.querySelector(".commit__date").textContent = formatDateAsLongString(new Date(commit.commit.committer.date));

      if (commit.author !== null && commit.author.avatar_url !== null) {
          this._imageNotFoundHandler = this._imageNotFound.bind(this);
          card.querySelector(".commit__avatar").addEventListener('error', this._imageNotFoundHandler);
          card.querySelector(".commit__avatar").setAttribute("src", commit.author.avatar_url);
          card.querySelector(".commit__avatar").setAttribute("style", "display: none;");
          this._imageLoadedHandler = this._imageLoaded.bind(this);
          card.querySelector(".commit__avatar").addEventListener("load", this._imageLoadedHandler);
      }
      card.querySelector(".commit__avatar").setAttribute("alt", commit.commit.committer.name);
      card.querySelector(".commit__author-name").textContent = commit.commit.committer.name;
      //card.querySelector(".commit__author-email").setAttribute("href", `mailto:${commit.commit.author.email}`);
      card.querySelector(".commit__author-email").textContent = commit.commit.committer.email;
      card.querySelector(".commit__description").textContent = commit.commit.message;
      return card;
    }
  
      _imageNotFound(event) {
          event.target.setAttribute("src", require('../../images/github_gray.svg'));
          event.target.removeEventListener('error', this._imageNotFoundHandler);
      }

      _imageLoaded(event) {
          event.target.removeAttribute("style", "display: none;");
      }
  }