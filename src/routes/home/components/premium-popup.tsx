import { useState } from "react";
import { CheckCircle, Gift, X } from "lucide-react"; // Icon for floating button
import { useLanguage } from "@/hooks/LanguageContext"; // Assuming you're using a language context

export default function PremiumPopup() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* Floating Button (only on mobile/tablet) */}
      <div
        className="fixed bottom-24 left-4 z-50 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#65358B] text-white shadow-lg">
          {!open ? <Gift className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Popup */}
      <div
        className={`fixed left-0 bottom-20 lg:bottom-52 w-[300px] h-[200px] transition-all z-40 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible lg:opacity-100 lg:visible"
        }`}
      >
        <div className="rounded-2xl rounded-l-none bg-gradient-to-br to-[#CFB4E4] from-[#65358B] p-6 text-white shadow-md">
          <div className="flex items-center gap-2 text-lg font-semibold">
            {t("premium")}
          </div>
          <p className="text-sm mt-1">{t("subscribeText")}</p>
          <button className="mt-3 flex items-center gap-2 rounded-full bg-[#2c0b4d] px-4 py-1 text-sm font-medium text-white">
            <CheckCircle className="w-4 h-4" />
            {t("subscribeBtn")}
          </button>
        </div>
      </div>
    </>
  );
}
