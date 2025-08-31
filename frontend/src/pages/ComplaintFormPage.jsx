
// 

import React, { useState } from "react";

const SubmitComplaintPage = () => {
  const [complaintType, setComplaintType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const studentID = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!studentID || !token) {
      setMessage("You must be logged in to submit a complaint.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/submit/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentID,
          complaintType,
          title,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Complaint submitted successfully!");
        setComplaintType("");
        setTitle("");
        setDescription("");
      } else {
        // Handle blocked account error
        if (res.status === 403) {
          setMessage("Your account is blocked. Cannot submit complaints.");
        } else {
          setMessage(data.error || "Something went wrong");
        }
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit a Complaint
        </h1>

        {message && (
          <div className={`mb-4 p-3 rounded ${
            message.includes("success") 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complaint Type Dropdown */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Type of Complaint
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              required
            >
              <option value="">Select complaint type</option>
              <option value="cafa">CAFA</option>
              <option value="library">Library</option>
              <option value="dormitory">Dormitory</option>
              <option value="registrar">Registrar</option>
              <option value="department">Department Placement</option>
              <option value="class">Class</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of your complaint"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide detailed information about your complaint..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaintPage;