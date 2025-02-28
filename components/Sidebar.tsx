"use client"; // Convert to client component

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import clsx from "clsx"; // Install clsx for class concatenation
import axios from "axios";

interface Genre {
  id: number;
  name: string;
}

const Sidebar = ({ genres }: { genres: Genre[] }) => {
  const pathname = usePathname();
  const params = useParams();

  // Get active genre ID from URL params
  const activeGenreId = params.id ? Number(params.id) : null;
  // Check if we're on the "All Movies" page
  const isAllMovies = pathname === "/";

  return (
    <aside className="w-[220px] flex flex-col gap-1">
      <Button
        className={clsx(
          "justify-start transition-colors",
          isAllMovies
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-foreground hover:bg-muted/80"
        )}
        asChild
      >
        <Link href="/">All Movies</Link>
      </Button>

      {genres.map((genre) => {
        const isActive = activeGenreId === genre.id;
        return (
          <Button
            key={genre.id}
            className={clsx(
              "justify-start transition-colors",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
            variant={isActive ? "default" : "outline"}
            asChild
          >
            <Link href={`/genres/${genre.name}/${genre.id}`}>{genre.name}</Link>
          </Button>
        );
      })}
    </aside>
  );
};

// Server component to fetch genres
export async function GenreSidebar() {
  const token = process.env.TMDB_TOKEN;

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return { genres: [] };
    }
  };

  const { genres } = await fetchGenres();

  return <Sidebar genres={genres} />;
}

export default GenreSidebar;
