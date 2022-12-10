const MY_KEY = '29880081-a66e36470932d0d43dbaf5012';

const fetchImages = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  });
};
const api = {
  fetchImages,
};
export default api;
