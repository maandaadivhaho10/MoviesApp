import React from "react";
import Discover from "../components/Discover";

const Movies = () => {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <Discover initialCategory="movie" />
    </div>
  );
};

export default Movies;
