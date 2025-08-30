import { useEffect, useState } from "react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/manageStudents', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch students: ${res.status}`);
        }
        
        const data = await res.json();
        setStudents(data.students || data || []); // Handle different response formats
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // Fixed: Added empty dependency array

  // Block/Unblock student
  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/students/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: currentStatus === "active" ? "blocked" : "active" }),
      });
      
      if (!res.ok) {
        throw new Error(`Failed to update status: ${res.status}`);
      }
      
      const updated = await res.json();
      setStudents(students.map((s) => (s._id === id ? updated : s)));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update student status");
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/students/${id}`, { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        throw new Error(`Failed to delete student: ${res.status}`);
      }
      
      setStudents(students.filter((s) => s._id !== id));
      alert("Student deleted successfully");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student");
    }
  };

  // Filter students by search
  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center p-6">Loading students...</p>;
  if (error) return <p className="text-center p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Students</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full max-w-md rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-2">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full border border-gray-300 rounded">
        <thead>
            <tr className="bg-gray-100">
            <th className="border px-4 py-2 w-1/4">Name</th>
            <th className="border px-4 py-2 w-1/4">Email</th>
            <th className="border px-4 py-2 w-1/6">Status</th>
            <th className="border px-4 py-2 w-1/3">Actions</th> {/* Wider actions column */}
            </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  {students.length === 0 ? 'No students found' : 'No matching students found'}
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleStatus(student._id, student.status)}
                      className={`px-3 py-1 rounded text-white ${
                        student.status === "active" 
                          ? "bg-red-600 hover:bg-red-700" 
                          : "bg-green-600 hover:bg-green-700"
                      } transition-colors`}
                    >
                      {student.status === "active" ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}