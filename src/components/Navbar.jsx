import { Film, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Navbar = ({ openWatchlist, watchlist, handleShowDetails }) => {
  return (
    <header className="bg-background/80 border-border sticky top-0 z-1 container border-b backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center text-white">
          <div className="bg-destructive flex h-8 w-8 items-center justify-center rounded-lg">
            <Film size={20} />
          </div>
          <h1 className="ms-2 text-xl font-bold">CineFlix</h1>
        </div>
        <SearchBar handleShowDetails={handleShowDetails} />
        <div>
          <Button
            variant="secondary"
            size="lg"
            className="bg-muted hover:bg-muted/80 text-foreground relative cursor-pointer text-lg"
            onClick={openWatchlist}
          >
            {watchlist.length > 0 && (
              <span className="bg-destructive text-foreground absolute -top-1 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                {watchlist.length}
              </span>
            )}
            <Menu size={20} /> Watchlist
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
