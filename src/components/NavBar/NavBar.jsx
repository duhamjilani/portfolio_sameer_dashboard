import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Initialize based on token presence
    const navigate = useNavigate();
  

  // Update login state on token change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update login state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/dashboardaAzZdashboard/login");
    // Update state to hide navbar after logout
  };

  return (
    <MDBNavbar expand="lg" light bgColor="rgba(248, 248, 248, 1)">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <div className="d-flex justify-content-between w-100">
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/dashboardaAzZdashboard">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/aboutMe">About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/awards">Awards</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/training">
                  Training And Memberships
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/research">Research</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/academicExp">
                  Academic And Professional Experience
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboardaAzZdashboard/industrialExp">
                  Industrial Experience
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
             
              <MDBBtn color="danger" onClick={handleLogout}>
                Logout
              </MDBBtn>
            
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;
