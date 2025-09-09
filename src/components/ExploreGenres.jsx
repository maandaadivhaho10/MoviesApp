import React, { useEffect, useState } from "react";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b"; // replace with your TMDB key
const BASE_URL = "https://api.themoviedb.org/3";

const genreData = [
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "SCI-FI" },
];

export default function ExploreGenres() {
  const [genreImages, setGenreImages] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2022);
  const [sortBy, setSortBy] = useState("popularity.desc");

  // Fetch genre poster images
  useEffect(() => {
    async function fetchGenreImages() {
      const fetchedImages = {};
      for (let genre of genreData) {
        try {
          const res = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc`
          );
          const data = await res.json();
          if (data.results.length > 0) {
            fetchedImages[genre.id] = data.results[0].poster_path;
          }
        } catch (err) {
          console.error("Error fetching genre image:", genre.name, err);
        }
      }
      setGenreImages(fetchedImages);
    }
    fetchGenreImages();
  }, []);

  // Fetch movies for selected genre
  const fetchMoviesForGenre = async (genreId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&year=${currentYear}&sort_by=${sortBy}&page=1`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies for genre:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMoviesForGenre(genre.id);
  };

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setMovies([]);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
    if (selectedGenre) {
      fetchMoviesForGenre(selectedGenre.id);
    }
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    if (selectedGenre) {
      fetchMoviesForGenre(selectedGenre.id);
    }
  };

  const removeGenreFilter = () => {
    if (selectedGenre) {
      fetchMoviesForGenre(selectedGenre.id);
    }
  };

  if (selectedGenre) {
    return (
      <div className="bg-black text-white min-h-screen">
        {/* Filter Controls */}
        <div className="px-6 py-4 bg-gray-900">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToGenres}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              ← Back to Genres
            </button>
            <h1 className="text-2xl font-bold">{selectedGenre.name} Movies</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Genre Filter (Selected) */}
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {selectedGenre.name}
                <button onClick={removeGenreFilter} className="text-xs hover:text-gray-300">×</button>
              </span>
            </div>

            {/* Year Filter */}
            <select
              value={currentYear}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
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
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
            >
              <option value="popularity.desc">Popular</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="release_date.desc">Latest</option>
              <option value="title.asc">A-Z</option>
            </select>

            <button
              onClick={() => fetchMoviesForGenre(selectedGenre.id)}
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
                <div key={movie.id} className="group cursor-pointer">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Genre Selection View
  return (
    <div className="bg-black text-white py-12">
      <h2 className="text-center text-2xl font-bold mb-10">Explore Genres</h2>
      
      <div className="flex justify-center gap-6 px-6 flex-wrap">
  {genreData.map((genre) => {
    const imageUrl = genreImages[genre.id]
      ? `https://image.tmdb.org/t/p/w500${genreImages[genre.id]}`
      : "/placeholder.png";

    // Print the URL
    console.log("Image URL for", genre.name, ":", imageUrl);

    return (
      <div
        key={genre.id}
        onClick={() => handleGenreClick(genre)}
        className="relative w-40 sm:w-48 md:w-56 lg:w-60 h-80 rounded-md overflow-hidden cursor-pointer group hover:transform hover:scale-105 transition-all duration-300"
      >
        <img
          src={imageUrl}
          alt={genre.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
          <h3 className="text-lg md:text-xl font-semibold text-center px-4">
            {genre.name}
          </h3>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-md transition-all duration-300"></div>
      </div>
    );
  })}
</div>
      </div>
  );
}