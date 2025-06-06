import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { BASE_URL } from "../Base";

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

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from login
        const { data } = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (level) => {
    setForm((prev) => ({
      ...prev,
      education: { ...prev.education, [level]: !prev.education[level] },
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/api/user/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
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
              disabled={!editMode}
              className="w-full p-2 border border-gray-300 rounded"
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
              disabled={!editMode}
              className="w-full p-2 border border-gray-300 rounded"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password (optional edit only) */}
          {editMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Change password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Education */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Education</label>
            {["class12", "graduate", "postGraduate", "phd"].map((level) => (
              <div key={level} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    disabled={!editMode}
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

          {/* Conditional fields */}
          {form.education.class12 && (
            <Field
              label="Stream"
              name="stream"
              value={form.stream}
              onChange={handleChange}
              disabled={!editMode}
            />
          )}
          {form.education.graduate && (
            <Field
              label="Graduation Course"
              name="graduationCourse"
              value={form.graduationCourse}
              onChange={handleChange}
              disabled={!editMode}
            />
          )}
          {form.education.postGraduate && (
            <Field
              label="Post Graduation Course"
              name="postGraduationCourse"
              value={form.postGraduationCourse}
              onChange={handleChange}
              disabled={!editMode}
            />
          )}
          {form.education.phd && (
            <Field
              label="PhD Course"
              name="phdCourse"
              value={form.phdCourse}
              onChange={handleChange}
              disabled={!editMode}
            />
          )}

          {/* Button */}
          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition mt-2"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
