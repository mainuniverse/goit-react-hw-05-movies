const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=6fac8a19fe14ac5172a40e7885f95238';

// 6fac8a19fe14ac5172a40e7885f95238
export const fetchTrendingMovies = () => {
  return fetch(`${BASE_URL}trending/all/day?${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Something wrong..."));
  });
};

export function fetchMoviesOnKeyWord(searchQuery) {
  return fetch(
    `${BASE_URL}search/movie?${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Something wrong..."));
  });
}

export function fetchTakeMoviesById(moviesId) {
  return fetch(`${BASE_URL}movie/${moviesId}?${API_KEY}&language=en-US`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error("Something wrong..."));
    },
  );
}

export function fetchTakeCast(moviesId) {
  return fetch(
    `${BASE_URL}movie/${moviesId}/credits?${API_KEY}&language=en-US&page=1`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Something wrong..."));
  });
}

export function fetchTakeReviews(moviesId) {
  return fetch(
    `${BASE_URL}movie/${moviesId}/reviews?${API_KEY}&language=en-US&page=1`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Something wrong..."));
  });
}