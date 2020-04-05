import '../../node_modules/swiper/css/swiper.min.css';
import "../pages/about.css";
import { GithubAPI } from "./modules/githubapi";
import { CommitCard } from "./components/CommitCard";
import { CommitCardList } from "./components/CommitCardList";
import { GITHUB_USER, GITHUB_REPOSITORY, GITHUB_BRANCH } from "./constants/constatns";
import Swiper from '../../node_modules/swiper/js/swiper';

console.log("about.js");

const cardContainer = document.querySelector('.swiper-wrapper');
const cardTemplate = document.querySelector('.commit__template');

const mySwiper = new Swiper('.swiper-container',
  {
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: false,
    a11y: true,
    navigation: {
      nextEl: '.commits__swiper-arrow-button_next',
      prevEl: '.commits__swiper-arrow-button_prev',
    },
    pagination: {
      el: '.pagination',
      clickable: true,
      bulletClass: 'pagination__bullet',
      bulletActiveClass: 'pagination__bullet_active',
    },
  });


const card  = new CommitCard(null, cardTemplate);
const cardList = new CommitCardList(cardContainer, card);
const api = new GithubAPI();

api.commits(GITHUB_USER, GITHUB_REPOSITORY, GITHUB_BRANCH)
.then(response => {
    console.log(response);
    cardList.renderCards(response);
    mySwiper.update();
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    console.log('finnaly');
  });