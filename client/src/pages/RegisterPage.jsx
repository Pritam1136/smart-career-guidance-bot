import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../Base";
import axios from "axios";

const RegisterPage = () => {
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

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (level) => {
    setForm((prev) => ({
      ...prev,
      education: { ...prev.education, [level]: !prev.education[level] },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/api/user`, form);
      alert("Registered successfully!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setForm({
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
      window.location.href = "/login";
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-blue-200"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700">
          Create Your Account
        </h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password with toggle */}
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Education Checkboxes */}
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">
            Education
          </label>
          {["class12", "graduate", "postGraduate", "phd"].map((level) => (
            <label
              key={level}
              className="flex items-center space-x-2 text-sm text-gray-700 mb-1"
            >
              <input
                type="checkbox"
                checked={form.education[level]}
                onChange={() => handleCheckboxChange(level)}
              />
              <span>
                {
                  {
                    class12: "Class 12",
                    graduate: "Graduate",
                    postGraduate: "Post Graduate",
                    phd: "PhD",
                  }[level]
                }
              </span>
            </label>
          ))}
        </div>

        {/* Conditional Fields */}
        {form.education.class12 && (
          <InputField
            label="Stream"
            name="stream"
            placeholder="e.g. Science, Commerce"
            value={form.stream}
            handleChange={handleChange}
          />
        )}
        {form.education.graduate && (
          <InputField
            label="Graduation Course"
            name="graduationCourse"
            placeholder="e.g. B.Tech, BCA"
            value={form.graduationCourse}
            handleChange={handleChange}
          />
        )}
        {form.education.postGraduate && (
          <InputField
            label="Post Graduation Course"
            name="postGraduationCourse"
            placeholder="e.g. M.Tech, MCA"
            value={form.postGraduationCourse}
            handleChange={handleChange}
          />
        )}
        {form.education.phd && (
          <InputField
            label="PhD Course"
            name="phdCourse"
            placeholder="Enter your PhD field"
            value={form.phdCourse}
            handleChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Register
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </div>

        <div className="text-center mt-2 text-sm text-gray-600">
          Are you an admin?{" "}
          <Link
            to="/adminlogin"
            className="text-purple-600 hover:underline font-medium"
          >
            Click here
          </Link>
        </div>
      </form>
    </div>
  );
};

// Reusable input field component
const InputField = ({ label, name, placeholder, value, handleChange }) => (
  <div className="mb-4">
    <label className="block text-blue-700 font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default RegisterPage;
