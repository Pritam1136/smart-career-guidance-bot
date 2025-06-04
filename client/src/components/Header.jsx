import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-gray-200 text-black p-2 flex items-center px-8 fixed top-0 w-full z-50 shadow-sm">
      {/* Menu icon (only visible on small screens) */}
      <button onClick={toggleSidebar} className="text-2xl lg:hidden">
        <IoMenu size={30} />
      </button>

      {/* Push profile icon to the right */}
      <nav className="ml-auto">
        <Link to={"/profile"} className="hover:underline">
          <CgProfile size={30} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
