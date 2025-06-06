import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-blue-600">career compass</div>
        <nav className="flex gap-4 text-sm md:text-base">
          <Link to={"/about"} className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to={"/login"} className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to={"/register"} className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 flex-1">
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Welcome to Career compass
          </h1>
          <p className="text-gray-600">
            Discover personalized career paths with our AI-powered guidance
            platform. Get expert recommendations, goal tracking, and real-time
            insights to build a future you're passionate about.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src=""
            alt="App illustration"
            className="w-full rounded shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
