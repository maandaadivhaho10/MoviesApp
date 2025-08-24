import React, { useState, useEffect } from 'react';
import { Search, Download, Play, Plus, X } from 'lucide-react';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const VidJoyApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

    const [featuredContent, setFeaturedContent] = useState([]);
  const [appletvSeries, setAppletvSeries] = useState([]);
  const [netflixSeries, setNetflixSeries] = useState([]);
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
 
  
  // Fetch Featured Movies
  useEffect(() => {
    async function fetchFeatured() {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      setFeaturedContent(data.results);
    }
    fetchFeatured();
  }, []);

  // Fetch Action Movies
  useEffect(() => {
    async function fetchAction() {
      const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
      const data = await res.json();
      setActionMovies(data.results);
    }
    fetchAction();
  }, []);
   useEffect(() => {
    // Apple TV+ series (network_id = 2552)
    async function fetchAppleTV() {
      const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=2552&language=en-US&page=1`
      );
      const data = await res.json();
      setAppletvSeries(data.results);
    }

    // Netflix series (network_id = 213)
    async function fetchNetflixSeries() {
      const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US&page=1`
      );
      const data = await res.json();
      setNetflixSeries(data.results);
    }

    // Netflix movies (network_id = 213 but in movie category)
    async function fetchNetflixMovies() {
      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&language=en-US&page=1`
      );
      const data = await res.json();
      setNetflixMovies(data.results);
    }

    // Action movies (genre_id = 28)
    async function fetchActionMovies() {
      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&page=1`
      );
      const data = await res.json();
      setActionMovies(data.results);
    }

    fetchAppleTV();
    fetchNetflixSeries();
    fetchNetflixMovies();
    fetchActionMovies();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      async function fetchSearch() {
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
        const data = await res.json();
        setFilteredContent(data.results);
      }
      fetchSearch();
    } else {
      setFilteredContent([]);
    }
  }, [searchQuery]);

  // Auto-slide functionality
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);



  // Components
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black bg-opacity-90 backdrop-blur-md">
      <div className="text-2xl font-bold text-blue-500">StreamHub</div>
      <ul className="flex space-x-10 text-white">
        <li><a href="#" className={`hover:text-blue-500 transition-colors ${currentView === 'home' ? 'text-white' : 'text-gray-400'}`} onClick={() => setCurrentView('home')}>Home</a></li>
        <li><a href="#" className={`hover:text-blue-500 transition-colors ${currentView === 'movies' ? 'text-white' : 'text-gray-400'}`} onClick={() => setCurrentView('movies')}>Movies</a></li>
        <li><a href="#" className={`hover:text-blue-500 transition-colors ${currentView === 'series' ? 'text-white' : 'text-gray-400'}`} onClick={() => setCurrentView('series')}>TV Series</a></li>
        <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">My List</a></li>
      </ul>
      <div className="flex items-center space-x-4 text-white">
        <div className="relative">
          {showSearch ? (
            <div className="flex items-center bg-gray-900 rounded-full px-4 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies and series..."
                className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
                autoFocus
              />
              <X 
                className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors ml-2" 
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              />
            </div>
          ) : (
            <Search 
              className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-colors">
          <span className="text-sm">APP</span>
          <Download className="w-4 h-4" />
        </div>
      </div>
    </nav>
  );

const HeroSection = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch TMDB movies
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setFeaturedContent(data.results);
    }
    fetchMovies();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (featuredContent.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredContent]);

  if (featuredContent.length === 0) return <div className="text-white">Loading...</div>;

  const currentContent = featuredContent[currentSlide];

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${currentContent.backdrop_path}`}
        alt={currentContent.title}
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
      <div className="absolute bottom-32 left-8 z-20 max-w-xl">
        <h1 className="text-6xl text-white font-bold mb-4">{currentContent.title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-white text-black px-3 py-1 rounded text-sm font-semibold">
            MOVIE
          </span>
          <span className="font-semibold text-gray-300">•</span>
          <span className="text-white">
            {currentContent.release_date?.split("-")[0]}
          </span>
          <span className="font-semibold text-gray-300">•</span>
          <div className="flex items-center">
            <span className="text-white mr-1">★</span>
            <span className="text-white">{currentContent.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">{currentContent.overview}</p>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
            <Play className="w-5 h-5" />
            <span className="font-semibold">Watch</span>
          </button>
          <button className="flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-gray-700 hover:text-black transition-colors">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? "bg-white"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ContentRow = ({ title, items, showExplore = true, isLarge = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '')}`);
    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6 px-8">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {showExplore && (
          <button className="text-white hover:text-shadow-white transition-colors flex items-center">
            Explore <span className="ml-1">›</span>
          </button>
        )}
      </div>

      <div className="relative group">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ‹
        </button>

        {/* Items */}
        <div
          id={`scroll-${title.replace(/\s+/g, "")}`}
          className="flex space-x-4 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          {items.map((item, index) => {
            const image = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image";
            const name = item.title || item.name;
            const year = (item.release_date || item.first_air_date || "").split("-")[0];
            const rating = item.vote_average?.toFixed(1);

            return (
              <div
                key={index}
                className={`flex-shrink-0 group cursor-pointer ${isLarge ? "w-80" : "w-64"}`}
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
                      <span>{year}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <span className="text-white mr-1">★</span>
                        <span>{rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ›
        </button>
      </div>
    </div>
  );
};

  const SearchResults = () => (
    <div className="pt-32 bg-black min-h-screen px-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Search Results for "{searchQuery}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredContent.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <span>{item.year}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="pt-20">
      <HeroSection />
      <div className="bg-black py-12">
        <ContentRow title="Apple TV Series" items={appletvSeries} isLarge={true} />
        <ContentRow title="Netflix Series" items={netflixSeries} />
        <ContentRow title="Netflix Movies" items={netflixMovies} />
        <ContentRow title="Action" items={actionMovies} />
      </div>
    </div>
  );

  const MoviesView = () => (
    <div className="pt-20 bg-black min-h-screen">
      <div className="py-12">
        <ContentRow title="Netflix Movies" items={netflixMovies} />
        <ContentRow title="Action Movies" items={actionMovies} />
        <ContentRow title="Popular Movies" items={[...netflixMovies].reverse()} />
      </div>
    </div>
  );

  const SeriesView = () => (
    <div className="pt-20 bg-black min-h-screen">
      <div className="py-12">
        <ContentRow title="Apple TV Series" items={appletvSeries} isLarge={true} />
        <ContentRow title="Netflix Series" items={netflixSeries} />
        <ContentRow title="Popular Series" items={[...netflixSeries].reverse()} />
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {searchQuery && showSearch ? (
        <SearchResults />
      ) : (
        <>
          {currentView === 'home' && <HomeView />}
          {currentView === 'movies' && <MoviesView />}
          {currentView === 'series' && <SeriesView />}
        </>
      )}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VidJoyApp;