import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./components/SearchResults";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";

const App = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {searchQuery && showSearch ? (
          <SearchResults searchQuery={searchQuery} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            
          </Routes>
        )}
           <Footer />
      </div>
    </Router>
  );
};

export default App;
