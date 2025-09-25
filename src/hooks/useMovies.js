import { services } from "@/services/api";
import { useEffect, useMemo, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    upComing: [],
    topRated: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState({
    details: null,
    credits: null,
    videos: null,
  });
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({ genre: null, sort: null });

  // Function for movies fetching
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [
        trendingResults,
        popularResults,
        topRatedResults,
        upComingResults,
      ] = await Promise.all([
        services.getTrendingMovies(),
        services.getPopularMovies(),
        services.getTopRated(),
        services.getUpComing(),
      ]);

      setMovies({
        trending: trendingResults.results,
        popular: popularResults.results,
        upComing: upComingResults.results,
        topRated: topRatedResults.results,
      });
    } catch (err) {
      console.log("Error fetching movies: ", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get details of movie based on the id
  const handleShowDetails = async (id) => {
    try {
      const [movieDetailsData, movieCreditsData, movieVideosData] =
        await Promise.all([
          services.getMovieDetails(id),
          services.getMovieCredits(id),
          services.getMovieVideos(id),
        ]);

      setMovieDetails({
        details: movieDetailsData.data,
        credits: movieCreditsData.data,
        videos: movieVideosData.data,
      });
    } catch (err) {
      console.log("Failed to fetch movie details: ", err);
    }
  };

  useEffect(() => {
    services.getGenre().then((res) => setGenres(res.data.genres));
    fetchMovies();
  }, []);

  // Clear the state of movie details
  const clearDetails = () => {
    setMovieDetails({
      details: null,
      credits: null,
      videos: null,
    });
  };

  // Filter movies
  const filteredMovies = useMemo(() => {
    const applyFilters = (list) => {
      let allMovies = [...list];

      // Genre filter
      if (filters.genre && filters.genre !== "all") {
        allMovies = allMovies.filter((m) =>
          m.genre_ids.includes(filters.genre),
        );
      }

      // Sorting
      if (filters.sort === "rating") {
        allMovies.sort((a, b) => b.vote_average - a.vote_average);
      } else if (filters.sort === "release") {
        allMovies.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime(),
        );
      }

      return allMovies;
    };

    return {
      trending: applyFilters(movies.trending),
      popular: applyFilters(movies.popular),
      upComing: applyFilters(movies.upComing),
      topRated: applyFilters(movies.topRated),
    };
  }, [movies, filters]);

  return {
    movies,
    setMovies,
    isLoading,
    error,
    handleShowDetails,
    movieDetails,
    clearDetails,
    genres,
    filters,
    setFilters,
    filteredMovies,
  };
};

export default useMovies;
