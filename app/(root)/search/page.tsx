import Movies from "@/components/Movies";
import axios from "axios";

const token = process.env.TMDB_TOKEN;

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

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  // Await the searchParams Promise to get the resolved query
  const { q } = await searchParams;

  // Handle empty search query
  if (!q) {
    return (
      <div className="p-4">
        <h3 className="font-bold border-b mb-4 pb-2">Search</h3>
        <p>Please enter a search query</p>
      </div>
    );
  }

  const searchData = await fetchSearch(q);

  return (
    <div className="p-4">
      <h3 className="font-bold border-b mb-4 pb-2 text-2xl">
        Search results for: {q}
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
