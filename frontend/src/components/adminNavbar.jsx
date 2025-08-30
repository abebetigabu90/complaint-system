import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function AdminNavbar() {
  return (
    <nav className="flex gap-6 p-4 border-b bg-white shadow-sm">
      <Link 
        to="/admin/dashboard" 
        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
        Dashboard
      </Link>
      <Link 
        to="/admin/complaints" 
        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
        All Complaints
      </Link>
      <Link 
        to="/logout" 
        className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200 ml-auto"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </Link>
    </nav>
  );
 }
// import { Link, useLocation } from "react-router-dom";
// import { FaShieldAlt, FaHome, FaExclamationCircle, FaSignOutAlt } from "react-icons/fa";

// export default function AdminNavbar() {
//   const location = useLocation();

//   // Container styles
//   const navStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '16px 24px',
//     borderBottom: '1px solid #e5e7eb',
//     backgroundColor: 'white',
//   };

//   // For larger screens
//   if (window.innerWidth >= 640) {
//     navStyle.flexDirection = 'row';
//   }

//   // Link container
//   const linksStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '16px',
//     marginTop: '16px',
//   };

//   // For larger screens
//   if (window.innerWidth >= 640) {
//     linksStyle.marginTop = '0';
//   }

//   // Base link style
//   const baseLinkStyle = {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     padding: '8px 16px',
//     borderRadius: '8px',
//     transition: 'all 0.2s ease',
//     textDecoration: 'none',
//   };

//   // Active link style
//   const activeLinkStyle = {
//     ...baseLinkStyle,
//     color: '#1d4ed8',
//     backgroundColor: '#dbeafe',
//     fontWeight: '500',
//   };

//   // Inactive link style
//   const inactiveLinkStyle = {
//     ...baseLinkStyle,
//     color: '#4b5563',
//     backgroundColor: 'transparent',
//   };

//   // Hover style
//   const hoverStyle = {
//     color: '#1d4ed8',
//     backgroundColor: '#f3f4f6',
//   };

//   return (
//     <nav style={navStyle}>
//       {/* Brand */}
//       <div style={{
//         display: 'flex', 
//         alignItems: 'center', 
//         gap: '12px', 
//         color: '#1d4ed8', 
//         fontWeight: 'bold', 
//         fontSize: '20px',
//         marginBottom: '16px'
//       }}>
//         <FaShieldAlt size="24px" />
//         <span>Admin Panel</span>
//       </div>
      
//       {/* Navigation Links */}
//       <div style={linksStyle}>
//         <Link 
//           to="/admin/dashboard"
//           style={location.pathname === "/admin/dashboard" ? activeLinkStyle : inactiveLinkStyle}
//           onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
//           onMouseLeave={(e) => {
//             const isActive = location.pathname === "/admin/dashboard";
//             Object.assign(e.target.style, isActive ? activeLinkStyle : inactiveLinkStyle);
//           }}
//         >
//           <FaHome size="20px" />
//           Dashboard
//         </Link>
//         <Link 
//           to="/admin/complaints"
//           style={location.pathname === "/admin/complaints" ? activeLinkStyle : inactiveLinkStyle}
//           onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
//           onMouseLeave={(e) => {
//             const isActive = location.pathname === "/admin/complaints";
//             Object.assign(e.target.style, isActive ? activeLinkStyle : inactiveLinkStyle);
//           }}
//         >
//           <FaExclamationCircle size="20px" />
//           All Complaints
//         </Link>
//         <Link 
//           to="/logout"
//           style={location.pathname === "/logout" ? activeLinkStyle : inactiveLinkStyle}
//           onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
//           onMouseLeave={(e) => {
//             const isActive = location.pathname === "/logout";
//             Object.assign(e.target.style, isActive ? activeLinkStyle : inactiveLinkStyle);
//           }}
//         >
//           <FaSignOutAlt size="20px" />
//           Logouts
//         </Link>
//       </div>
//     </nav>
//   );
// }