import "../pages/index.css";
import { NEWS_API_TOKEN } from "./constants/constatns"
import { NewsCard } from "./components/NewsCard";
import { NewsAPI } from "./modules/newsapi";
import { DataStorage } from "./modules/DataStorage";
import { SearchInput } from "./components/SearchInput";
import { NewsCardList } from "./components/NewsCardList";

console.log("index.js");

//const inputQ = document.querySelector('.form');
const formSend = document.querySelector('.form');
const input = formSend.querySelector('.form__input');
const blockCard = document.querySelector('.results');
const blockWait = document.querySelector('.in-progress');
const blockNotFound = document.querySelector('.not-found');
//const blockError = document.querySelector('.not-found_theme_error');
const cardContainer = document.querySelector('.results-grid');
const buttonNext = document.querySelector('.results-more');
const cardTemplate = document.querySelector('.result-template');

const newsApi = new NewsAPI(NEWS_API_TOKEN);
const card = new NewsCard(null, cardTemplate);
const cardList = new NewsCardList(cardContainer, buttonNext, blockCard, card);
const searchInput = new SearchInput(formSend, input, newsApi, cardList, blockWait, blockNotFound, blockCard);

const dataStorage = new DataStorage();

if (dataStorage.hasData()) {
    const newzAnalyzerData = dataStorage.loadData(); JSON.parse(sessionStorage.newzAnalyzerDataString);
    form.querySelector('.form__input').value = newzAnalyzerData.q;
    cardList.setCardsContent(newzAnalyzerData.response, newzAnalyzerData.q, newzAnalyzerData.date)
}


//const buttonSend = document.querySelector('.user-info__button');
//const formSend = document.querySelector('.form');






/*
const cardsPerAttempt = 3;
const cardsSession = {totalCount: 0, currentPosition: 0}
let currentCardIndex;
let cardsResponse;
let totalCardsCount;
*/


//buttonNext.addEventListener('click', showNextCards);
//formSend.addEventListener('submit', sendData);

//function AddCard(article) {
//
//}

/*
function setAnalytics(articles, q)
{
    const analytics = {values:{}};
    analytics.refersInTitle = 0;

    for (let i = 0; i < articles.length; i++) {
        let data = articles[i].publishedAt.slice(0, 10);
        analytics.values[data] = analytics.values[data] ? analytics.values[data] + 1 : 1;
    }

    analytics.max = Object.values(analytics.values).reduce((value, max) => ((value > max) ? value : max ), 0);
    analytics.refersInTitle = articles.reduce((previousValue, article) => {
        if (article.title.indexOf(q) >= 0) previousValue += 1;
        return previousValue;
    }, 0);
    
    return analytics;
}
*/

/*
function imageNotFound(event) {
    event.target.setAttribute("src", require('../images/news.jpg'));
    event.target.removeEventListener('error', imageNotFound);
}
*/

/*
function showNextCards() {
    const firstCardIndex = currentCardIndex;
    const lastCardIndex = firstCardIndex + cardsPerAttempt < totalCardsCount ? firstCardIndex + cardsPerAttempt : totalCardsCount;
    for (let i = firstCardIndex; i < lastCardIndex; i++) {
            const card  = new NewsCard(null, cardTemplate);
            cardContainer.appendChild(card.create(cardsResponse.articles[i]));
    }
    if (lastCardIndex == totalCardsCount) {
        buttonNext.classList.add('invisible');
    } else {
        buttonNext.classList.remove('invisible');
    }
    currentCardIndex = lastCardIndex;
}
*/

/*
function SetCardsContent(response, q, date) {
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
        const analytics = setAnalytics(response.articles, q);
        analytics.totalResults = response.totalResults
        //analyticsS =  JSON.stringify(analytics);
        //sessionStorage.analytics = JSON.stringify(analytics);
        sessionStorage.newzAnalyzerDataString = JSON.stringify({response, q, date});
        blockCard.classList.remove('invisible');
    } else {
        //blockNotFound.classList.add('invisible');
        blockNotFound.classList.remove('invisible');
    }
}
*/

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

/*
function sendData(event)
{
    blockWait.classList.remove('invisible');
    blockNotFound.classList.add('invisible');
    blockCard.classList.add('invisible');
    //blockWait.classList.remove('invisible');
    event.preventDefault();

    const q = document.querySelector('.form__input').value;
    const toDate = new Date();
    const fromDate = new Date(toDate);
    fromDate.setDate(fromDate.getDate() - DAYS_INTERVAL + 1);
    const from = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
  
    newsApi.everything({
        q,
        from,
        pageSize: 100
      }).then(response => {
        console.log(response);
        SetCardsContent(response, q, toDate);
      }).catch(error => {
          console.log(error);
      }).finally(() => {
        blockWait.classList.add('invisible');
      });
}
*/