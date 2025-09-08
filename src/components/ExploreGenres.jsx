import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [images, setImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const fetchedImages = {};
      for (let genre of genreData) {
        try {
          const res = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
          );
          if (res.data.results.length > 0) {
            fetchedImages[genre.id] = res.data.results[0].poster_path;
          }
        } catch (err) {
          console.error("Error fetching genre:", genre.name, err);
        }
      }
      setImages(fetchedImages);
    }
    fetchImages();
  }, []);

  return (
    <div className="bg-black text-white py-12">
      <h2 className="text-center text-2xl font-bold mb-10">Explore Genres</h2>

      <div className="flex justify-center gap-6 px-6 flex-wrap">
        {genreData.map((genre) => (
          <div
            key={genre.id}
            className="relative w-40 sm:w-48 md:w-56 lg:w-60 h-80 rounded-md overflow-hidden cursor-pointer group"
          >
            <img
              src={
                images[genre.id]
                  ? `https://image.tmdb.org/t/p/w500${images[genre.id]}`
                  : "https://via.placeholder.com/300x450?text=Loading..."
              }
              alt={genre.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-lg md:text-xl font-semibold">{genre.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
