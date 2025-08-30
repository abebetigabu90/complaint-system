import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/studentNavbar";

export default function StudentLayout() {
  return (
    <>
      <StudentNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}
