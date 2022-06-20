const API_KEY = "97efc7695cce5e5ef3065f29d4ac478f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximun: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvLatestResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (reponse) => reponse.json()
  );
}

export function getMoviesUp() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (reponse) => reponse.json()
  );
}

export function getMoviesLa() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then((reponse) =>
    reponse.json()
  );
}

export function getMoviesTop() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (reponse) => reponse.json()
  );
}

export function getTvAiring() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (reponse) => reponse.json()
  );
}

export function getTvLatest() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((reponse) =>
    reponse.json()
  );
}

export function getTvPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((reponse) =>
    reponse.json()
  );
}

export function getTvTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((reponse) =>
    reponse.json()
  );
}

// /https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
//https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
//https://api.themoviedb.org/3/tv/airing_today?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/tv/latest?api_key=97efc7695cce5e5ef3065f29d4ac478f&language=en-US
// https://api.themoviedb.org/3/tv/popular?api_key=97efc7695cce5e5ef3065f29d4ac478f&language=en-US&page=1
//https://api.themoviedb.org/3/tv/top_rated?api_key=97efc7695cce5e5ef3065f29d4ac478f&language=en-US&page=1
