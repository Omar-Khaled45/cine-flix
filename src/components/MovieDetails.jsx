import { Card } from "@/components/ui/card";
import { Calendar, Check, Clock, Plus, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useClose from "@/hooks/useClose";
import { useEffect } from "react";

const MovieDetails = ({
  movieDetails,
  movieCredits,
  movieVideos,
  onClear,
  addToWatchlist,
  removeFromWatchlist,
  watchlist,
}) => {
  // Details
  const releaseYear = movieDetails?.release_date.split("-")[0];
  const rating = movieDetails?.vote_average.toFixed(1);
  const runTime = {
    hours: Math.floor(movieDetails?.runtime / 60),
    minutes: movieDetails?.runtime % 60,
  };

  // Credits
  const cast = movieCredits?.cast.slice(0, 7);

  // Videos
  const trailer = movieVideos?.results.find((el) => el.type === "Trailer");

  // Close movie details by pressing escape key
  useClose(onClear);

  // Change document title
  useEffect(() => {
    document.title = movieDetails?.title;

    return () => (document.title = "CineFlix");
  }, [movieDetails]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute -z-10 h-full w-full bg-black/80 backdrop-blur-md"
        onClick={onClear}
      ></div>
      <Card className="custom-scrollbar bg-card relative max-h-[90vh] w-full max-w-4xl gap-0 overflow-y-auto border-none py-0">
        <div className="card-header relative h-64 md:h-80">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`}
            alt="The Thursday Murder Club"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black"></div>
          <div className="absolute right-6 bottom-6 left-6 space-y-2">
            <h2 className="text-foreground text-3xl font-bold">
              {movieDetails?.title}
            </h2>
            <div className="text-foreground flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-300 stroke-amber-300" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{releaseYear}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>
                  {runTime.hours}h {runTime.minutes}m
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-6">
          <div className="space-y-6">
            <div>
              {watchlist.some((e) => e.id === movieDetails.id) ? (
                <Button
                  variant="addedToList"
                  onClick={() => removeFromWatchlist(movieDetails.id)}
                >
                  <Check /> In Watchlist
                </Button>
              ) : (
                <Button
                  variant="notAddedToList"
                  onClick={() => addToWatchlist(movieDetails)}
                >
                  <Plus /> Add To Watch
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="text-foreground text-xl font-semibold">
                Overview
              </h4>
              <p className="text-muted-foreground">{movieDetails?.overview}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-foreground text-xl font-semibold">Genre</h4>
              <div className="flex flex-wrap gap-2">
                {movieDetails?.genres.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="bg-muted text-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-foreground text-xl font-semibold">Trailer</h4>
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${trailer?.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-foreground text-xl font-semibold">Cast</h4>
              <div className="custom-scrollbar mb-3 flex gap-4 overflow-x-auto">
                {cast?.map((actor) => {
                  return (
                    <div
                      key={actor.id}
                      className="flex w-fit shrink-0 flex-col items-center space-y-2"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt=""
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="text-center">
                        <p className="text-foreground text-xs">{actor.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button
          className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-500 hover:bg-black/80"
          onClick={onClear}
        >
          <X />
        </button>
      </Card>
    </div>
  );
};

export default MovieDetails;
