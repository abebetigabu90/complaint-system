import React, { useEffect, useState } from "react";

export default function AdminReportsPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalComplaints: 0,
    byStatus: {},
    byType: {},
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load reports:", err);
      }
    };

    fetchReports();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Students</h2>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Complaints</h2>
          <p className="text-2xl font-bold">{stats.totalComplaints}</p>
        </div>
      </div>

      {/* Complaints by Status */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Complaints by Status</h2>
        <ul className="list-disc ml-6 text-gray-700">
          {Object.entries(stats.byStatus).map(([status, count]) => (
            <li key={status}>
              {status}: <span className="font-bold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Complaints by Type */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Complaints by Type</h2>
        <ul className="list-disc ml-6 text-gray-700">
          {Object.entries(stats.byType).map(([type, count]) => (
            <li key={type}>
              {type}: <span className="font-bold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// export default function AdminReportsPage() {
//   const [complaints, setComplaints] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/reports", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setComplaints(data);
//       } catch (err) {
//         console.error("Error fetching complaints:", err);
//       }
//     };
//     fetchComplaints();
//   }, [token]);

//   // 🔹 Calculate stats
//   const total = complaints.length;
//   const resolved = complaints.filter(c => c.status === "resolved").length;
//   const pending = complaints.filter(c => c.status === "pending_confirmation").length;
//   const reopened = complaints.filter(c => c.status === "reopened").length;
//   const closed = complaints.filter(c => c.status === "closed").length;
//   // 🔹 Data for Pie Chart (by status)
//   const statusData = [
//     { name: "Resolved", value: resolved },
//     { name: "Pending", value: pending },
//     { name: "Reopened", value: reopened },
//     {name: "closed", value: closed },
//   ];

//   const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

//   // 🔹 Data for Bar Chart (by complaint type)
//   const typeCount = complaints.reduce((acc, c) => {
//     acc[c.complaintType] = (acc[c.complaintType] || 0) + 1;
//     return acc;
//   }, {});
//   const typeData = Object.keys(typeCount).map(type => ({ type, count: typeCount[type] }));

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Complaint Reports</h2>

//       {/* 🔹 Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-green-100 p-4 rounded-lg shadow text-center">
//           <p className="text-lg font-semibold text-green-700">Resolved</p>
//           <p className="text-2xl font-bold">{resolved}</p>
//         </div>
//         <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
//           <p className="text-lg font-semibold text-yellow-700">Pending</p>
//           <p className="text-2xl font-bold">{pending}</p>
//         </div>
//         <div className="bg-red-100 p-4 rounded-lg shadow text-center">
//           <p className="text-lg font-semibold text-red-700">Reopened</p>
//           <p className="text-2xl font-bold">{reopened}</p>
//         </div>
//         <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
//           <p className="text-lg font-semibold text-blue-700">Total</p>
//           <p className="text-2xl font-bold">{total}</p>
//         </div>
//       </div>

//       {/* 🔹 Pie Chart */}
//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <h3 className="text-lg font-semibold mb-4">Complaints by Status</h3>
//         <PieChart width={400} height={300}>
//           <Pie
//             data={statusData}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {statusData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//       {/* 🔹 Bar Chart */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4">Complaints by Type</h3>
//         <BarChart width={500} height={300} data={typeData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="type" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#007bff" />
//         </BarChart>
//       </div>
//     </div>
//   );
// }
