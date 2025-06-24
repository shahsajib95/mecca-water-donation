import { Bell, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Link } from "react-router-dom";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4 mb-[24px] md:mb-[40px] px-4 md:px-0">
      {/* Menu + Logo */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 bg-gray-400 rounded-full text-white">
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="h-8" />
        </Link>
      </div>

      {/* Right-side Controls */}
      <div className="flex items-center gap-1 md:gap-2 ml-auto">
        {/* Notification */}
        <button className="p-2 bg-gray-400 rounded-full text-white">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Language */}
        <Select
          value={language}
          onValueChange={(val) => toggleLanguage(val as "en" | "ar")}
        >
          <SelectTrigger className="w-[70px] md:w-[80px] text-sm border rounded-full">
            <SelectValue placeholder="Lang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">Eng</SelectItem>
            <SelectItem value="ar">عربى</SelectItem>
          </SelectContent>
        </Select>

        {/* Logout */}
        <Button className="text-sm  items-center gap-1 border rounded-full bg-purple-900 px-4 py-2 md:px-5 md:py-2 hidden sm:flex">
          <span>{t("logout")}</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
