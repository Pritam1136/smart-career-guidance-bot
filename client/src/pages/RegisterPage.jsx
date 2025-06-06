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
      const { data } = await axios.post(`${BASE_URL}/api/user`, {
        username: form.username,
        email: form.email,
        password: form.password,
        education: form.education,
        stream: form.stream,
        graduationCourse: form.graduationCourse,
        postGraduationCourse: form.postGraduationCourse,
        phdCourse: form.phdCourse,
      });

      alert("Registered successfully!");
      localStorage.setItem("userInfo", JSON.stringify(data)); // store user data if needed

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
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="e.g. M.Tech, MCA, MBA"
              value={form.postGraduationCourse}
              onChange={handleChange}
            />
          </div>
        )}

        {form.education.phd && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">PhD Course</label>
            <input
              type="text"
              name="phdCourse"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your PhD field"
              value={form.phdCourse}
              onChange={handleChange}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          Are you an admin?{" "}
          <Link to="/adminlogin" className="text-blue-600 hover:underline">
            Click here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
