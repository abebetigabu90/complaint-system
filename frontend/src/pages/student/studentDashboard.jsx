// src/pages/student/StudentDashboard.jsx
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const studentName = localStorage.getItem("name") || "Student"; // you can fetch real data later

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {studentName}! 🎓
        </h1>
        <p className="text-gray-600 mb-6">
          This is your student dashboard. From here, you can access all your features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/student/submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-center"
          >
            File a Complaint
          </Link>
          <Link
            to="/student/complaints"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-center"
          >
            view my complaints
          </Link>
          <Link
            to="/student/profile"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl text-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
