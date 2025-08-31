// // src/pages/student/Complaints.jsx
// import { useEffect, useState } from "react";

// const Complaints = () => {
//   const [complaints, setComplaints] = useState([]);
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const fetchComplaints = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/api/complaints/mine", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = await res.json();
  //       setComplaints(data.complaints);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchComplaints();
  // }, [token]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
//         <h2 className="text-xl font-bold mb-4">My Complaints</h2>

//         {complaints.length === 0 && <p>No complaints submitted yet.</p>}

//         <ul className="space-y-4">
//           {complaints.map((c) => (
//             <li key={c._id} className="border p-4 rounded-xl">
//               <h3 className="font-bold">{c.title}</h3>
//               <p>{c.description}</p>
//               <p className="text-sm text-gray-500">Status: {c.status}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Complaints;


// src/pages/StudentComplaintsPage.jsx
import React, { useEffect, useState } from "react";
import {getStatusDisplay,getStatusDescription} from '../../helpers/status'

export default function StudentComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reopenReason, setReopenReason] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  const token = localStorage.getItem("token");
  const API_BASE = "http://localhost:3000"; // 👈 use consistent port

  // Fetch complaints for logged-in student
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/complaints/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

          if (res.status === 403) {
          const errorData = await res.json();
          setBlocked(true);
          setBlockedReason(errorData.reason || "Account blocked by administrator");
          setComplaints([]);
          return;
        }

        const data = await res.json();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComplaints();
  }, [token]);

  // Confirm complaint resolved
  const handleConfirm = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/complaints/${id}/confirm`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);

      setComplaints(complaints.map((c) => (c._id === id ? data.complaint : c)));
    } catch (err) {
      console.error(err);
    }
  };

  // Reopen complaint with reason
  const handleReopen = async (id) => {
    if (!reopenReason.trim()) {
      alert("Please provide a reason before reopening.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/complaints/${id}/reopen`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: reopenReason }),
      });
      const data = await res.json();
      alert(data.message);

      setComplaints(complaints.map((c) => (c._id === id ? data.complaint : c)));
      setSelectedComplaint(null);
      setReopenReason("");
    } catch (err) {
      console.error(err);
    }
  };
 if (blocked) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Account Blocked</h2>
          <p className="text-red-700 mb-4">{blockedReason}</p>
          <p className="text-gray-600">
            You cannot access your complaints while your account is blocked.
          </p>
          <div className="mt-4 p-4 bg-red-100 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Contact support:</strong> support@yourdomain.com
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Complaints</h1>

      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-gray-700">{c.description}</p>
            <p className="text-sm text-gray-500">Status: {getStatusDisplay(c.status)}</p>

            {/* Show resolution details */}
            {c.resolvedAction && (
              <div className="mt-2 p-2 border rounded bg-gray-50">
                <p className="text-sm">
                  <strong>Action Taken:</strong> {c.resolvedAction}
                </p>
                <p className="text-xs text-gray-500">
                  Resolved At: {new Date(c.resolvedAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* Show reopen reason if exists */}
            {c.reopenReason && (
              <p className="text-sm text-red-600 mt-2">
                <strong>Reopen Reason:</strong> {c.reopenReason}
              </p>
            )}
            {/* Show reopened count */}
            {c.reOpenedCount > 0 && (
                    <div>
                      <span className="text-gray-500">Re-opened: </span>
                      <span className="font-medium text-orange-600">
                        {c.reOpenedCount} time(s)
                      </span>
                    </div>
                  )}
            {/* Student options only if waiting for confirmation */}
            {c.status === "pending_confirmation" && (
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleConfirm(c._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Confirm Resolved
                </button>

                {selectedComplaint === c._id ? (
                  <div className="mt-2">
                    <textarea
                      value={reopenReason}
                      onChange={(e) => setReopenReason(e.target.value)}
                      placeholder="Explain why you are reopening..."
                      className="w-full border rounded p-2 mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReopen(c._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                      >
                        Submit Reopen
                      </button>
                      <button
                        onClick={() => setSelectedComplaint(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedComplaint(c._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Reopen
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
