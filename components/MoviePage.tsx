import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Persons from "./Persons";

const token = process.env.TMDB_TOKEN;

export async function fetchMovie(id: number) {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

interface MoviePageProps {
  params: { id: string } | Promise<{ id: string }>;
}

const Movie = async ({ params }: MoviePageProps) => {
  // Convert id to number
  const movieId = Number((await params).id);
  const movie = await fetchMovie(movieId);

  // Construct image src conditionally
  const cover = "https://image.tmdb.org/t/p/w1280";

  return (
    <>
      <h2 className="font-bold">
        {movie.title}
        <span className="ml-1">({movie.release_date.split("-")[0]})</span>
      </h2>

      <div className="mb-4 mt-2">
        {movie.genres.map((genre: { id: number; name: string }) => (
          <Badge key={genre.id} className="mr-2" variant="outline">
            {genre.name}
          </Badge>
        ))}
      </div>

      <Image
        height={500}
        width={1280}
        alt={movie.title}
        src={cover + movie.backdrop_path}
        priority
      />
      <p className="mt-3">{movie.overview}</p>
      <div className="mt-5">
        <h3 className="font-bold border-b mb-4 pb-2">Starring</h3>
        <Persons movie={movie} />
      </div>
    </>
  );
};

export default Movie;
