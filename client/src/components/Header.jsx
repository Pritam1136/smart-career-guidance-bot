import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50 px-6 py-3 flex items-center border-b">
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
