import { useEffect, useState } from "react";

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }

        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;

  if (!student) return <p className="p-6 text-center">No profile found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="space-y-4">
        <p>
          <span className="font-semibold">Name:</span> {student.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {student.email}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              student.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {student.status}
          </span>
        </p>
        {student.department && (
          <p>
            <span className="font-semibold">Department:</span> {student.department}
          </p>
        )}
      </div>
    </div>
  );
}
