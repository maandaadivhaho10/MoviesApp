import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, X } from 'lucide-react';

const Navbar = ({ showSearch, setShowSearch, searchQuery, setSearchQuery }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black bg-opacity-90 backdrop-blur-md">
    <div className="text-2xl font-bold text-blue-500">StreamHub</div>
    <ul className="flex space-x-10 text-white">
      <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
      <li><Link to="/movies" className="hover:text-blue-500 transition-colors">Movies</Link></li>
      <li><Link to="/series" className="hover:text-blue-500 transition-colors">TV Series</Link></li>
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
            <X className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors ml-2"
               onClick={() => { setShowSearch(false); setSearchQuery(''); }}
            />
          </div>
        ) : (
          <Search className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={() => setShowSearch(true)} />
        )}
      </div>
      <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-colors">
        <span className="text-sm">APP</span>
        <Download className="w-4 h-4" />
      </div>
    </div>
  </nav>
);

export default Navbar;
