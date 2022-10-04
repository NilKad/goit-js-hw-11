import fetchPixa from './js/fetchService';
import Notiflix from 'notiflix';
import galleryMarkup from './js/galleryMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import checkPosition from './js/checkPosition';
import throttleFun from './js/throttle';

let lightbox = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  // captionDelay: 250,
  // captionClass: 'gallery__captionClass',
});

const notify = Notiflix.Notify;
const axios = require('axios').default;
let gallery = document.querySelector('.gallery');

let page = 1;
let strSearch = 'water';

const formRefs = document.querySelector('.search-form');
const btnNext = document.querySelector('.button.paginations');

const scroolPage = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSubmitForm: document.querySelector('[type="submit"]'),
};

export default function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY;
  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.
    nextLoad();
  }
}

const renderPage = dataForRender => {
  let r = galleryMarkup(dataForRender);
  if (page > 1) {
    gallery.insertAdjacentHTML('beforeend', r);
    scroolPage();
  } else {
    gallery.innerHTML = r;
  }
  lightbox.refresh();
  return;
};

const fetchSearch = str => {
  if (str === strSearch) {
    page += 1;
  } else {
    strSearch = str;
    page = 1;
  }

  fetchPixa({ str: strSearch, page: page })
    .then(dataPixa => {
      // console.log('fetchPixa data: ', dataPixa);
      if (dataPixa.data.hits.length === 0) {
        notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      if (page > 1) {
        notify.success(
          `Hooray! We found ${dataPixa.data.hits.length * page} images.`
        );
      }

      renderPage(dataPixa.data.hits);
    })
    .catch(error => {
      console.log('FetchPixa ERROR', error);
    });
};

const onBtnSearch = event => {
  event.preventDefault();
  window.scrollTo(0, 0);
  fetchSearch(event.currentTarget.searchQuery.value);
};

const nextLoad = () => fetchSearch(strSearch);

// btnNext.addEventListener('click', nextLoad);
formRefs.addEventListener('submit', onBtnSearch);

window.addEventListener('scroll', throttleFun(checkPosition, 250));
window.addEventListener('resize', throttleFun(checkPosition, 250));
