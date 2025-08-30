// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to the Complaint Management System
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        A simple platform for students to submit and track complaints, 
        and for admins to review and resolve them efficiently.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
