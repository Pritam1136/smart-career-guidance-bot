import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Base";

const AdminViewPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/admin/summary`);
        setSummary(data);
      } catch (error) {
        console.error("Failed to load admin summary:", error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <p className="text-lg text-blue-600 font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Total Users:{" "}
          <span className="font-semibold text-blue-600">
            {summary.totalUsers}
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summary.userSummaries.map((user) => (
            <div
              key={user.userId}
              className="bg-gradient-to-r from-white to-blue-50 p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.email}
              </h2>
              <p className="text-sm text-gray-600">Chats: {user.chatCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminViewPage;
