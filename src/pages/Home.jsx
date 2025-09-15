import React, { useState, useEffect } from "react";
import ContentRow from "../components/ContentRow";
import ExploreGenres from "../components/ExploreGenres";
import HeroSection from "../components/HeroSection";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [adventureMovies, setAdventureMovies] = useState([]);
  const [netflixSeries, setNetflixSeries] = useState([]);
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [appletvSeries, setAppletvSeries] = useState([]);

  useEffect(() => {
    async function fetchData(url, setter) {
      const res = await fetch(url);
      const data = await res.json();
      setter(data.results);
    }

    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, setActionMovies);
    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`, setHorrorMovies);
    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`, setRomanceMovies);
    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12`, setAdventureMovies);
    fetchData(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`, setNetflixSeries);
    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`, setNetflixMovies);
    fetchData(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=2552`, setAppletvSeries);
  }, []);

  return (
    <div className="pt-20 bg-black min-h-screen">
<HeroSection />
      <ContentRow title="Netflix Series" items={netflixSeries} />
      <ContentRow title="Netflix Movies" items={netflixMovies} />
      <ContentRow title="Action" items={actionMovies} isLarge />
      <ContentRow title="Horror" items={horrorMovies} isLarge />
      <ContentRow title="Adventure" items={adventureMovies} isLarge />
      <ContentRow title="Romance" items={romanceMovies} isLarge />
      <ContentRow title="Apple TV Series" items={appletvSeries} isLarge />
      <ExploreGenres />
    </div> 
  );
};

export default Home;
