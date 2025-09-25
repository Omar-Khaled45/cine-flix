import { useState } from "react";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    const newItem = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rate: movie?.vote_average.toFixed(1),
      release_year: movie.release_date.split("-")[0],
      overview: movie.overview,
    };

    setWatchlist((prev) => [...prev, newItem]);
  };

  const removeFromWatchlist = (id) => {
    const newList = watchlist.filter((movie) => movie.id !== id);

    setWatchlist(newList);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist };
};

export default useWatchlist;
