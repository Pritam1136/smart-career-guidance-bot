import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { BASE_URL } from "../Base";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
        setUpdatedProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCheckboxChange = (level) => {
    setUpdatedProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: !prev.education[level],
      },
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${BASE_URL}/api/user/profile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(data);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center pt-20 px-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
          {profile ? (
            <>
              <p className="text-lg font-medium mb-2">
                Name:{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={updatedProfile.username}
                    onChange={(e) =>
                      setUpdatedProfile({
                        ...updatedProfile,
                        username: e.target.value,
                      })
                    }
                    className="border p-1 text-sm"
                  />
                ) : (
                  profile.username
                )}
              </p>

              <div className="text-left mb-4">
                <p className="font-semibold">Education:</p>
                {["class12", "graduate", "postGraduate", "phd"].map((level) => (
                  <div key={level} className="text-sm flex items-center">
                    {editMode ? (
                      <>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={updatedProfile.education[level]}
                          onChange={() => handleCheckboxChange(level)}
                        />
                        {{
                          class12: "Class 12",
                          graduate: "Graduate",
                          postGraduate: "Post Graduate",
                          phd: "PhD",
                        }[level]}
                      </>
                    ) : (
                      updatedProfile.education[level] && (
                        <p>
                          •{" "}
                          {{
                            class12: "Class 12",
                            graduate: "Graduate",
                            postGraduate: "Post Graduate",
                            phd: "PhD",
                          }[level]}
                        </p>
                      )
                    )}
                  </div>
                ))}
              </div>

              {editMode ? (
                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-2"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2"
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
