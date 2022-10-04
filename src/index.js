import fetchPixa from './js/fetchService';
import Notiflix from 'notiflix';
import galleryMarkup from './js/galleryMarkup';

const notify = Notiflix.Notify;
const axios = require('axios').default;
let gallery = document.querySelector('.gallery');

let page = 1;
let strSearch = 'water';

const btnNext = document.querySelector('.button.paginations');

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSubmitForm: document.querySelector('[type="submit"]'),
};

const renderPage = dataForRender => {
  let r = galleryMarkup(dataForRender);
  // console.log(`typeof gallery.innerHTML = ${typeof gallery.innerHTML}`);
  // console.log(`typeof r = ${typeof r}`);
  if (page > 1) {
    gallery.insertAdjacentHTML('beforeend', r);
    return;
  }
  gallery.innerHTML = r;
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
      console.log('fetchPixa data: ', dataPixa);
      if (dataPixa.data.hits.length === 0) {
        notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
        // throw { error: 'Not Found', searchString: option.params.q };
      }
      renderPage(dataPixa.data.hits);
    })
    .catch(error => {
      console.log('FetchPixa ERROR', error);
    });
};

fetchSearch('bob');

const nextLoad = () => fetchSearch(strSearch);

btnNext.addEventListener('click', nextLoad);
