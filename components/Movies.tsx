import Link from "next/link";
import React from "react";
import Image from "next/image";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface MoviesProps {
  movies: Movie[];
}

const Movies = ({ movies }: MoviesProps) => {
  const poster = "https://image.tmdb.org/t/p/w342";

  return (
    <>
      <div className="flex flex-wrap flex-row gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[200px] text-center flex flex-col">
            <Link href={`movie/${movie.id}`}>
              <Image
                width={200}
                height={300}
                alt={movie.title}
                className="hover:scale-105 transition-transform"
                src={poster + movie.poster_path}
              ></Image>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
