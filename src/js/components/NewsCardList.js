import { CARDS_PER_ATTEMPT } from './../constants/constatns';

export class NewsCardList {
    constructor(container, buttonNext, cards, card) {
        this._cardContainer = container;
        this._cards = cards;
        this._card = card;
        this._cardsPerAttempt = CARDS_PER_ATTEMPT;
        this._currentCardIndex = 0;
        this._totalCardsCount = 0;
        this._buttonNext = buttonNext;
        buttonNext.addEventListener('click', this._renderNextCards.bind(this));

    }
  
    setCardsContent(response) {
        this._cardContainer.innerHTML = "";
        if ((response.status == "ok") && (response.totalResults > 0)) {
            this._cardContainer.innerHTML = "";
            this._currentCardIndex = 0;
            this._cardsResponse = response;
            this._totalCardsCount = this._cardsResponse.totalResults;
            this._renderNextCards();
            //this._blockCard.classList.remove('invisible');
            this._cards.classList.remove('invisible');
        } else {
            blockNotFound.classList.remove('invisible');
        }
    }

    _renderNextCards() {
        const firstCardIndex = this._currentCardIndex;
        const lastCardIndex = firstCardIndex + this._cardsPerAttempt < this._totalCardsCount ? firstCardIndex + this._cardsPerAttempt : this._totalCardsCount;
        for (let i = firstCardIndex; i < lastCardIndex; i++) {
                //const card  = new NewsCard(null, cardTemplate);
                this._cardContainer.appendChild(this._card.create(this._cardsResponse.articles[i]));
        }
        if (lastCardIndex == this._totalCardsCount) {
            this._buttonNext.classList.add('invisible');
        } else {
            this._buttonNext.classList.remove('invisible');
        }
        this._currentCardIndex = lastCardIndex;
    }
}