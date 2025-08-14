import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-[100vw] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 px-5">
            <Dumbbell className="h-[50px] w-[50px] text-red-500" />
            <span className="font-bold text-4xl">PowerFitGym</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-end w-full px-20">
            <div className="flex items-center space-x-8 gap-2">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About Us" />
              <NavLink to="/contact" label="Contact" />
              <NavLink to="/members" label="Members" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white flex flex-col py-3">
          <NavLink to="/" label="Home" mobile />
          <NavLink to="/about" label="About Us" mobile />
          <NavLink to="/contact" label="Contact" mobile />
          <NavLink to="/members" label="Members" mobile />
        </div>
      )}
    </nav>
  );
}

/* Reusable NavLink Component */
const NavLink = ({ to, label, mobile }) => (
  <Link
    to={to}
    className={`${mobile ? "block px-3 py-2 text-center" : "hover:text-red-500 transition-colors font-bold text-3xl"
      }`}
  >
    {label}
  </Link>
);