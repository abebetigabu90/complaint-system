// import React, { useEffect, useState } from "react";

// export default function ViewComplaintsPage({ baseUrl = "http://localhost:3000" }) {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   async function fetchComplaints() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${baseUrl}/api/complaints`);
//       if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
//       const data = await res.json();
//       const complaintsData = data.complaints || data;
//       setComplaints(Array.isArray(complaintsData) ? complaintsData : []);
//     } catch (err) {
//       setError(err.message || "Failed to fetch complaints");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function toggleStatus(id, newStatus) {
//     setError(null);
//     try {
//       const res = await fetch(`${baseUrl}/api/complaints/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!res.ok) throw new Error(`Update failed: ${res.status}`);
//       const data = await res.json();
//       const updatedComplaint = data.complaint || data;
//       setComplaints((prev) =>
//         prev.map((c) => (c._id === id ? updatedComplaint : c))
//       );
//     } catch (err) {
//       setError(err.message || "Failed to update complaint");
//     }
//   }

//   async function deleteComplaint(id) {
//     setError(null);
//     if (!confirm("Delete this complaint?")) return;

//     try {
//       const res = await fetch(`${baseUrl}/api/complaints/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error(`Server error ${res.status}`);
//       setComplaints((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       setError(err.message || "Delete failed");
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Error display */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {/* Complaints list */}
//       <section>
//         <h2 className="text-2xl font-bold mb-4">All Complaints</h2>

//         {loading ? (
//           <div className="text-lg text-gray-500">Loading...</div>
//         ) : complaints.length === 0 ? (
//           <div className="text-sm text-gray-600">No complaints found.</div>
//         ) : (
//           <div className="grid gap-4">
//             {complaints.map((c) => (
//               <article key={c._id} className="border rounded-lg p-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow hover:shadow-lg transition-shadow">
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-600">{c.title}</h3>
//                   <p className="text-sm text-gray-700">{c.description}</p>
//                   <div className="text-xs text-gray-500 mt-1">
//                     ID: {c._id} | Status: {c.status}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <select
//                     value={c.status || "pending"}
//                     onChange={(e) => toggleStatus(c._id, e.target.value)}
//                     className="border rounded p-2 text-sm bg-white hover:bg-gray-100 transition"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="resolved">Resolved</option>
//                   </select>

//                   <button
//                     onClick={() => deleteComplaint(c._id)}
//                     className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-500 transition"
//                     aria-label={`Delete ${c.title}`}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// src/pages/AdminComplaintsPage.jsx
// import React, { useEffect, useState } from "react";

// export default function AdminComplaintsPage() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [resolutionText, setResolutionText] = useState("");
//   const [resolving, setResolving] = useState(false);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch("http://localhost:3000/api/complaints", {
//         credentials: "include",
//       });
      
//       if (!res.ok) throw new Error("Failed to fetch complaints");
      
//       const data = await res.json();
//       setComplaints(data);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResolve = async (id) => {
//     if (!resolutionText.trim()) {
//       alert("Please describe the action taken");
//       return;
//     }

//     try {
//       setResolving(true);
//       const res = await fetch(`http://localhost:3000/api/complaints/${id}/resolve`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ actionTaken: resolutionText }),
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to resolve complaint");

//       const data = await res.json();
      
//       // Update the specific complaint
//       setComplaints(complaints.map(c => 
//         c._id === id ? { ...c, ...data.complaint } : c
//       ));
      
//       setSelectedComplaint(null);
//       setResolutionText("");
//       alert("Complaint resolved successfully!");
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     } finally {
//       setResolving(false);
//     }
//   };

//   if (loading) return (
//     <div className="p-6 flex justify-center items-center min-h-64">
//       <div className="text-lg text-gray-600">Loading complaints...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="p-6">
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//         <strong>Error: </strong>{error}
//       </div>
//       <button
//         onClick={fetchComplaints}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Try Again
//       </button>
//     </div>
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Complaint Management</h1>
//         <p className="text-gray-600">Manage and resolve student complaints</p>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">Total Complaints</h3>
//           <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">new submitted complaints</h3>
//           <p className="text-2xl font-bold text-yellow-600">
//             {complaints.filter(c => c.status === 'submitted').length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">In Progress</h3>
//           <p className="text-2xl font-bold text-blue-600">
//             {complaints.filter(c => c.status === 'in progress').length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">Resolved pending confirmation</h3>
//           <p className="text-2xl font-bold text-green-600">
//             {complaints.filter(c => c.status === 'pending_confirmation').length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">Re opened complaints</h3>
//           <p className="text-2xl font-bold text-green-600">
//             {complaints.filter(c => c.status === 'reopened').length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <h3 className="text-sm text-gray-500">solved and closed complaints</h3>
//           <p className="text-2xl font-bold text-green-600">
//             {complaints.filter(c => c.status === 'closed').length}
//           </p>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="bg-white rounded-lg shadow-sm border">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">All Complaints</h2>
//         </div>

//         {complaints.length === 0 ? (
//           <div className="p-12 text-center">
//             <div className="text-gray-400 text-6xl mb-4">📝</div>
//             <h3 className="text-lg font-medium text-gray-600 mb-2">No complaints found</h3>
//             <p className="text-gray-500">There are no complaints to display at this time.</p>
//           </div>
//         ) : (
//           <div className="divide-y">
//             {complaints.map((complaint) => (
//               <div key={complaint._id} className="p-6 hover:bg-gray-50 transition-colors">
//                 {/* Complaint Header */}
//                 <div key={complaint._id} className="bg-white rounded-lg border border-gray-200 p-6 transition-colors hover:bg-gray-50">
//               {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     {/* Complaint Type */}
//                     <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full mb-2">
//                       {complaint.complaintType || 'General'}
//                     </span>
                    
//                     {/* Title */}
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                       {complaint.title}
//                     </h3>
                    
//                     {/* ID */}
//                     <p className="text-gray-500 text-sm">
//                       ID: {complaint._id.slice(-6)}
//                     </p>
//                   </div>
                  
//                   {/* Status */}
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     complaint.status === 'resolved-pending-confirmation' ? 'bg-green-100 text-green-800' :
//                     complaint.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
//                     'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {complaint.status?.replace(/_/g, ' ') || 'Unknown'}
//                   </span>
//                 </div>
//               </div>

//                 {/* Complaint Content */}
//                 <div className="mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
//                   <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
//                     {complaint.description}
//                   </p>
//                 </div>

//                 {/* Metadata */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
//                   <div>
//                     <span className="text-gray-500">Created: </span>
//                     <span className="font-medium">
//                       {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                   {complaint.resolvedAt && (
//                     <div>
//                       <span className="text-gray-500">Resolved: </span>
//                       <span className="font-medium">
//                         {new Date(complaint.resolvedAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   )}
//                   {complaint.reOpenedCount > 0 && (
//                     <div>
//                       <span className="text-gray-500">Re-opened: </span>
//                       <span className="font-medium text-orange-600">
//                         {complaint.reOpenedCount} time(s)
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Resolution Details */}
//                 {complaint.resolvedAction && (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
//                     <h4 className="text-sm font-medium text-green-800 mb-2">Resolution Details:</h4>
//                     <p className="text-green-700">{complaint.resolvedAction}</p>
//                     {complaint.resolvedBy && (
//                       <p className="text-xs text-green-600 mt-2">
//                         Resolved by: {complaint.resolvedBy}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-wrap gap-3">
//                   {['submitted', 'in progress','reopened'].includes(complaint.status) && (
//                     <button
//                       onClick={() => setSelectedComplaint(
//                         selectedComplaint === complaint._id ? null : complaint._id
//                       )}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       {selectedComplaint === complaint._id ? 'Cancel' : 'Resolve Complaint'}
//                     </button>
//                   )}

//                   {selectedComplaint === complaint._id && (
//                     <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Resolution Details:
//                       </label>
//                       <textarea
//                         value={resolutionText}
//                         onChange={(e) => setResolutionText(e.target.value)}
//                         placeholder="Describe the action taken to resolve this complaint..."
//                         className="w-full border border-gray-300 rounded-lg p-3 mb-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         disabled={resolving}
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleResolve(complaint._id)}
//                           disabled={resolving || !resolutionText.trim()}
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
//                         >
//                           {resolving ? 'Submitting...' : 'Submit Resolution'}
//                         </button>
//                         <button
//                           onClick={() => setSelectedComplaint(null)}
//                           className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionText, setResolutionText] = useState("");
  const [resolving, setResolving] = useState(false);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/api/complaints", {
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to fetch complaints");
      
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    if (!resolutionText.trim()) {
      alert("Please describe the action taken");
      return;
    }

    try {
      setResolving(true);
      const res = await fetch(`http://localhost:3000/api/complaints/${id}/resolve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionTaken: resolutionText }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to resolve complaint");

      const data = await res.json();
      setComplaints(complaints.map(c => 
        c._id === id ? { ...c, ...data.complaint } : c
      ));
      
      setSelectedComplaint(null);
      setResolutionText("");
      alert("Complaint resolved successfully!");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setResolving(false);
    }
  };

  const filteredComplaints = complaints.filter(c =>
    c.complaintType?.toLowerCase().includes(search.toLowerCase()) ||
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="p-6 flex justify-center items-center min-h-64">
      <div className="text-lg text-gray-600">Loading complaints...</div>
    </div>
  );

  if (error) return (
    <div className="p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error: </strong>{error}
      </div>
      <button
        onClick={fetchComplaints}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Complaint Management</h1>
        <p className="text-gray-600">Manage and resolve student complaints</p>
      </div>
      
      {/* Search Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Complaints
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by type, title, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </div>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm text-gray-500">Total Complaints</h3>
          <p className="text-2xl font-bold text-gray-800">{filteredComplaints.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm text-gray-500">New Submitted</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {filteredComplaints.filter(c => c.status === 'submitted').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">
            {filteredComplaints.filter(c => c.status === 'inprogress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm text-gray-500">Pending Confirmation</h3>
          <p className="text-2xl font-bold text-green-600">
            {filteredComplaints.filter(c => c.status === 'pending_confirmation').length}
          </p>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {search ? "Search Results" : "All Complaints"}
          </h2>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">
              {complaints.length === 0 ? "📝" : "🔍"}
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {complaints.length === 0 ? "No complaints found" : "No matching complaints found"}
            </h3>
            <p className="text-gray-500">
              {complaints.length === 0 
                ? "There are no complaints to display at this time." 
                : "Try adjusting your search criteria."}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredComplaints.map((complaint) => (
              <div key={complaint._id} className="p-6 hover:bg-gray-50 transition-colors">
                {/* Complaint Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full mb-2">
                      {complaint.complaintType || 'General'}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {complaint.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ID: {complaint._id.slice(-6)}
                    </p>
                  </div>
                  
                  {/* Status */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === 'pending_confirmation' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'inprogress' ? 'bg-blue-100 text-blue-800' :
                    complaint.status === 'reopened' ? 'bg-orange-100 text-orange-800' :
                    complaint.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.status?.replace(/_/g, ' ') || 'Unknown'}
                  </span>
                </div>

                {/* Complaint Content */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {complaint.description}
                  </p>
                </div>

                {/* Metadata - FIXED: Added missing closing div */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created: </span>
                    <span className="font-medium">
                      {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  {complaint.resolvedAt && (
                    <div>
                      <span className="text-gray-500">Resolved: </span>
                      <span className="font-medium">
                        {new Date(complaint.resolvedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {complaint.reOpenedCount >= 0 && (
                    <div>
                      <span className="text-gray-500">Re-opened: </span>
                      <span className="font-medium text-orange-600">
                        {complaint.reOpenedCount} time(s)
                      </span>
                    </div>
                  )}

                </div> {/* ← This closing div was missing */}

                {/* Reopen Reason */}
                {complaint.reOpenedReason && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-orange-800 mb-2">Reopen Reason:</h4>
                    <p className="text-orange-700">{complaint.reOpenedReason}</p>
                    {complaint.reOpenedCount >= 0 && (
                      <p className="text-xs text-orange-600 mt-2">
                        Reopened {complaint.reOpenedCount} time(s)
                      </p>
                    )}
                  </div>
                )}

                {/* Resolution Details */}
                {complaint.resolvedAction && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Resolution Details:</h4>
                    <p className="text-green-700">{complaint.resolvedAction}</p>
                    {complaint.resolvedBy && (
                      <p className="text-xs text-green-600 mt-2">
                        Resolved by: {complaint.resolvedBy}
                      </p>
                    )}
                    {complaint.resolvedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Resolved on: {new Date(complaint.resolvedAt).toLocaleDateString()}
                      </p>
                    )}
                    {complaint.reSolvedCount > 0 && (
                      <p className="text-xs text-orange-600 mt-2">
                        re solved {complaint.reSolvedCount} time(s)
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {['submitted', 'inprogress', 'reopened'].includes(complaint.status) && (
                    <button
                      onClick={() => setSelectedComplaint(
                        selectedComplaint === complaint._id ? null : complaint._id
                      )}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      {selectedComplaint === complaint._id ? 'Cancel' : 'Resolve Complaint'}
                    </button>
                  )}

                  {selectedComplaint === complaint._id && (
                    <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resolution Details:
                      </label>
                      <textarea
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                        placeholder="Describe the action taken to resolve this complaint..."
                        className="w-full border border-gray-300 rounded-lg p-3 mb-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={resolving}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolve(complaint._id)}
                          disabled={resolving || !resolutionText.trim()}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          {resolving ? 'Submitting...' : 'Submit Resolution'}
                        </button>
                        <button
                          onClick={() => setSelectedComplaint(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}