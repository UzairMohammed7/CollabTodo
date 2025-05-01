import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-cyan-500 text-white shadow-md">
      <Link to="/" className="text-xl font-bold">
        TaskCollab
      </Link>

      <nav className="flex gap-4 items-center">
        <Link to="/about" className="hover:underline">About Us</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}

export default Header;
