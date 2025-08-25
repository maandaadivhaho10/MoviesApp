import React, { useEffect, useState } from 'react';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchResults = ({ searchQuery }) => {
  const [filteredContent, setFilteredContent] = useState([]);

  useEffect(() => {
    if (!searchQuery) return setFilteredContent([]);
    async function fetchSearch() {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
      const data = await res.json();
      setFilteredContent(data.results);
    }
    fetchSearch();
  }, [searchQuery]);

  return (
    <div className="pt-32 bg-black min-h-screen px-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Search Results for "{searchQuery}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredContent.map((item, index) => {
          const image = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";
          const name = item.title || item.name;
          const year = (item.release_date || item.first_air_date || "").split("-")[0];
          const rating = item.vote_average?.toFixed(1);
          return (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img src={image} alt={name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <h3 className="font-semibold text-white text-sm mb-1">{name}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <span>{year || "N/A"}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{rating || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
