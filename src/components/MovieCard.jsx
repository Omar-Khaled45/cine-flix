import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const MovieCard = ({ release_date, rate, movie_name, img_src }) => {
  const releaseYear = release_date.split("-")[0];
  const rating = rate.toFixed(1);

  return (
    <div className="h-full p-1">
      <Card className="group relative h-full cursor-pointer overflow-hidden p-0">
        <div className="text-foreground invisible absolute z-10 flex h-full w-full items-end justify-center bg-black/70 p-3 text-center font-bold opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100">
          {movie_name}
        </div>
        <CardContent className="h-full items-center justify-center p-0">
          <div className="relative h-full overflow-hidden">
            <img
              src={img_src}
              className="h-full transition-transform duration-500 group-hover:scale-110"
            />
            <Badge className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm">
              <Star size={64} className="fill-amber-300 stroke-amber-300" />
              {rating}
            </Badge>
            <Badge className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm">
              {releaseYear}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieCard;
