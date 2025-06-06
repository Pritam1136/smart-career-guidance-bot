import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700">Career Compass</div>
        <nav className="flex gap-4 text-sm md:text-base font-medium">
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-12">
          Discover Your Path with Career Compass
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🎯 Our Mission</h2>
          <p className="leading-relaxed text-lg">
            At Career Compass, we aim to guide individuals toward the right career choices using
            modern tools, AI-driven insights, and an intuitive user experience. Whether you’re
            a student, graduate, or exploring a career switch — we help you take the next step with confidence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🚀 What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>AI-powered career recommendations tailored to your background</li>
            <li>Skill gap analysis and suggested learning paths</li>
            <li>Personalized dashboard to track your growth and goals</li>
            <li>Resources for competitive exams, internships, and job opportunities</li>
            <li>Seamless user experience with secure login and smart forms</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">⚙️ How It Works</h2>
          <div className="space-y-2 text-lg">
            <p>1. Register and fill in your academic and career interests.</p>
            <p>2. Let our intelligent system analyze and suggest paths for you.</p>
            <p>3. Explore resources, build skills, and track your progress easily.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🌟 Why Career Compass?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="bg-white p-4 rounded-xl shadow">
              ✅ Simple and intuitive interface for all age groups
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              ✅ Trusted by students and mentors across domains
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              ✅ Smart recommendations powered by AI and real-time data
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              ✅ Free to use and continuously evolving with feedback
            </div>
          </div>
        </section>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Ready to take the next step?
          </h2>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
          >
            Get Started Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
