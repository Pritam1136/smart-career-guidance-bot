import { Link } from "react-router-dom";
import Cover from "./assets/cover.jpg";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700">Career Compass</div>
        <nav className="flex gap-4 text-sm md:text-base font-medium">
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-16 max-w-6xl mx-auto flex-1">
        {/* Text content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            Welcome to Career Compass
          </h1>
          <p className="text-lg text-gray-700">
            Unlock your true potential with Career Compass — your AI-powered partner for
            personalized career guidance. Explore tailored paths, receive expert insights,
            and make confident decisions for a brighter future.
          </p>
          <Link
            to="/register"
            className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={Cover}
            alt="Career guidance"
            className="max-h-[500px] w-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
