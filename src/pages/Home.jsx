import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [netflixSeries, setNetflixSeries] = useState([]);
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [adventureMovies, setAdventureMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resNetflixSeries = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`);
      setNetflixSeries((await resNetflixSeries.json()).results);

      const resNetflixMovies = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`);
      setNetflixMovies((await resNetflixMovies.json()).results);

      const resAction = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
      setActionMovies((await resAction.json()).results);

      const resHorror = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
      setHorrorMovies((await resHorror.json()).results);

      const resAdventure = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12`);
      setAdventureMovies((await resAdventure.json()).results);

      const resRomance = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`);
      setRomanceMovies((await resRomance.json()).results);
    }
    fetchData();
  }, []);

  return (
    <div className="pt-20">
      <HeroSection />
      <div className="bg-black py-12">
        <ContentRow title="Netflix Series" items={netflixSeries} />
        <ContentRow title="Netflix Movies" items={netflixMovies} />
        <ContentRow title="Action" items={actionMovies} isLarge />
        <ContentRow title="Horror" items={horrorMovies} isLarge />
        <ContentRow title="Adventure" items={adventureMovies} isLarge />
        <ContentRow title="Romance" items={romanceMovies} isLarge />
      </div>
    </div>
  );
};

export default Home;
