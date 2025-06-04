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

  if (!summary) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Summary</h1>
      <p className="mb-4">Total Users: {summary.totalUsers}</p>
      <div className="space-y-4">
        {summary.userSummaries.map((user) => (
          <div key={user.userId} className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold">{user.email}</h2>
            <p>Chats: {user.chatCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewPage;
