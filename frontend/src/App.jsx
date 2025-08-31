import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
//import Navbar from "./components/Navbar";
import SubmitComplaintPage from "./pages/ComplaintFormPage";
import ComplaintListPage from "./pages/ComplaintListPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"
import Logout from './components/logout'
import StudentDashboard from "./pages/student/studentDashboard"
import StudentProfilePage from "./pages/student/studentProfile"
import AdminDashboard from "./pages/admin/adminDashboard"
import ManageStudents from "./pages/admin/manageStudents"
import Unauthorized from "./pages/Unauthorized"
import PrivateRoute from "./components/privateRoute"
import Complaints from "./pages/student/Complaints"
import StudentLayout from "./layouts/studentLayout"
import AdminLayout from "./layouts/adminLayout"
function App() {
return (
    <Router>
        <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Student Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard/>}/>
              <Route path="/student/submit" element={<SubmitComplaintPage />} />
              <Route path="/student/complaints" element={<Complaints />} />
              <Route path="/student/profile" element={<StudentProfilePage />} />
          </Route>
      </Route>
      
      {/* Admin Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/admin/complaints" element={<ComplaintListPage/>} />
              <Route path="/admin/manageStudents" element={<ManageStudents/>} />
          </Route>
      </Route>
    </Routes>
    </Router>
  );
  // return (
  //   <Compliants baseUrl={import.meta.env.VITE_API_BASE || 'http://localhost:3000'} />
  //   // return (
  //   //   <Router>
  //   //     <Routes>
  //   //       <Route path="/" element={<ComplienterPage />} />
  //   //     </Routes>
  //   //   </Router>
  //   // );
  // );
}

export default App;