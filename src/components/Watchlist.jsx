import { Star, Trash2, X } from "lucide-react";

const Watchlist = ({
  isOpened,
  closeWatchlist,
  watchlist,
  removeFromWatchlist,
  clearWatchlist,
  handleShowDetails,
}) => {
  const renderList = watchlist.map((movie) => (
    <li
      key={movie.id}
      className="bg-muted md:bg-card md:hover:bg-muted group flex gap-3 rounded-lg p-2 md:transition-all md:duration-300"
    >
      <button
        className="flex cursor-pointer gap-3 text-left"
        onClick={() => handleShowDetails(movie.id)}
      >
        <div className="shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            alt="The Thursday Murder Club"
            className="h-full w-16 rounded-lg object-cover"
          />
        </div>
        <div className="space-y-2">
          <h5 className="text-foreground font-semibold">{movie.title}</h5>
          <div className="text-muted-foreground flex gap-1 text-xs">
            <span className="flex items-center gap-2">
              <Star size={12} className="fill-amber-300 stroke-amber-300" />
              {movie.rate}
            </span>
            <span>•</span>
            <span>{movie.release_year}</span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-xs">
            {movie.overview}
          </p>
        </div>
      </button>
      <button
        className="md:hover:bg-destructive/20 md:hover:text-destructive/70 text-destructive flex cursor-pointer items-center rounded-lg px-1 transition-all duration-300 md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100"
        onClick={() => removeFromWatchlist(movie.id)}
      >
        <Trash2 size={20} />
      </button>
    </li>
  ));

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm transition-all duration-400 ${!isOpened ? "invisible opacity-0" : "visible opacity-100"}`}
        onClick={closeWatchlist}
      ></div>

      {/* Sidebar */}
      <div
        className={`bg-card border-border fixed top-0 z-20 min-h-screen w-[320px] border-1 transition-all duration-400 md:w-[400px] ${isOpened ? "right-0" : "-right-[400px]"}`}
      >
        {/* Header */}
        <div className="border-border space-y-2 border-b p-6">
          <div className="flex items-center justify-between">
            <h4 className="text-foreground text-xl font-bold">My Watchlist</h4>
            <button
              className="text-foreground transition-color hover:bg-accent flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg duration-300"
              onClick={closeWatchlist}
            >
              <X />
            </button>
          </div>
          <div className="text-muted-foreground text-sm">
            {watchlist.length} movies
          </div>
        </div>
        {/* Clear button */}
        {watchlist.length > 0 && (
          <button
            className="border-border text-destructive md:hover:text-destructive/50 cursor-pointer border-b p-3 text-left text-sm md:transition-all md:duration-300"
            onClick={clearWatchlist}
          >
            Clear All Movies
          </button>
        )}

        {/* Content */}
        <div className="p-6">
          {watchlist.length === 0 ? (
            <div className="space-y-3 text-center">
              <div className="text-muted-foreground bg-muted mx-auto flex h-14 w-14 items-center justify-center rounded-full text-3xl">
                <Star />
              </div>
              <p className="text-foreground font-semibold">
                Your watchlist is empty
              </p>
              <p className="text-muted-foreground text-sm">
                Add movies to your watchlist to keep track of what you want to
                watch
              </p>
            </div>
          ) : (
            <ul className="space-y-5">{renderList}</ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Watchlist;
