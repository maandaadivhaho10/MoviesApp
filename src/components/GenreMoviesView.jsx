import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Displays movies for a selected genre + filters
export default function GenreMoviesView({
  selectedGenre,
  currentYear,
  sortBy,
  loading,
  movies,
  onBack,
  onYearChange,
  onSortChange,
  onSearch,
  onRemoveGenre,
  genres = [],
  onGenreChange,
}) {
  const [localGenres, setLocalGenres] = useState([]);
  const FALLBACK_GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];
  const effectiveGenres = (genres && genres.length) ? genres : localGenres;

  const sortOptions = [
    { value: "popularity.asc", label: "POPULARITY_ASC" },
    { value: "popularity.desc", label: "POPULARITY_DESC" },
    { value: "release_date.asc", label: "RELEASE_DATE_ASC" },
    { value: "release_date.desc", label: "RELEASE_DATE_DESC" },
    { value: "primary_release_date.asc", label: "PRIMARY_RELEASE_DATE_ASC" },
    { value: "primary_release_date.desc", label: "PRIMARY_RELEASE_DATE_DESC" },
    { value: "original_title.asc", label: "ORIGINAL_TITLE_ASC" },
    { value: "original_title.desc", label: "ORIGINAL_TITLE_DESC" },
    { value: "vote_count.desc", label: "VOTE_COUNT" },
  ];

  useEffect(() => {
    if (genres && genres.length) return; // Parent provides genres
    const controller = new AbortController();
    const API_KEY = import.meta?.env?.VITE_TMDB_API_KEY || "";
    const fetchGenres = async () => {
      try {
        if (!API_KEY) {
          setLocalGenres(FALLBACK_GENRES);
          return;
        }
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          setLocalGenres(FALLBACK_GENRES);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data.genres) ? data.genres : FALLBACK_GENRES;
        setLocalGenres(list.length ? list : FALLBACK_GENRES);
      } catch (_) {
        setLocalGenres(FALLBACK_GENRES);
      }
    };
    fetchGenres();
    return () => controller.abort();
  }, [genres]);

  // Auto-trigger search when selected genre changes (guard loops)
  const lastGenreRef = useRef(null);
  useEffect(() => {
    if (!onSearch) return;
    const idRaw = selectedGenre?.id ?? selectedGenre ?? "";
    const id = typeof idRaw === "string" ? Number(idRaw) : idRaw;
    if (!id) return; // skip empty/invalid
    if (lastGenreRef.current === id) return; // prevent repeat calls
    lastGenreRef.current = id;
    onSearch();
  }, [selectedGenre, onSearch]);

  // Safely derive selected genre name and movies list
  const selectedGenreId = selectedGenre?.id ?? selectedGenre ?? "";
  const selectedGenreIdNum = typeof selectedGenreId === "string" ? Number(selectedGenreId) : selectedGenreId;
  const selectedGenreName = (typeof selectedGenre === "object" && selectedGenre !== null)
    ? (selectedGenre.name ?? "Genre")
    : (effectiveGenres.find((g) => g.id === selectedGenreIdNum)?.name ?? "Genre");

  const safeMovies = Array.isArray(movies) ? movies : [];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Back to Genres
          </button>
          <h1 className="text-2xl font-bold">{selectedGenreName} Movies</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-black/90 py-2 flex flex-wrap gap-2 items-center justify-center mb-4">
        {/* Genre Dropdown */}
        <div className="relative w-48">
          <select
            value={selectedGenreId ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              const id = val ? Number(val) : "";
              if (!onGenreChange) return;
              const g = effectiveGenres.find((gg) => gg.id === id);
              onGenreChange(id ? { id, name: g?.name ?? "Genre" } : "");
            }}
            className="w-full bg-gray-800 h-10 px-3 rounded-full appearance-none pr-10 text-sm"
          >
            <option value="">Genres</option>
            {effectiveGenres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex flex-col justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 6l-4 4h8l-4-4z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4 text-white -mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 14l4-4H6l4 4z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        {/* Year Dropdown */}
        <div className="relative w-48">
          <select
            value={currentYear || ""}
            onChange={(e) =>
              onYearChange(e.target.value ? parseInt(e.target.value) : "")
            }
            className="w-full bg-gray-800 h-10 px-3 rounded-full appearance-none pr-10 text-sm"
          >
            <option value="">Year</option>
            {Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 2025 - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex flex-col justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 6l-4 4h8l-4-4z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4 text-white -mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 14l4-4H6l4 4z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-48">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full bg-gray-800 h-10 px-3 rounded-full appearance-none pr-10 text-sm"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex flex-col justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 6l-4 4h8l-4-4z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4 text-white -mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 14l4-4H6l4 4z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="w-48 h-10 bg-blue-600 rounded-full text-sm flex items-center justify-center"
        >
          Search
        </button>
      </div>

      {/* Movies Grid */}
      <div className="px-6 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading movies...</div>
          </div>
        ) : safeMovies.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            No movies found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {safeMovies.map((movie) => (
              <Link
                to={`/details/${movie?.id ?? ""}`}
                key={movie?.id ?? Math.random()}
                className="group cursor-pointer"
              >
                <div className="relative mb-2">
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie?.title ?? "Movie"}
                    className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-sm font-medium text-white truncate">
                  {movie?.title ?? "Untitled"}
                </div>
                <div className="text-xs flex items-center justify-between">
                  <span className="text-gray-400">
                    {movie?.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                  <span className="text-white">
                    ★ {Number(movie?.vote_average ?? 0).toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
