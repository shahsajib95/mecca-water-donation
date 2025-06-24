import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  // Toggle between light and dark themes
  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggleTheme}>
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      />
      <Sun
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
