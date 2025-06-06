import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { BASE_URL } from "../Base";

// Reusable Input Field Component
const Field = ({ label, name, value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-sm"
    />
  </div>
);

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
        const token = localStorage.getItem("token");
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center pt-20 px-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

          {/* Username */}
          <Field
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!editMode}
          />

          {/* Email */}
          <Field
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editMode}
          />

          {/* Password */}
          {editMode && (
            <Field
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={false}
            />
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
                  {
                    {
                      class12: "Class 12",
                      graduate: "Graduate",
                      postGraduate: "Post Graduate",
                      phd: "PhD",
                    }[level]
                  }
                </label>
              </div>
            ))}
          </div>

          {/* Conditional Education Fields */}
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

          {/* Edit/Save Button */}
          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
