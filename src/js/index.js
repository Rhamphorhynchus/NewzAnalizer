import "../pages/index.css";
import { Card } from "./components/card";
import { NewsAPI } from "./modules/newsapi";
console.log("index.js");

const newsApi = new NewsAPI('53ed4d6d1f5c4094b07ebdaf6f4a8b5b');


const buttonSend = document.querySelector('.user-info__button');
const formSend = document.querySelector('.form');
const inputQ = document.querySelector('.form');
const cardContainer = document.querySelector('.results-grid');
const blockCard = document.querySelector('.results');
const cardTemplate = document.querySelector('.result-template');
const blockWait = document.querySelector('.in-progress');
const blockNotFound = document.querySelector('.not-found');
const buttonNext = document.querySelector('.results-more');

const cardsPerAttempt = 3;
const cardsSession = {totalCount: 0, currentPosition: 0}
let currentCardIndex;
let cardsResponse;
let totalCardsCount;


buttonNext.addEventListener('click', showNextCards);
formSend.addEventListener('submit', sendData);

function AddCard(article) {

}

function setAnalytics(articles)
{
    const analytics = {values:{}};

    for (let i = 0; i < articles.length; i++) {
        let data = articles[i].publishedAt.slice(0, 10);
        analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
    }

    analytics.max = Object.values(analytics.values).reduce((value, max) => ((value > max) ? value : max ), 0);
    
    return analytics;
}

function imageNotFound(event) {
    event.target.setAttribute("src", require('../images/news.jpg'));
    event.target.removeEventListener('error', imageNotFound);
}

function showNextCards() {
    const firstCardIndex = currentCardIndex;
    const lastCardIndex = firstCardIndex + cardsPerAttempt < totalCardsCount ? firstCardIndex + cardsPerAttempt : totalCardsCount;
    for (let i = firstCardIndex; i < lastCardIndex; i++) {
            const card  = new Card(null, cardTemplate);
            cardContainer.appendChild(card.create(cardsResponse.articles[i]));
    }
    if (lastCardIndex == totalCardsCount) {
        buttonNext.classList.add('invisible');
    } else {
        buttonNext.classList.remove('invisible');
    }
    currentCardIndex = lastCardIndex;
}

function SetCardsContent(response) {
    if ((response.status == "ok") && (response.totalResults > 0)) {
        //resetCards();
        cardContainer.innerHTML = "";
        currentCardIndex = 0;
        cardsResponse = response;
        totalCardsCount = cardsResponse.totalResults;
        showNextCards();
        //response.articles.forEach(article => {
        //    const card  = new Card(null, cardTemplate);
        //    cardContainer.appendChild(card.create(article))
        //});
        const analytics = setAnalytics(response.articles);
        analytics.totalResults = response.totalResults
        //analyticsS =  JSON.stringify(analytics);
        sessionStorage.analytics = JSON.stringify(analytics);
        blockCard.classList.remove('invisible');
    } else {
        //blockNotFound.classList.add('invisible');
        blockNotFound.classList.remove('invisible');
    }
}

/*
function SetCardsContent(response) {
    if ((response.status == "ok") && (response.totalResults > 0)) {
        //const card = cardTemplate.content.cloneNode(true); //document.importNode(cardTemplate.content, true);
        cardContainer.innerHTML = "";
        response.articles.forEach(article => {
            const card = cardTemplate.content.cloneNode(true);
            card.querySelector(".result").setAttribute("href", article.url);
            if (article.urlToImage !== null) {
                card.querySelector(".result__image").addEventListener('error', imageNotFound);
                card.querySelector(".result__image").setAttribute("src", article.urlToImage);
            }
            card.querySelector(".result__image").setAttribute("alt", article.title);
            card.querySelector(".result__date").setAttribute("datetime", article.publishedAt);
            card.querySelector(".result__title").textContent = article.title;
            card.querySelector(".result__date").textContent = article.publishedAt;
            card.querySelector(".result__text").textContent = article.description;
            card.querySelector(".result__author").textContent = article.source.name;
            //appendChild(document.importNode(card.content, true));
            //cardContainer.appendChild(document.importNode(card.content, true));
            cardContainer.appendChild(card)
        });
        const analytics = setAnalytics(response.articles);
        analytics.totalResults = response.totalResults
        //analyticsS =  JSON.stringify(analytics);
        sessionStorage.analytics = JSON.stringify(analytics);
        blockCard.classList.remove('invisible');
    } else {
        //blockNotFound.classList.add('invisible');
        blockNotFound.classList.remove('invisible');
    }
}
*/


function sendData(event)
{
    blockWait.classList.remove('invisible');
    blockNotFound.classList.add('invisible');
    blockCard.classList.add('invisible');
    //blockWait.classList.remove('invisible');
    event.preventDefault();

    const q = document.querySelector('.form__input').value;
    const date = new Date()
    date.setDate(date.getDate() - 6);
    const from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
    newsApi.everything({
        q,
        from,
        pageSize: 100
      }).then(response => {
        console.log(response);
        SetCardsContent(response);
      }).catch(error => {
          console.log(error);
      }).finally(() => {
        blockWait.classList.add('invisible');
      });
}