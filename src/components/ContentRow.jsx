import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContentRow = ({ title, items, showExplore = true, isLarge = false }) => {
  const [visibleCount, setVisibleCount] = useState(2);

  // Determine how many cards fit in one row based on Tailwind breakpoints
  const computeVisible = () => {
    const w = window.innerWidth;
    if (w >= 1024) return 6;      // lg
    if (w >= 768) return 4;       // md
    if (w >= 640) return 3;       // sm
    return 2;                     // default
  };

  useEffect(() => {
    const update = () => setVisibleCount(computeVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="mb-12">
      {/* Title + Explore */}
      <div className="flex justify-between items-center mb-6 px-4 sm:px-8">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
       {showExplore && (
  <Link
    to={`/explore/${title}`}
    state={{ items }} // pass items to explore page
    className="text-white hover:text-shadow-white transition-colors flex items-center"
  >
    Explore <span className="ml-1">›</span>
  </Link>
)}
      </div>

      {/* Row with arrows */}
      <div className="relative group">
        {/* Arrows removed for grid layout */}

        {/* Content grid (no horizontal scroll) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-4 sm:px-8"
        >
          {visibleItems.map((item, index) => {
            const image = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "/placeholder.png"; // keep placeholder.png in /public
            const name = item.title || item.name;
            const year = (item.release_date || item.first_air_date || "").split("-")[0];
            const rating = item.vote_average?.toFixed(1);

            return (
              <Link to={`/details/${item.id}`} key={index}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={name}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        isLarge ? "h-48" : "h-40"
                      }`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="font-semibold text-white mb-1">{name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <span>{year || "N/A"}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <span className="text-white mr-1">★</span>
                          <span>{rating || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
