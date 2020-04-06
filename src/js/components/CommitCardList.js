export class CommitCardList {
    constructor(container, card) {
        this._cardContainer = container;
        this._card = card;
    }

    renderCards(response) {
        this._cardContainer.innerHTML = "";
        response.forEach(commit => {
            this._cardContainer.appendChild(this._card.create(commit))
        });
    }
}