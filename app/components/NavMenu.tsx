import { Link } from "react-router-dom";

export function NavMenu() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">My App</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/characters" className="hover:text-gray-300">Characters</Link>
          <Link to="/demo" className="hover:text-gray-300">Demo</Link>
        </div>
      </div>
    </nav>
  );
} 