import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CommingSoon() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
          Coming Soon
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
          This feature is under development. Please check back soon for updates.
        </p>
        <Link to="/">
          <Button className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-full text-sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
