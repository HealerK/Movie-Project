import Movies from "@/components/Movies";
import axios from "axios";
import React from "react";

const token = process.env.TMDB_TOKEN;

async function fetchMovies(id: number) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

const Home = async ({ params }: { params: Promise<{ id: number }> }) => {
  const genresId = (await params).id;
  const movies = await fetchMovies(genresId);
  return (
    <>
      <h3 className="font-bold border-b mb-4 pb-2">{movies.name}</h3>
      <Movies movies={movies.results} />
    </>
  );
};

export default Home;
