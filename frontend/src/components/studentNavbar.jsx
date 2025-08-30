import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faComment, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function StudentNavbar() {
  return (
    <nav className="flex gap-4 p-3 border-b">
      <Link to="/student/dashboard" className="flex items-center">
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
        Dashboard
      </Link>
      <Link to="/student/submit" className="flex items-center">
        <FontAwesomeIcon icon={faComment} className="mr-2" />
        Submit Complaint
      </Link>
      <Link to="/student/complaints" className="flex items-center">
        <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
        My Complaints
      </Link>
      <Link to="/logout" className="flex items-center">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </Link>
    </nav>
  );
}