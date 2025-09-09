import React from "react";

// Displays the grid of genres
export default function GenreGrid({ genres, genreImages, onSelectGenre }) {
  return (
    <div className="bg-black text-white py-12">
      <h2 className="text-center text-2xl font-bold mb-10">Explore Genres</h2>

      <div className="flex justify-center gap-6 px-6 flex-wrap">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => onSelectGenre(genre)}
            className="relative w-40 sm:w-48 md:w-56 lg:w-60 h-80 rounded-md overflow-hidden cursor-pointer group hover:transform hover:scale-105 transition-all duration-300 bg-gray-900"
          >
            <img
              src={
                genreImages[genre.id]
                  ? genreImages[genre.id].startsWith("http")
                    ? genreImages[genre.id]
                    : `https://image.tmdb.org/t/p/w500${genreImages[genre.id]}`
                  : "/placeholder.png"
              }
              alt={genre.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                console.warn("Genre image failed, using placeholder:", genre.name, genreImages[genre.id]);
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.png";
              }}
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 flex items-center justify-center transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-center px-4 drop-shadow-md">{genre.name}</h3>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-md transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}