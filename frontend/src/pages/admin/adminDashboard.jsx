// src/pages/admin/AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const adminName = localStorage.getItem("name") || "Admin";

  // Redirect if not admin
  useEffect(() => {
    if (role !== "admin") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {adminName}! 🛠️
        </h1>
        <p className="text-gray-600 mb-6">
          This is your admin dashboard. From here, you can manage the system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/complaints"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl text-center"
          >
            Manage Complaints
          </Link>
          <Link
            to="/admin/manageStudents"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl text-center"
          >
            Manage Students
          </Link>
          <Link
            to="/admin/reports"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl text-center"
          >
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
