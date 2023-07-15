import axios from 'axios';

const API_KEY = 'd7c73711e4dc4d7d230eb467603768a2';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {};
axios.defaults.params.api_key = API_KEY;
axios.defaults.params.language = 'en-US';

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`trending/movie/day?`, {
      params: {
        page: `${page}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedMovies = async search => {
  try {
    const response = await axios.get(
      `search/movie?page=1&include_adult=false&query=${search}`
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}?`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits?`);
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews?page=1`);
  return response.data.results;
};
