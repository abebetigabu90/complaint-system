// import React from "react";
// import ComplientForm from "../components/complientForm";

// export default function SubmitComplaintPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
//       <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Submit a Complaint
//         </h1>
//         {/* Reusing the ComplaintForm component */}
//         <ComplientForm />
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

const SubmitComplaintPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentID = localStorage.getItem("id"); // get student id from localStorage
    const token = localStorage.getItem("token"); // still need token for backend auth

    if (!studentID || !token) {
      setMessage("You must be logged in to submit a complaint.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/submit/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token for authMiddleware
        },
        body: JSON.stringify({
          studentID,
          title,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Complaint submitted successfully!");
        setTitle("");
        setDescription("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Submit Complaint</h2>
      {message && (
        <p className="mb-4 text-sm text-blue-600 font-medium">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitComplaintPage;
