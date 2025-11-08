import { Film, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = ({
  openWatchlist,
  watchlist,
  openSearchList,
  theme,
  setTheme,
}) => {
  return (
    <header className="bg-background/80 border-border sticky top-0 z-1 border-b backdrop-blur-md">
      <div className="relative container flex h-16 items-center justify-between">
        <div className="text-foreground flex items-center">
          <div className="bg-destructive flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <Film size={20} />
          </div>
          <h1 className="ms-2 text-xl font-bold">CineFlix</h1>
        </div>
        <div className="flex items-center space-x-2">
          {theme === "dark" ? (
            <Button
              className="text-muted-foreground hover:bg-primary/60 flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-transparent duration-200"
              onClick={() => setTheme("light")}
            >
              <Sun size={18} />
            </Button>
          ) : (
            <Button
              className="text-muted-foreground hover:bg-primary/60 flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-transparent duration-200"
              onClick={() => setTheme("dark")}
            >
              <Moon size={18} />
            </Button>
          )}
          <Button
            className="bg-primary group text-muted-foreground transform cursor-pointer rounded-xl p-3 duration-300 hover:opacity-80"
            onClick={openSearchList}
          >
            <Search
              size={15}
              className="group-hover:stroke-destructive transform duration-300 group-hover:scale-110"
            />
          </Button>
          <Button
            size="lg"
            className="hover:bg-primary/80 text-foreground relative cursor-pointer text-lg"
            onClick={openWatchlist}
          >
            {watchlist.length > 0 && (
              <span className="bg-destructive absolute -top-1 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                {watchlist.length}
              </span>
            )}
            <Menu size={20} />
            <span className="hidden md:block">Watchlist</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
