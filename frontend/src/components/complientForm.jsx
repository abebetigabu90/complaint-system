import React, { useState } from 'react';

const ComplientForm = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Define your API base URL
  const baseUrl = "http://localhost:3000"; // Update this with your actual API URL

  async function createComplaint(e) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) return setError("Title is required");

    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/api/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server error ${res.status}`);
      }
      
      const saved = await res.json();
      // Reset form after successful submission
      setForm({ title: "", description: "" });
      alert("Complaint submitted successfully!");
    } catch (err) {
      setError(err.message || "Create failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Create form */}
      <form onSubmit={createComplaint} className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Create a complaint</h2>
        
        {error && (
          <div className="text-sm text-red-700 bg-red-100 p-3 rounded mb-4">{error}</div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Short title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              aria-label="Complaint title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the issue (location, what happened...)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              aria-label="Complaint description"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit complaint"}
            </button>

            <button
              type="button"
              onClick={() => setForm({ title: "", description: "" })}
              className="px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComplientForm;