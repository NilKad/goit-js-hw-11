export default async function fetchPixa({ str: searchString, page }) {
  const axios = require('axios').default;

  const url = 'https://pixabay.com/api/';
  // https://pixabay.com/api/?key=30289004-55fd945ee926b50d65d8b1651&q=yellow+flowers&image_type=photo
  // console.log(`fetchService page=${page}`);
  const option = {
    params: {
      key: '30289004-55fd945ee926b50d65d8b1651',
      q: searchString,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '40',
      page: page,
    },
  };

  const ret = await axios
    .get(url, option)
    .then(data => {
      // console.log(data);
      return data;
    })
    // .then(data => data.data.hits)
    .catch(error => {
      // console.log('fetchSerice ERROR', error);
      throw error;
    });

  const fetchCountresName = name => {};

  return ret;
}
