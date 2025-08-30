// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-indigo-600 text-white shadow-md">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Brand / Logo */}
//         <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
//           Home
//         </Link>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex gap-8">
//           <Link
//             to="/student/submit"
//             className="hover:text-gray-200 transition font-medium"
//           >
//             Submit Complaint
//           </Link>
//            <Link
//             to="/student/complaints"
//             className="block py-2 px-4 text-white hover:bg-indigo-800 transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             my Complaints
//           </Link>
//           <Link
//             to="/admin/complaints"
//             className="hover:text-gray-200 transition font-medium"
//           >
//            view all Complaints
//           </Link>
//         </div>

//         {/* Login Button */}
//         <div className="hidden md:block">
//           <Link
//             to="/login"
//             className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-100 transition"
//           >
//             Login
//           </Link>
//              <Link
//             to="/logout"
//             className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-100 transition"
//           >
//             Logout
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             ></path>
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Navigation Links */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-indigo-700">
//           <Link
//             to="/student/submit"
//             className="block py-2 px-4 text-white hover:bg-indigo-800 transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Submit Complaint
//           </Link>
//           <Link
//             to="/student/complaints"
//             className="block py-2 px-4 text-white hover:bg-indigo-800 transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             my Complaints
//           </Link>
//           <Link
//             to="/admin/complaints"
//             className="block py-2 px-4 text-white hover:bg-indigo-800 transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//            view all Complaints
//           </Link>
//           <Link
//             to="/login"
//             className="block py-2 px-4 text-white hover:bg-indigo-800 transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Login
//           </Link>
//             <Link
//             to="/logout"
//             className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-100 transition"
//           >
//             Logout
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }