import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./components/SearchResults";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";
import ExplorePage from "./pages/ExplorePage";
import DMCA from "./pages/DMCA";
import GenreDetailPage from "./pages/GenreDetailPage";
import ExploreGenres from "./components/ExploreGenres";
import PersonPage from "./pages/PersonPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

const AppContent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // List of routes where we don't want the Navbar and Footer
  const hideNavAndFooter = ["/", "/register"];

  return (
    <div className="bg-black min-h-screen text-white">
      <ScrollToTop />

      {/* Navbar should appear only on protected pages */}
      {isAuthenticated && !hideNavAndFooter.includes(location.pathname) && (
        <Navbar
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {searchQuery && showSearch ? (
        <SearchResults searchQuery={searchQuery} />
      ) : (
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/series"
            element={
              <ProtectedRoute>
                <Series />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <DetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/:title"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dmca"
            element={
              <ProtectedRoute>
                <DMCA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/genre/:genreId"
            element={
              <ProtectedRoute>
                <GenreDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore-genres"
            element={
              <ProtectedRoute>
                <ExploreGenres />
              </ProtectedRoute>
            }
          />
          <Route
            path="/person/:personId"
            element={
              <ProtectedRoute>
                <PersonPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}

      {/* Footer only on protected pages */}
      {isAuthenticated && !hideNavAndFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
