import { Search, X, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import useDebounce from "@/hooks/useDebounce";
import { services } from "@/services/api";

const SearchList = ({ isOpened, setIsOpened, handleShowDetails }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const closeMenu = () => {
    setIsOpened(false);
    setResults([]);
    setQuery("");
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setNoResults(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setNoResults(false);

      try {
        const res = await services.searchMovie(debouncedQuery.trim());

        if (res && res.results && Array.isArray(res.results)) {
          const filteredResults = res.results.filter(
            (movie) =>
              movie.poster_path !== null || movie.backdrop_path !== null,
          );

          setResults(filteredResults);
          setNoResults(filteredResults.length === 0);
        } else {
          console.log("Invalid response structure: ", res);
          setResults([]);
        }
      } catch (e) {
        console.log("Error Searching Movie", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm transition-all duration-400 ${!isOpened ? "invisible opacity-0" : "visible opacity-100"}`}
        onClick={closeMenu}
      ></div>

      {/* Sidebar */}
      <div
        className={`bg-card border-border fixed top-0 left-0 z-20 flex h-screen w-[320px] flex-col border-1 transition-all duration-400 md:w-[400px] ${isOpened ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="border-border space-y-6 border-b-1 p-6">
          <div className="text-muted-foreground flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase md:text-base">
              What are you looking for?
            </h2>
            <X
              className="transform cursor-pointer duration-300 hover:stroke-white"
              onClick={closeMenu}
            />
          </div>
          <div className="text-muted-foreground relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2"
              size={15}
            />
            <Input
              className="bg-muted focus-visible:ring-none caret-muted-foreground placeholder:text-muted-foreground focus-visible:ring-destructive md:text-md rounded-xl border-none px-8 text-sm focus-visible:ring-2 md:px-10"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            {query && (
              <X
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer duration-300 hover:stroke-white"
                size={20}
                onClick={() => setQuery("")}
              />
            )}
          </div>
          {query && results.length > 0 && (
            <p className="text-muted-foreground text-sm">
              {results.length} movies found
            </p>
          )}
        </div>

        {/* Content */}
        {query && (
          <div className="custom-scrollbar overflow-y-scroll p-4">
            {isLoading ? (
              <div className="flex flex-row items-center justify-center gap-2 p-4">
                <div className="bg-destructive h-3 w-3 animate-bounce rounded-full"></div>
                <div className="bg-destructive h-3 w-3 animate-bounce rounded-full [animation-delay:-.3s]"></div>
                <div className="bg-destructive h-3 w-3 animate-bounce rounded-full [animation-delay:-.5s]"></div>
              </div>
            ) : results.length > 0 ? (
              <ul className="space-y-3">
                {results.map((movie) => {
                  return (
                    <li
                      key={movie.id}
                      className="hover:bg-muted/40 p-3 transition-all duration-300"
                    >
                      <button
                        className="flex w-full cursor-pointer gap-3 text-left"
                        onClick={() => {
                          handleShowDetails(movie.id);
                          setQuery("");
                          setIsOpened(false);
                        }}
                      >
                        <div className="shrink-0">
                          {movie.poster_path ? (
                            <img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                  : "/placeholder.png"
                              }
                              alt={movie.title}
                              className="w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="bg-foreground/90 flex h-[60px] w-10 items-center justify-center rounded-lg border border-black">
                              <Image />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-foreground line-clamp-1 text-sm font-semibold">
                            {movie.title}
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {movie.release_date
                              ? new Date(movie.release_date).getFullYear()
                              : "N/A"}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              noResults && (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  No movies found for "{query}"
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchList;
