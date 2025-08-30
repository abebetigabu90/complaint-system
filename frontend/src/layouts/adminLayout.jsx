// import { Outlet } from "react-router-dom";
// import AdminNavbar from "../components/adminNavbar";

// export default function AdminLayout() {
//   return (
//     <>
//       <AdminNavbar />
//       <div className="p-6">
//         <Outlet />
//       </div>
//     </>
//   );
// }
// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}