import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { services } from "@/services/api";
import { Image, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({ handleShowDetails }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();

  const debouncedQuery = useDebounce(query, 500);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);

      try {
        const res = await services.searchMovie(debouncedQuery.trim());

        if (res && res.data.results && Array.isArray(res.data.results)) {
          const filteredResults = res.data.results.filter(
            (movie) =>
              movie.poster_path !== null || movie.backdrop_path !== null,
          );
          console.log(filteredResults);
          setResults(filteredResults);
          setIsOpen(true);
        } else {
          console.log("Invalid response structure: ", res);
          setResults([]);
          setIsOpen(false);
        }
      } catch (err) {
        console.log("Error fetching search Results: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [debouncedQuery]);

  return (
    <div
      className="text-muted-foreground relative mx-8 max-w-md flex-1"
      ref={searchRef}
    >
      <Search className="absolute top-1/2 left-3 -translate-y-1/2" size={15} />
      <Input
        className="bg-muted focus-visible:ring-none caret-muted-foreground placeholder:text-muted-foreground focus-visible:ring-destructive rounded-xl border-none px-10 py-5 focus-visible:ring-2"
        placeholder="Search Movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {isOpen && (
        <div className="border-border bg-background custom-scrollbar absolute top-12 max-h-72 w-full overflow-y-scroll rounded-lg border py-2">
          {isLoading ? (
            <div className="flex flex-row items-center justify-center gap-2 p-4">
              <div className="bg-destructive h-3 w-3 animate-bounce rounded-full"></div>
              <div className="bg-destructive h-3 w-3 animate-bounce rounded-full [animation-delay:-.3s]"></div>
              <div className="bg-destructive h-3 w-3 animate-bounce rounded-full [animation-delay:-.5s]"></div>
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((movie) => {
                return (
                  <li
                    key={movie.id}
                    className="hover:bg-muted/40 p-3 transition-all duration-300"
                  >
                    <button
                      className="flex w-full cursor-pointer gap-3 text-left"
                      onClick={() => {
                        setQuery("");
                        setIsOpen(false);
                        handleShowDetails(movie.id);
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
                      <div>
                        <div className="text-foreground line-clamp-1 text-sm font-semibold">
                          {movie.title}
                        </div>
                        <span className="text-xs">
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
            query && (
              <div className="text-muted-foreground p-4 text-center text-sm">
                No movies found for "{query}"
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
