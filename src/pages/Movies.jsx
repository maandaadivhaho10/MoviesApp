import React, { useState, useEffect } from "react";
import ContentRow from "../components/ContentRow";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const Movies = () => {
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    async function fetchData(url, setter) {
      const res = await fetch(url);
      const data = await res.json();
      setter(data.results);
    }

    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`, setNetflixMovies);
    fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, setActionMovies);
  }, []);

  return (
    <div className="pt-20 bg-black min-h-screen">
      <ContentRow title="Netflix Movies" items={netflixMovies} />
      <ContentRow title="Action Movies" items={actionMovies} isLarge />
    </div>
  );
};

export default Movies;
