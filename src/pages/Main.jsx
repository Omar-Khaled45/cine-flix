import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import MovieSection from "@/components/MovieSection";
import Navbar from "@/components/Navbar";
import Watchlist from "@/components/Watchlist";
import useMovies from "@/hooks/useMovies";
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

  const [isWatchlistOpened, setIsWatchlistOpened] = useState(false);

  return (
    <>
      <Navbar
        openWatchlist={() => setIsWatchlistOpened(true)}
        watchlist={watchlist}
        handleShowDetails={handleShowDetails}
      />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        {movieDetails.details && (
          <MovieDetails
            movieDetails={movieDetails.details}
            movieCredits={movieDetails.credits}
            movieVideos={movieDetails.videos}
            clearDetails={clearDetails}
            addToWatchlist={addToWatchlist}
            removeFromWatchlist={removeFromWatchlist}
            watchlist={watchlist}
          />
        )}
        <Watchlist
          isOpened={isWatchlistOpened}
          watchlist={watchlist}
          handleShowDetails={handleShowDetails}
          closeWatchlist={() => setIsWatchlistOpened(false)}
          removeFromWatchlist={removeFromWatchlist}
          clearWatchlist={clearWatchlist}
        />
        <div className="-red-200 mb-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-foreground mb-3 text-3xl font-bold md:text-5xl">
            Discover Amazing Movies
          </h1>
          <h4 className="text-muted-foreground text-sm md:w-auto md:text-lg">
            Explore trending films, build your watchlist, and never miss a great
            movie again
          </h4>
        </div>
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
              handleShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"🎬 Popular Movies"}
              results={filteredMovies.popular}
              handleShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"📅 Coming Soon"}
              results={filteredMovies.upComing}
              handleShowDetails={handleShowDetails}
            />
            <MovieSection
              isLoading={isLoading}
              title={"⭐ Top Rated"}
              results={filteredMovies.topRated}
              handleShowDetails={handleShowDetails}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
