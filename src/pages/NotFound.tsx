
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black text-white px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-2xl font-medium mb-6">This page isn't in our library</p>
        <p className="text-white/70 mb-8">
          The page you're looking for can't be found. It may have been moved, 
          or it never existed in the first place.
        </p>
        <Link to="/">
          <button className="px-6 py-3 bg-white text-black rounded-sm inline-flex items-center font-medium hover:bg-white/90 transition-colors">
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
