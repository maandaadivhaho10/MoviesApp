import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12; // how many movies per page

const ExplorePage = () => {
  const { title } = useParams();
  const location = useLocation();
  const allItems = location.state?.items || [];

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  const paginatedItems = allItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Link to="/" className="text-blue-400 hover:underline">
          ← Back
        </Link>
      </div>

      {/* Grid of items (taller + narrower cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
        {paginatedItems.map((item, index) => {
          const image = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/placeholder.png";
          const name = item.title || item.name;
          const year = (item.release_date || item.first_air_date || "").split(
            "-"
          )[0];
          const rating = item.vote_average?.toFixed(1);

          return (
            <Link
              to={`/details/${item.id}`}
              key={index}
              className="group cursor-pointer w-36 sm:w-40 md:w-44"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  {/* Title */}
                  <h3 className="font-bold text-white text-base truncate mb-1">
                    {name}
                  </h3>

                  {/* Year (left) + Rating (right) */}
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <span>{year || "N/A"}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{rating || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination with arrows + number only */}
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

export default ExplorePage;
