import { useState } from "react";
import Header from "../components/Header";

const ProfilePage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    education: {
      class12: false,
      graduate: false,
      postGraduate: false,
      phd: false,
    },
    stream: "",
    graduationCourse: "",
    postGraduationCourse: "",
    phdCourse: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (level) => {
    setForm((prev) => ({
      ...prev,
      education: { ...prev.education, [level]: !prev.education[level] },
    }));
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4 text-center">Profile</h1>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Education Checklist */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Education</label>
            {["class12", "graduate", "postGraduate", "phd"].map((level) => (
              <div key={level} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={form.education[level]}
                    onChange={() => handleCheckboxChange(level)}
                    className="mr-2"
                  />
                  {level === "class12"
                    ? "Class 12"
                    : level === "graduate"
                    ? "Graduate"
                    : level === "postGraduate"
                    ? "Post Graduate"
                    : "PhD"}
                </label>
              </div>
            ))}
          </div>

          {/* Conditional Fields */}
          {form.education.class12 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Stream</label>
              <input
                type="text"
                name="stream"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Science, Commerce, Arts"
                value={form.stream}
                onChange={handleChange}
              />
            </div>
          )}

          {form.education.graduate && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Graduation Course
              </label>
              <input
                type="text"
                name="graduationCourse"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. B.Tech, BCA, BBA"
                value={form.graduationCourse}
                onChange={handleChange}
              />
            </div>
          )}

          {form.education.postGraduate && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Post Graduation Course
              </label>
              <input
                type="text"
                name="postGraduationCourse"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. M.Tech, MCA, MBA"
                value={form.postGraduationCourse}
                onChange={handleChange}
              />
            </div>
          )}

          {form.education.phd && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                PhD Course
              </label>
              <input
                type="text"
                name="phdCourse"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your PhD field"
                value={form.phdCourse}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Save Button */}
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
