import axios from "axios";
import { Movie } from "./Movies";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

const token = process.env.TMDB_TOKEN;

async function fetchCasts(id: number) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

interface PersonsProps {
  movie: Movie;
}

export default async function Persons({ movie }: PersonsProps) {
  const casts = await fetchCasts(movie.id);
  const profile = "https://image.tmdb.org/t/p/w185";

  return (
    <div className="flex gap-5 flex-row flex-wrap">
      {casts.cast.map((cast: Cast) => (
        <div
          key={cast.id}
          className="w-[180px] bg-gray-100 text-center flex flex-col justify-between rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <Link href={`/persons/${cast.id}`} className="flex-1">
            {cast.profile_path ? (
              <Image
                src={profile + cast.profile_path}
                width={180}
                height={270}
                alt={cast.name}
                className="hover:scale-105 transition-transform object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-[270px] flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </Link>

          <div className="p-2 space-y-1">
            <div className="text-sm font-medium">{cast.name}</div>
            <span className="text-xs text-gray-500 block">
              {cast.character}
            </span>

            <Button
              asChild
              variant="link"
              className="p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
            >
              <Link href={`/persons/${cast.id}`}>View Profile →</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
