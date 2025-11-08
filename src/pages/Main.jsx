import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MovieDetails from "@/components/MovieDetails";
import MovieSection from "@/components/MovieSection";
import Navbar from "@/components/Navbar";
import SearchList from "@/components/SearchList";
import Watchlist from "@/components/Watchlist";
import useMovies from "@/hooks/useMovies";
import useTheme from "@/hooks/useTheme";
import useWatchlist from "@/hooks/useWatchlist";
import { useState } from "react";

const Main = () => {
  const {
    isLoading,
    movieDetails,
    genres,
    handleShowDetails,
    clearDetails,
    filters,
    setFilters,
    filteredMovies,
  } = useMovies();

  const { watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist } =
    useWatchlist();

  const { theme, setTheme } = useTheme();

  const [isWatchlistOpened, setIsWatchlistOpened] = useState(false);
  const [isSearchListOpened, setIsSearchListOpened] = useState(false);

  return (
    <>
      <Navbar
        openWatchlist={() => setIsWatchlistOpened(true)}
        openSearchList={() => setIsSearchListOpened(true)}
        watchlist={watchlist}
        handleShowDetails={handleShowDetails}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="py-8">
        {movieDetails.details && (
          <MovieDetails
            movieDetails={movieDetails.details}
            movieCredits={movieDetails.credits}
            movieVideos={movieDetails.videos}
            onClear={clearDetails}
            addToWatchlist={addToWatchlist}
            removeFromWatchlist={removeFromWatchlist}
            watchlist={watchlist}
          />
        )}
        <Watchlist
          isOpened={isWatchlistOpened}
          watchlist={watchlist}
          onShowDetails={handleShowDetails}
          onClose={() => setIsWatchlistOpened(false)}
          removeFromWatchlist={removeFromWatchlist}
          clearWatchlist={clearWatchlist}
        />
        <SearchList
          isOpened={isSearchListOpened}
          setIsOpened={setIsSearchListOpened}
          onShowDetails={handleShowDetails}
        />
        <Hero />
        <div className="container">
          <FilterBar
            genres={genres}
            filters={filters}
            setFilters={setFilters}
          />
          <div className="space-y-16">
            <MovieSection
              isLoading={isLoading}
              title={"🔥 Trending Now"}
              results={filteredMovies.trending}
              onShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"🎬 Popular Movies"}
              results={filteredMovies.popular}
              onShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"📅 Coming Soon"}
              results={filteredMovies.upComing}
              onShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"⭐ Top Rated"}
              results={filteredMovies.topRated}
              onShowDetails={handleShowDetails}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
