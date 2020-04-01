import '../../node_modules/swiper/css/swiper.min.css';
import "../pages/about.css";
import { GithubAPI } from "./modules/githubapi";
import { CommitCard } from "./commitcard";
import Swiper from '../../node_modules/swiper/js/swiper';

function SetCardsContent(response) {
  //if ((response.status == "ok") && (response.totalResults > 0)) {
      cardContainer.innerHTML = "";
      response.forEach(commit => {
        const card  = new CommitCard(null, cardTemplate);
        cardContainer.appendChild(card.create(commit))
      });
      mySwiper.update();
  //}
}

const swiperArrowPrev = document.querySelector('.commits__swiper-arrow_prev');
const swiperArrowNext = document.querySelector('.commits__swiper-arrow_next');

const cardContainer = document.querySelector('.swiper-wrapper');
const cardTemplate = document.querySelector('.commit__template');

const mySwiper = new Swiper('.swiper-container',
  {
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: false,
    a11y: true,
    //initialSlide: 1,
    //nextButton: '.commits__swiper-arrow_next',
    //prevButton: '.commits__swiper-arrow_prev',
    navigation: {
      nextEl: '.commits__swiper-arrow-button_next',
      prevEl: '.commits__swiper-arrow-button_prev',
      //nextEl: swiperArrowNext,
      //prevEl: swiperArrowPrev,
    },
    pagination: {
      el: '.pagination',
      clickable: true,
      bulletClass: 'pagination__bullet',
      bulletActiveClass: 'pagination__bullet_active',
      //renderBullet: function (index, className) {
      //  return '<span class="' + className + ' swiper-pagination__bullet"></span>';
      //},
    },
  });



/*
const mySwiper = new Swiper ('.swiper-container', {
     slidesPerView: 'auto',
     spaceBetween: 16,
	  centeredSlides: true,
    a11y: true,
    keyboardControl: true,
    grabCursor: true,
    nextButton: swiperArrowNext,
    prevButton: swiperArrowPrev,
  });
*/

console.log("about.js");

const api = new GithubAPI();


api.commits('Rhamphorhynchus', 'NewzAnalizer', 'level-1')
.then(response => {
    console.log(response);
    SetCardsContent(response);
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    console.log('finnaly');
  });