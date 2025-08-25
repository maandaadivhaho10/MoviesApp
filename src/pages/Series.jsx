import React, { useEffect, useState } from 'react';
import ContentRow from '../components/ContentRow';

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const Series = () => {
  const [netflixSeries, setNetflixSeries] = useState([]);
  const [appletvSeries, setAppletvSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resNetflix = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`);
      setNetflixSeries((await resNetflix.json()).results);

      const resAppleTV = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=2552`);
      setAppletvSeries((await resAppleTV.json()).results);
    }
    fetchData();
  }, []);

  return (
    <div className="pt-20 bg-black min-h-screen py-12">
      <ContentRow title="Apple TV Series" items={appletvSeries} isLarge />
      <ContentRow title="Netflix Series" items={netflixSeries} />
      <ContentRow title="Popular Series" items={[...netflixSeries].reverse()} />
    </div>
  );
};

export default Series;
