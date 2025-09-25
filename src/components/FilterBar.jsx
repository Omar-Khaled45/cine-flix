import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel } from "lucide-react";

const FilterBar = ({ genres, filters, setFilters }) => {
  return (
    <div className="mb-8 flex gap-4">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Funnel size={16} />
        <span>Filter & Sort:</span>
      </div>
      <div>
        <Select
          value={filters.genre || "all"}
          onValueChange={(val) =>
            setFilters((prev) => ({ ...prev, genre: val }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => {
                return (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          value={filters.sort || "default"}
          onValueChange={(val) => {
            setFilters((prev) => ({ ...prev, sort: val }));
          }}
        >
          <SelectTrigger>
            <SelectValue>
              {filters.sort
                ? `Sort by ${filters.sort === "default" ? "Default" : filters.sort === "release" ? "Release Date" : "Rating"}`
                : `Sort by Default`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="release">Release Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
