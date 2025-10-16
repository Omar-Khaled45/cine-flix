import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const MovieCard = ({ release_date, rate, movie_name, img_src }) => {
  const releaseYear = release_date.split("-")[0];
  const rating = rate.toFixed(1);

  return (
    <div className="p-1">
      <Card className="group relative cursor-pointer overflow-hidden p-0">
        <div className="dark:text-foreground invisible absolute z-10 flex h-full w-full items-end justify-center bg-black/70 p-3 text-center font-bold text-white opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100">
          {movie_name}
        </div>
        <CardContent className="items-center justify-center p-0">
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={img_src}
              alt={movie_name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <Badge className="dark:text-foreground absolute top-2 right-2 bg-black/70 text-white backdrop-blur-sm">
              <Star size={64} className="fill-amber-300 stroke-amber-300" />
              {rating}
            </Badge>
            <Badge className="dark:text-foreground absolute top-2 left-2 bg-black/70 text-white backdrop-blur-sm">
              {releaseYear}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieCard;
