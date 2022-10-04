export default function galleryMarkup(data) {
  const htmlMarkup = dataMarkup => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = dataMarkup;
    return `
  <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="card-info">
        <p class="card-info__item">
          <b>Likes</b><br>${likes}
        </p>
        <p class="card-info__item">
          <b>Views</b><br>${views}
        </p>
        <p class="card-info__item">
          <b>Comments</b><br>${comments}
        </p>
        <p class="card-info__item">
          <b>Downloads</b><br>${downloads}
        </p>
      </div>
    </div>
    `;
  };
  const dataRendering = data.map(htmlMarkup);
  return dataRendering.join('');
}
