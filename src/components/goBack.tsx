import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function HeaderTitle({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <button
        className="rounded-full p-2 bg-gray-100"
        onClick={() => navigate(-1)} // 👈 Go back
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="text-[24px] md:text-[40px] font-semibold ms-3">{title}</h2>
    </div>
  );
}
