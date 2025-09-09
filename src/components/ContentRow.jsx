import React, { useRef } from "react";
import { Link } from "react-router-dom";

const ContentRow = ({ title, items, showExplore = true, isLarge = false }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // how far it moves per click
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-12">
      {/* Title + Explore */}
      <div className="flex justify-between items-center mb-6 px-8">
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
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 
                     bg-black bg-opacity-50 hover:bg-opacity-80 text-white 
                     p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ‹
        </button>

        {/* Content row */}
        <div
          ref={scrollRef}
          className="flex space-x-4 px-8 overflow-hidden scroll-smooth"
        >
          {items.map((item, index) => {
            const image = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "/placeholder.png"; // keep placeholder.png in /public
            const name = item.title || item.name;
            const year = (item.release_date || item.first_air_date || "").split(
              "-"
            )[0];
            const rating = item.vote_average?.toFixed(1);

            return (
              <Link to={`/details/${item.id}`} key={index}>
                <div
                  className={`flex-shrink-0 group cursor-pointer ${
                    isLarge ? "w-80" : "w-64"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={name}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        isLarge ? "h-48" : "h-36"
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
