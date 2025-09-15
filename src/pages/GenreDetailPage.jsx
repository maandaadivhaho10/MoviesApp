import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const genreData = [
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "SCI-FI" },
];

export default function GenreDetailPage() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const genreName = genreData.find((g) => g.id === parseInt(genreId))?.name;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [genreId]);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{genreName} Movies</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading movies...</div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No movies found for this genre.
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
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
