import React from "react";
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
}) {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Filter Controls */}
      <div className="px-6 py-4 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Back to Genres
          </button>
          <h1 className="text-2xl font-bold">{selectedGenre.name} Movies</h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Genre Filter (Selected) */}
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {selectedGenre.name}
              <button onClick={onRemoveGenre} className="text-xs hover:text-gray-300">×</button>
            </span>
          </div>

          {/* Year Filter */}
          <select
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
          >
            <option value="popularity.desc">Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="release_date.desc">Latest</option>
            <option value="title.asc">A-Z</option>
          </select>

          <button
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
          >
            Search
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="px-6 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading movies...</div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            No movies found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {movies.map((movie) => (
              <Link to={`/details/${movie.id}`} key={movie.id} className="group cursor-pointer">
                <div className="relative mb-2">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className="text-sm font-medium text-white truncate">
                  {movie.title}
                </div>
                <div className="text-xs text-gray-400">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}