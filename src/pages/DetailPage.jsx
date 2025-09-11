// DetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Play, Plus } from "lucide-react";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [type, setType] = useState(null); // "movie" | "tv"
  const [loading, setLoading] = useState(true);

  // tv-only
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false); // modal visibility
  const [playerKey, setPlayerKey] = useState(null); // YouTube video key

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setData(null);
      setSelectedSeason(null);
      try {
        // Try movie first
        let res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        if (res.ok) {
          setType("movie");
          setData(await res.json());
        } else {
          // Try TV
          res = await fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits,seasons`
          );
          if (res.ok) {
            const tv = await res.json();
            setType("tv");
            setData(tv);

            // pick first real season (skip season 0 specials if present)
            const firstReal =
              tv.seasons?.find((s) => s.season_number > 0) || tv.seasons?.[0];
            if (firstReal) setSelectedSeason(firstReal.season_number);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const backdrop = useMemo(
    () =>
      data?.backdrop_path || data?.poster_path
        ? `https://image.tmdb.org/t/p/original${
            data.backdrop_path || data.poster_path
          }`
        : undefined,
    [data]
  );
  const poster = useMemo(
    () =>
      data?.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "/placeholder.png",
    [data]
  );

  if (loading) return <p className="text-white p-8">Loading...</p>;
  if (!data) return <p className="text-white p-8">Not found</p>;

  const firstYouTubeKey = (data.videos?.results || [])
    .filter(v => v.site === "YouTube")
    .sort((a, b) => (a.type === "Trailer" ? -1 : 1)) // prefer trailers if present
    [0]?.key;

  const handleWatch = () => {
    if (firstYouTubeKey) {
      setPlayerKey(firstYouTubeKey);
      setShowPlayer(true);
    } else {
      alert("No trailer available to play.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* HERO with backdrop + gradient + floating poster */}
      <section
        className="relative h-[68vh] min-h-[480px] w-full"
        style={backdrop ? { backgroundImage: `url(${backdrop})` } : {}}
      >
        {/* backdrop styling */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={backdrop ? { backgroundImage: `url(${backdrop})` } : {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* content grid */}
        <div className="relative h-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-8 items-end">
            {/* Left: text */}
            <div className="md:col-span-8 pb-10">
              <h1 className="text-4xl md:text-5xl font-bold">
                {data.title || data.name}
              </h1>
              <p className="mt-3 text-gray-200 max-w-3xl">
                {data.overview || "No overview available."}
              </p>
              <p className="mt-2 text-gray-300 flex items-center gap-1">
                <span className="text-white">★</span>
                <span className="text-white">{data.vote_average?.toFixed(1) ?? "N/A"}</span>
                <span>• {(data.release_date || data.first_air_date || "").slice(0, 4)}</span>
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleWatch}
                  className="flex items-center space-x-2 bg-white text-black px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base font-semibold"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Watch</span>
                  <span className="sm:hidden">Play</span>
                </button>
                <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-full hover:bg-white/20 transition-colors">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Right: floating poster (hidden on small) */}
            <div className="hidden md:flex md:col-span-4 justify-end pb-10">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={poster}
                  alt={(data.title || data.name) + " poster"}
                  className="w-64 h-96 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TV: Episodes with season selector */}
      {type === "tv" && (
        <section className="px-6 md:px-12 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold">Episodes</h2>

            {data.seasons?.length > 0 && (
              <select
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                value={selectedSeason ?? ""}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
              >
                {data.seasons
                  .filter((s) => s.episode_count > 0)
                  .map((s) => (
                    <option key={s.id} value={s.season_number}>
                      {s.name}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {selectedSeason != null && (
            <EpisodeRow tvId={id} seasonNumber={selectedSeason} />
          )}
        </section>
      )}

      {/* Trailers */}
      <section className="px-4 sm:px-6 md:px-12 py-8">
        <h2 className="text-2xl font-semibold mb-4">Trailers</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-blue">
          {(data.videos?.results || [])
            .filter((v) => v.site === "YouTube")
            .map((v) => (
              <iframe
                key={v.id}
                width="280"
                height="158"
                src={`https://www.youtube.com/embed/${v.key}`}
                title={v.name}
                allowFullScreen
                className="rounded-lg sm:w-[320px] sm:h-[180px]"
              />
            ))}
        </div>
      </section>

      {/* Cast */}
      <section className="px-4 sm:px-6 md:px-12 py-8">
  <h2 className="text-2xl font-semibold mb-4">Cast</h2>
  <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-blue">
    {(data.credits?.cast || []).slice(0, 12).map((actor) => (
      <Link key={actor.id} to={`/person/${actor.id}`}>
        <div className="w-24 sm:w-28 md:w-32 text-center">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "/placeholder.png"
            }
            alt={actor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full mb-2"
            loading="lazy"
          />
          <p className="text-xs sm:text-sm font-medium truncate">{actor.name}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 truncate">{actor.character}</p>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* Overlay Player Modal */}
      {showPlayer && playerKey && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-10 right-0 text-white bg-white/10 hover:bg-white/20 rounded px-3 py-1"
            >
              ✕ Close
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${playerKey}?autoplay=1&rel=0`}
              title="Trailer Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const EpisodeRow = ({ tvId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const run = async () => {
      const res = await fetch(
        `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`
      );
      const json = await res.json();
      setEpisodes(json.episodes || []);
    };
    run();
  }, [tvId, seasonNumber]);

  if (!episodes.length) return null;

  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-blue">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="min-w-[240px] bg-white/5 rounded-xl overflow-hidden border border-white/10"
        >
          <img
            src={
              ep.still_path
                ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                : "/placeholder.png"
            }
            alt={ep.name}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
          <div className="p-3">
            <p className="text-sm font-semibold">
              Episode {ep.episode_number}: {ep.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailPage;
