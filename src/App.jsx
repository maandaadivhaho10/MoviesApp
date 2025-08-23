import React, { useState, useEffect } from 'react';
import { Search, Download, Play, Plus, X } from 'lucide-react';

const VidJoyApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured content carousel
  const featuredContent = [
    {
      title: "F1",
      year: "2025",
      rating: "7.8",
      type: "MOVIE",
      description: "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=600&fit=crop&crop=center"
    },
    {
      title: "Top Gun: Maverick",
      year: "2025",
      rating: "8.3",
      type: "MOVIE", 
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1400&h=600&fit=crop&crop=center"
    },
    {
      title: "The Batman",
      year: "2025", 
      rating: "7.8",
      type: "MOVIE",
      description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      image: "https://images.unsplash.com/photo-1635863138275-d9864d513cd9?w=1400&h=600&fit=crop&crop=center"
    },
    {
      title: "Dune",
      year: "2025",
      rating: "8.0", 
      type: "MOVIE",
      description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1400&h=600&fit=crop&crop=center"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dummy data with real images
  const appletvSeries = [
    { title: "Severance", year: "2025", rating: "8.7", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop&crop=center" },
    { title: "The Morning Show", year: "2025", rating: "7.8", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=400&fit=crop&crop=center" },
    { title: "Ted Lasso", year: "2025", rating: "8.8", image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=400&fit=crop&crop=center" },
    { title: "Foundation", year: "2025", rating: "7.3", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop&crop=center" },
    { title: "See", year: "2025", rating: "7.6", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=400&fit=crop&crop=center" }
  ];

  const netflixSeries = [
    { title: "In the Mud", year: "2025", rating: "7.5", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=180&fit=crop&crop=center" },
    { title: "Bon Appetit", year: "2025", rating: "9.2", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=180&fit=crop&crop=center" },
    { title: "SAKAMOTO DA", year: "2025", rating: "8.1", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=180&fit=crop&crop=center" },
    { title: "Hostage", year: "2025", rating: "6.9", image: "https://images.unsplash.com/photo-1489599511229-d0b7d59ed7a5?w=300&h=180&fit=crop&crop=center" },
    { title: "Unspeakable", year: "2025", rating: "6.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=180&fit=crop&crop=center" }
  ];

  const netflixMovies = [
    { title: "KPop Demon", year: "2025", rating: "8.4", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=180&fit=crop&crop=center" },
    { title: "Gold Rush Ca...", year: "2025", rating: "6.4", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=180&fit=crop&crop=center" },
    { title: "Mad", year: "2025", rating: "7.2", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=180&fit=crop&crop=center" },
    { title: "Fall for Me", year: "2025", rating: "5.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=180&fit=crop&crop=center" },
    { title: "The Thursday...", year: "2025", rating: "6.8", image: "https://images.unsplash.com/photo-1489599511229-d0b7d59ed7a5?w=300&h=180&fit=crop&crop=center" }
  ];

  const actionMovies = [
    { title: "Black Widow", year: "2025", rating: "7.5", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop&crop=center" },
    { title: "Fast & Furious", year: "2025", rating: "8.2", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=300&fit=crop&crop=center" },
    { title: "John Wick", year: "2025", rating: "6.9", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=300&fit=crop&crop=center" },
    { title: "Mission Impossible", year: "2025", rating: "7.8", image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=200&h=300&fit=crop&crop=center" },
    { title: "The Matrix", year: "2025", rating: "8.5", image: "https://images.unsplash.com/photo-1635863138275-d9864d513cd9?w=200&h=300&fit=crop&crop=center" },
    { title: "Blade Runner", year: "2025", rating: "6.3", image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=300&fit=crop&crop=center" },
    { title: "Terminator", year: "2025", rating: "9.1", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&h=300&fit=crop&crop=center" }
  ];

  // Search functionality
  const allContent = [...appletvSeries, ...netflixSeries, ...netflixMovies, ...actionMovies];
  const filteredContent = searchQuery 
    ? allContent.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Components
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black bg-opacity-90 backdrop-blur-md">
      <div className="text-2xl font-bold text-blue-500">vidjoy</div>
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
    const currentContent = featuredContent[currentSlide];
    
    return (
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <img 
          src={currentContent.image} 
          alt={currentContent.title}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute bottom-32 left-8 z-20 max-w-xl">
          <h1 className="text-6xl font-bold mb-4">{currentContent.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-gray-800 px-3 py-1 rounded text-sm font-semibold">{currentContent.type}</span>
            <span>{currentContent.year}</span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{currentContent.rating}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">{currentContent.description}</p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              <Play className="w-5 h-5" />
              <span className="font-semibold">Watch</span>
            </button>
            <button className="flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
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
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    };

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6 px-8">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {showExplore && (
            <button className="text-blue-500 hover:text-blue-400 transition-colors flex items-center">
              Explore <span className="ml-1">›</span>
            </button>
          )}
        </div>
        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ‹
          </button>
          <div 
            id={`scroll-${title.replace(/\s+/g, '')}`}
            className="flex space-x-4 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
          >
            {items.map((item, index) => (
              <div key={index} className={`flex-shrink-0 group cursor-pointer ${isLarge ? 'w-80' : 'w-64'}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isLarge ? 'h-48' : 'h-36'}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
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
          <button 
            onClick={() => scroll('right')}
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