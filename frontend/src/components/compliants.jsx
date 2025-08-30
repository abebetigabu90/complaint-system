/**
 * Complaints.jsx
 * ----------------
 * Single-file React component for the first UI of your Complaint System.
 * Features:
 *  - Fetch and show all complaints (GET /api/complaints)
 *  - Create a complaint (POST /api/complaints)
 *  - Toggle complaint status (PUT /api/complaints/:id)
 *  - Delete a complaint (DELETE /api/complaints/:id)
 *
 * How to use:
 * 1. Save this file as: frontend/src/components/Complaints.jsx
 * 2. Ensure your frontend project has Tailwind (or adjust classes to your CSS)
 * 3. Import & render in App.jsx:
 *      import Complaints from "./components/Complaints";
 *      <Complaints baseUrl={import.meta.env.VITE_API_BASE || 'http://localhost:5000'} />
 *
 * Notes:
 * - The component expects backend endpoints under /api/complaints.
 * - If your backend runs on a different host/port, pass baseUrl prop.
 * - Enable CORS on your backend (app.use(cors())).
 */

import React, { useEffect, useState } from "react";

export default function Complaints({ baseUrl = "http://localhost:3000" }) {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/complaints`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  }

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
      // add new complaint to top of the list
      setComplaints((p) => [saved, ...p]);
      setForm({ title: "", description: "" });
    } catch (err) {
      setError(err.message || "Create failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleStatus(id, newStatus) {
   setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (err) {
      setError(err.message || "Failed to update complaint");
    }
  };

  async function deleteComplaint(id) {
    setError(null);
    // simple confirmation, you can replace with modal
    if (!confirm("Delete this complaint?")) return;

    try {
      const res = await fetch(`${baseUrl}/api/complaints/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      // remove locally
      setComplaints((p) => p.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Complaint System — Dashboard</h1>

      {/* Create form */}
      <form onSubmit={createComplaint} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-medium mb-2">Create a complaint</h2>
        {error && (
          <div className="text-sm text-red-700 bg-red-100 p-2 rounded mb-2">{error}</div>
        )}

        <div className="grid grid-cols-1 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Short title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            aria-label="Complaint title"
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Describe the issue (location, what happened...)"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            aria-label="Complaint description"
            rows={4}
          />

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded shadow hover:opacity-90 bg-indigo-600 text-white"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit complaint"}
            </button>

            <button
              type="button"
              onClick={() => setForm({ title: "", description: "" })}
              className="px-3 py-2 rounded border"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={fetchComplaints}
              className="ml-auto text-sm underline"
            >
              Refresh list
            </button>
          </div>
        </div>
      </form>

      {/* Complaints list */}
      <section>
        <h2 className="text-lg font-medium mb-2">All complaints</h2>

        {loading ? (
          <div>Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="text-sm text-gray-600">No complaints found.</div>
        ) : (
          <div className="grid gap-3">
            {complaints.map((c) => (
              <article key={c._id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-700">{c.description}</p>
                  <div className="text-xs text-gray-500 mt-1">id: {c._id}</div>
                </div>

                <div className="flex items-center gap-2">
                  <select
              value={c.status || "pending"}
              onChange={(e) => toggleStatus(c._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

                  <button
                    onClick={() => deleteComplaint(c._id)}
                    className="px-3 py-1 rounded border text-sm text-red-600"
                    aria-label={`Delete ${c.title}`}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
