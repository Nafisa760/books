import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    if (setUserRole) setUserRole(null);
    navigate("/login");
  };

  return (
    <Navbar color="light" light expand="md" className="mb-4 px-3">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">Home</NavLink>
        </NavItem>

        {/* روابط الطالب */}
        {userRole === "student" && (
          <>
            <NavItem>
              <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/viewbooks">View Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/myborrowed">My Borrowed Books</NavLink>
            </NavItem>
          </>
        )}

        {/* روابط الادمن */}
        {userRole === "admin" && (
          <>
            <NavItem>
              <NavLink tag={Link} to="/admin">Admin Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/book">Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/borrowedlist">Borrowed List</NavLink>
            </NavItem>
          </>
        )}
      </Nav>

      {/* دائرة باسم الدور */}
      {userRole && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: userRole === "admin" ? "#007bff" : "#28a745",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            marginLeft: "auto",
            cursor: "pointer"
          }}
          onClick={handleLogout}
          title="Click to Logout"
        >
          {userRole === "admin" ? "Admin" : "S"}
        </div>
      )}
    </Navbar>
  );
};

export default Header;
