import React, { useState } from "react";
import { Search, Download, X, Menu } from "lucide-react";

const Navbar = ({ showSearch, setShowSearch, searchQuery, setSearchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-blue-500 flex-shrink-0">
          StreamHub
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 xl:space-x-10 text-white">
          <li>
            <a href="/" className="hover:text-blue-500 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/movies" className="hover:text-blue-500 transition-colors">
              Movies
            </a>
          </li>
          <li>
            <a href="/series" className="hover:text-blue-500 transition-colors">
              TV Series
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 transition-colors">
              My List
            </a>
          </li>
        </ul>

        {/* Desktop Search & App Download */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-gray-900 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies and series..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-48 lg:w-64"
                  autoFocus
                />
                <X
                  className="w-5 h-5 cursor-pointer hover:text-blue-500 ml-2"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            ) : (
              <Search
                className="w-5 h-5 cursor-pointer hover:text-blue-500"
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500">
            <span className="text-sm hidden lg:inline">APP</span>
            <Download className="w-4 h-4" />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-3 md:hidden text-white">
          {/* Mobile Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-gray-900 rounded-full px-3 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-32 text-sm"
                  autoFocus
                />
                <X
                  className="w-4 h-4 cursor-pointer hover:text-blue-500 ml-2"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            ) : (
              <Search
                className="w-5 h-5 cursor-pointer hover:text-blue-500"
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Menu
            className="w-6 h-6 cursor-pointer hover:text-blue-500"
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Tablet Search (md screens only) */}
        <div className="hidden md:flex lg:hidden items-center space-x-4 text-white">
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-gray-900 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-40"
                  autoFocus
                />
                <X
                  className="w-5 h-5 cursor-pointer hover:text-blue-500 ml-2"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            ) : (
              <Search
                className="w-5 h-5 cursor-pointer hover:text-blue-500"
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>
          <Download className="w-5 h-5 cursor-pointer hover:text-blue-500" />
          <Menu
            className="w-6 h-6 cursor-pointer hover:text-blue-500"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black bg-opacity-95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4 text-white">
              <a
                href="/"
                className="hover:text-blue-500 transition-colors text-lg py-2"
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a
                href="/movies"
                className="hover:text-blue-500 transition-colors text-lg py-2"
                onClick={closeMobileMenu}
              >
                Movies
              </a>
              <a
                href="/series"
                className="hover:text-blue-500 transition-colors text-lg py-2"
                onClick={closeMobileMenu}
              >
                TV Series
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition-colors text-lg py-2"
                onClick={closeMobileMenu}
              >
                My List
              </a>
            </div>

            {/* Mobile App Download */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-center space-x-2 cursor-pointer hover:text-blue-500 text-white py-2">
                <span className="text-sm">Download APP</span>
                <Download className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;