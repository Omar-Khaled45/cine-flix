import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "./MovieCard";

const MovieSection = ({ results = [], title, isLoading, onShowDetails }) => {
  return (
    <div className="text-foreground space-y-3 md:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold md:text-2xl">{title}</h2>
        {!isLoading && results?.length > 0 && (
          <span className="text-muted-foreground md:text-md text-sm">
            {results?.length} movies
          </span>
        )}
      </div>
      <div>
        {isLoading ? (
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-45 shrink-0 space-y-3 md:w-56">
                <Skeleton className="bg-muted h-[230px] max-w-[250px] rounded-xl md:h-[320px]" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {results.map((movie) => {
                return (
                  <CarouselItem
                    key={movie.id}
                    className="basis-auto"
                    onClick={() => onShowDetails(movie.id)}
                  >
                    <div className="w-45 md:w-56">
                      <MovieCard
                        release_date={movie.release_date}
                        rate={movie.vote_average}
                        movie_name={movie.title}
                        img_src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        movie_id={movie.id}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {!isLoading && (
              <>
                <CarouselPrevious className="hover:bg-muted hover:text-foreground left-2 cursor-pointer" />
                <CarouselNext className="hover:bg-muted hover:text-foreground right-2 cursor-pointer" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="text-muted-foreground py-5 text-center font-bold">
            No movies found
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MovieSection);
