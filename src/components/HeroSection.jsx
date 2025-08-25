import React, { useState, useEffect } from 'react';
import { Play, Plus, CalendarDays } from 'lucide-react';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const HeroSection = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      setFeaturedContent(data.results);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    if (featuredContent.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredContent]);

  if (featuredContent.length === 0) return <div className="text-white pt-32">Loading...</div>;

  const currentContent = featuredContent[currentSlide];

  return (
    <div className="relative h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${currentContent.backdrop_path}`}
        alt={currentContent.title}
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
      <div className="absolute bottom-20 left-6 z-20 max-w-lg">
        <h1 className="text-4xl text-white font-bold mb-2">{currentContent.title}</h1>
        <div className="flex items-center space-x-2 mb-2 text-sm text-gray-300">
          <span className="bg-white text-black px-2 py-0.5 rounded font-semibold">MOVIE</span>
          <span>•</span>
          <CalendarDays className="w-4 h-4 text-gray-300" />
          <span>{currentContent.release_date?.split("-")[0]}</span>
          <span>•</span>
          <div className="flex items-center">
            <span className="text-white mr-1">★</span>
            <span className="text-white">{currentContent.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">{currentContent.overview}</p>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
            <Play className="w-5 h-5" />
            <span className="font-semibold">Watch</span>
          </button>
          <button className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full hover:bg-gray-700 hover:text-black transition-colors">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-6 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentSlide ? "bg-white" : "bg-gray-600 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
