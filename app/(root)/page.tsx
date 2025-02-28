import Movies from "@/components/Movies";
import axios from "axios";
import React from "react";

const token = process.env.TMDB_TOKEN;

async function fetchPouplar() {
  const res = await axios.get("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

async function fetchTrending() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/week",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

const Home = async () => {
  const poular = await fetchPouplar();
  const trending = await fetchTrending();

  return (
    <div>
      <h3 className="font-bold border-b mb-4 pb-2 text-4xl">Popular</h3>
      <Movies movies={poular.results} />

      <h3 className="font-bold border-b my-4 b-2 text-4xl">Trending</h3>
      <Movies movies={trending.results} />
    </div>
  );
};

export default Home;
