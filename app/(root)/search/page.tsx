import Movies from "@/components/Movies"; // Ensure this is the correct component
import axios from "axios";

const token = process.env.TMDB_TOKEN;

interface SearchProps {
  searchParams: {
    q?: string;
  };
}

async function fetchSearch(query: string) {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: encodeURIComponent(query),
      },
    });
    return res.data;
  } catch (error) {
    console.error("Search error:", error);
    return { results: [] };
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  // Handle empty search query
  if (!searchParams.q) {
    return (
      <div className="p-4">
        <h3 className="font-bold border-b mb-4 pb-2">Search</h3>
        <p>Please enter a search query</p>
      </div>
    );
  }

  const searchData = await fetchSearch(searchParams.q);

  return (
    <div className="p-4">
      <h3 className="font-bold border-b mb-4 pb-2">
        Search results for: {searchParams.q}
      </h3>

      {searchData.results?.length > 0 ? (
        <Movies movies={searchData.results} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
