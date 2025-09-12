import React from 'react';
import Discover from '../components/Discover';

const Series = () => {
  return (
    <div className="pt-20 bg-black min-h-screen py-12">
      <Discover initialCategory="tv" />
    </div>
  );
};

export default Series;
