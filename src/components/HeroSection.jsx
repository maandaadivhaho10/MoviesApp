import React, { useState, useEffect } from 'react';
import { Play, Plus, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const HeroSection = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

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

  if (featuredContent.length === 0) return (
    <div className="flex items-center justify-center h-[40vh] md:h-[55vh] text-white pt-20 md:pt-28">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );

  const currentContent = featuredContent[currentSlide];

  return (
    <div className="relative h-[40vh] sm:h-[48vh] md:h-[56vh] lg:h-[64vh] xl:h-[70vh]">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
      
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original${currentContent.backdrop_path}`}
        alt={currentContent.title}
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
      
      {/* Content */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-4 sm:left-6 md:left-8 lg:left-12 right-4 sm:right-6 md:right-8 lg:right-auto z-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold mb-2 md:mb-3 lg:mb-4 leading-tight">
          {currentContent.title}
        </h1>
        
        {/* Movie Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4 text-xs sm:text-sm text-gray-300">
          <span className="bg-white text-black px-2 py-0.5 rounded font-semibold text-xs">
            MOVIE
          </span>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
            <span>{currentContent.release_date?.split("-")[0]}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <span className="text-white">★</span>
            <span className="text-white">{currentContent.vote_average.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-none">
          {currentContent.overview}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={() => navigate(`/details/${currentContent.id}`)}
            className="flex items-center space-x-2 bg-white text-black px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base font-semibold"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Watch</span>
            <span className="sm:hidden">Play</span>
          </button>
          <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-full hover:bg-white/20 transition-colors">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-4 sm:right-6 md:right-8 lg:right-12 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white" : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Mobile Navigation Arrows (Optional) */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-2 right-2 flex justify-between z-20 sm:hidden">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length)}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredContent.length)}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;