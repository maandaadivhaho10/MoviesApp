import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentRow from "../components/ContentRow";

const API_KEY = "308f4dafd1dfe3023311c1e5b4356a1b";
const BASE_URL = "https://api.themoviedb.org/3";

const PersonPage = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const personRes = await axios.get(
          `${BASE_URL}/person/${personId}?api_key=${API_KEY}&language=en-US`
        );
        const creditsRes = await axios.get(
          `${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}&language=en-US`
        );

        setPerson(personRes.data);
        setCredits(creditsRes.data.cast || []);
      } catch (err) {
        console.error("Error fetching person details:", err);
      }
    };
    fetchPersonDetails();
  }, [personId]);

  const movieCredits = useMemo(() => {
    return (credits || [])
      .filter((c) => c.media_type === "movie")
      .sort((a, b) => {
        // Sort by release_date desc, fallback to popularity
        const ad = a.release_date ? new Date(a.release_date).getTime() : 0;
        const bd = b.release_date ? new Date(b.release_date).getTime() : 0;
        if (bd !== ad) return bd - ad;
        return (b.popularity || 0) - (a.popularity || 0);
      });
  }, [credits]);

  if (!person) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Person Info */}
      <div className="flex flex-col md:flex-row items-start md:space-x-6">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : "/placeholder.png"
          }
          alt={person.name}
          className="w-48 h-64 object-cover rounded-lg mb-4 md:mb-0"
        />
        <div>
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <p className="mt-2"><strong>Birthday:</strong> {person.birthday || "N/A"}</p>
          <p><strong>Gender:</strong> {person.gender === 2 ? "Male" : "Female"}</p>
          <p><strong>Birthplace:</strong> {person.place_of_birth || "N/A"}</p>
          <h2 className="text-xl font-semibold mt-4">Biography</h2>
          <p className="mt-2 text-gray-300">
            {person.biography || "No biography available."}
          </p>
        </div>
      </div>

      {/* Movies using ContentRow */}
      <div className="mt-10">
        <ContentRow title="Movies" items={movieCredits} showExplore={true} isLarge={false} />
      </div>
    </div>
  );
};

export default PersonPage;
