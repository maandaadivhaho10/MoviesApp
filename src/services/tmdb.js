// Centralized TMDB API client to improve code quality and reuse
// Uses env var VITE_TMDB_API_KEY; falls back to noop but returns safe shapes

const API_KEY = import.meta?.env?.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

async function safeFetchJson(url, init) {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchDiscoverMovies({ genreId, year, sortBy, page = 1 }) {
  if (!API_KEY) return { results: [], page: 1, total_pages: 0 };
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}` +
    (year ? `&year=${year}` : "") +
    (sortBy ? `&sort_by=${encodeURIComponent(sortBy)}` : "") +
    `&page=${page}`;
  const data = await safeFetchJson(url);
  return data ?? { results: [], page: 1, total_pages: 0 };
}

export async function fetchGenres() {
  if (!API_KEY) return { genres: [] };
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const data = await safeFetchJson(url);
  return data ?? { genres: [] };
}