import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);

  const placeholder = "/placeholder.png"; // local fallback

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
        );
        const data = await res.json();
        setMovie(data);
        setVideos(data.videos?.results || []);
        setImages(data.images?.backdrops || []);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="pt-32 text-white">Loading...</div>;

  return (
    <div className="pt-32 px-8 text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholder}
          alt={movie.title}
          className="w-full lg:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-6">
            <span>Release: {movie.release_date || "N/A"}</span>
            <span>•</span>
            <span>Rating: {movie.vote_average?.toFixed(1) || "N/A"}</span>
          </div>

          {videos.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Trailers</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {videos.map((video) => (
                  <iframe
                    key={video.id}
                    width="300"
                    height="170"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allowFullScreen
                  />
                ))}
              </div>
            </>
          )}

          {images.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-2 mt-6">Images</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {images.map((img) => (
                  <img
                    key={img.file_path}
                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                    alt=""
                    className="h-40 rounded-lg"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
