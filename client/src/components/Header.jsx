import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Logo from "../assets/Logo.png";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/profile") {
      navigate(-1); // Go back only if on /profile
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50 px-6 py-3 flex items-center border-b">
      {/* Logo */}
      <button onClick={handleLogoClick} className="mr-4 focus:outline-none">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
      </button>

      {/* Menu icon for mobile */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 lg:hidden focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <IoMenu size={28} />
      </button>

      {/* Right side profile icon */}
      <nav className="ml-auto">
        <Link
          to="/profile"
          className="text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Profile"
        >
          <CgProfile size={28} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
