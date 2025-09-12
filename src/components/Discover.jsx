import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b"; // replace with your TMDB key
const BASE_URL = "https://api.themoviedb.org/3";
const ITEMS_PER_PAGE = 12; // how many movies per page

const Discover = ({ initialCategory = "movie" }) => {
  const category = initialCategory; // fixed category from parent
  const isMovie = category === "movie";
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  // Fixed sort options as requested
  const sortOptions = [
    { value: 'popularity.asc', label: 'POPULARITY_ASC' },
    { value: 'popularity.desc', label: 'POPULARITY_DESC' },
    { value: 'release_date.asc', label: 'RELEASE_DATE_ASC' },
    { value: 'release_date.desc', label: 'RELEASE_DATE_DESC' },
    { value: 'primary_release_date.asc', label: 'PRIMARY_RELEASE_DATE_ASC' },
    { value: 'primary_release_date.desc', label: 'PRIMARY_RELEASE_DATE_DESC' },
    { value: 'original_title.asc', label: 'ORIGINAL_TITLE_ASC' },
    { value: 'original_title.desc', label: 'ORIGINAL_TITLE_DESC' },
    { value: 'vote_count.desc', label: 'VOTE_COUNT' },
  ];

  // Fetch genres dynamically based on category
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/genre/${category}/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(res.data.genres);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, [category]);

  // Fetch movies/TV based on filters
  const fetchResults = async () => {
    try {
      const url = `${BASE_URL}/discover/${category}?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sort}${
        selectedGenre ? `&with_genres=${selectedGenre}` : ""
      }${year ? (isMovie ? `&primary_release_year=${year}` : `&first_air_date_year=${year}`) : ""}`;

      const res = await axios.get(url);
      setResults(res.data.results || []);
      setPage(1); // reset to first page on new fetch
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [category, selectedGenre, year, sort]);

  // Pagination helpers
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE) || 1;
  const paginated = results.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* Filters */}
      <div className="sticky top-0 z-20 bg-black/90 py-2 flex flex-wrap gap-2 items-center justify-center mb-4">
        <select
          value={selectedGenre || ""}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded"
        >
          <option value="">Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded w-32"
        >
          <option value="">All Years</option>
          {Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 2025 - i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={fetchResults}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-1">
        {paginated.map((item) => (
          <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={item.title || item.name}
              className="w-full h-52 sm:h-56 md:h-48 lg:h-48 object-cover"
            />
            <div className="p-2">
              <h3 className="text-xs font-semibold truncate">
                {item.title || item.name}
              </h3>
              <p className="text-gray-400 text-[10px]">
                {item.release_date || item.first_air_date || "N/A"}
              </p>
              <p className="text-yellow-400 text-xs">⭐ {item.vote_average ? item.vote_average.toFixed(1) : "0.0"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full disabled:opacity-40"
        >
          ‹
        </button>
        <span className="text-lg font-semibold">{page}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Discover;
