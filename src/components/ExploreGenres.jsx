import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GenreGrid from "./GenreGrid";
import GenreMoviesView from "./GenreMoviesView";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // from Vite env
const BASE_URL = "https://api.themoviedb.org/3";

const genreData = [
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "SCI-FI" },
];

export default function ExploreGenres() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [genreImages, setGenreImages] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2022);
  const [sortBy, setSortBy] = useState("popularity.desc");

  // If URL has genreId, set selected genre and fetch movies
  useEffect(() => {
    const idParam = searchParams.get("genreId");
    const nameParam = searchParams.get("name");

    if (idParam) {
      const idNum = parseInt(idParam, 10);
      const name = nameParam || (genreData.find((g) => g.id === idNum)?.name || "Genre");
      const genre = { id: idNum, name };
      setSelectedGenre(genre);
      fetchMoviesForGenre(idNum);
    } else {
      // No genre param: ensure grid view
      setSelectedGenre(null);
      setMovies([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch genre poster images
  useEffect(() => {
    async function fetchGenreImages() {
      const fetchedImages = {};
      for (let genre of genreData) {
        try {
          const res = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=1`
          );
          const data = await res.json();
          if (Array.isArray(data.results) && data.results.length > 0) {
            // Prefer a movie with a poster; otherwise use a backdrop
            const withPoster = data.results.find((m) => m.poster_path);
            if (withPoster && withPoster.poster_path) {
              fetchedImages[genre.id] = `https://image.tmdb.org/t/p/w500${withPoster.poster_path}`;
            } else {
              const withBackdrop = data.results.find((m) => m.backdrop_path);
              if (withBackdrop && withBackdrop.backdrop_path) {
                fetchedImages[genre.id] = `https://image.tmdb.org/t/p/w780${withBackdrop.backdrop_path}`;
              }
            }
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
    // Navigate to dedicated route so Home content doesn't overlap
    navigate(`/explore-genres?genreId=${genre.id}&name=${encodeURIComponent(genre.name)}`);
  };

  const handleBackToGenres = () => {
    // Navigate back to grid-only route
    navigate(`/explore-genres`);
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
      <GenreMoviesView
        selectedGenre={selectedGenre}
        currentYear={currentYear}
        sortBy={sortBy}
        loading={loading}
        movies={movies}
        onBack={handleBackToGenres}
        onYearChange={handleYearChange}
        onSortChange={handleSortChange}
        onSearch={() => fetchMoviesForGenre(selectedGenre.id)}
        onRemoveGenre={removeGenreFilter}
        onGenreChange={(genre) => {
          const id = typeof genre === 'object' && genre !== null ? genre.id : genre;
          const name = typeof genre === 'object' && genre !== null ? genre.name : undefined;
          if (!id) {
            setSelectedGenre(null);
            setMovies([]);
            navigate(`/explore-genres`);
            return;
          }
          // Update state immediately for responsive UI
          setSelectedGenre({ id, name: name ?? (genreData.find(g => g.id === id)?.name || 'Genre') });
          fetchMoviesForGenre(id);
          // Keep URL in sync
          navigate(`/explore-genres?genreId=${id}&name=${encodeURIComponent(name ?? (genreData.find(g => g.id === id)?.name || 'Genre'))}`);
        }}
      />
    );
  }

  return (
    <GenreGrid
      genres={genreData}
      genreImages={genreImages}
      onSelectGenre={handleGenreClick}
    />
  );
}