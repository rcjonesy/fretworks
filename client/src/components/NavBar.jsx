
import { NavLink as RRNavLink } from "react-router-dom";
import { NavItem, NavLink, Navbar, NavbarBrand, Nav } from "reactstrap";
import { logout } from "../managers/authManager";
import { useNavigate } from "react-router-dom";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <Navbar color="dark" dark expand="md">
 
      <NavbarBrand style={{ fontSize: "2rem" }} tag={RRNavLink} to="/">
        Precision Fretworks
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        {loggedInUser ? (
          <>
            <NavItem>
              <NavLink tag={RRNavLink} to="/newrepair">
                New Repair
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/register">
                Register
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
