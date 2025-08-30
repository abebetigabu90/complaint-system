// src/components/Logout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Logging you out...");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/logout", {
          method: "POST",
          credentials: "include",
        });

        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("name");

        if (res.ok) {
          setStatus("Logged out successfully! Redirecting...");
        } else {
          setStatus("Logged out locally! Redirecting...");
        }
        
        // Short delay to show message before redirecting
        setTimeout(() => navigate('/login'), 1500);
        
      } catch (error) {
        console.error("Error logging out:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        setStatus("Logged out locally due to connection error! Redirecting...");
        setTimeout(() => navigate('/login'), 1500);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-semibold">{status}</p>
    </div>
  );
};

export default Logout;