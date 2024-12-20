import React, { useState,useEffect } from "react";
import { apiURL } from "../../constants/apiURL";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });
  useEffect(()=>{
const token=localStorage.getItem("token")
if (token)
navigate("/dashboardaAzZdashboard");
  },[])

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(`${apiURL}admin/login`, formValue);

      if (login.data.isMatch) {
        localStorage.setItem("token", login.data.isMatch); 
       
      
        navigate("/dashboardaAzZdashboard");
      } else {
        Swal.fire("Login Failed", "Incorrect username or password.", "error");
       
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <MDBValidation
        className="p-4 border rounded shadow-sm"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Log In</h3>

        {/* Username */}
        <MDBValidationItem
          feedback="Please enter your username."
          invalid
          className="mb-3"
        >
          <MDBInput
            value={formValue.name}
            name="name"
            onChange={onChange}
            id="validationCustomUsername"
            required
            label="Username"
          />
        </MDBValidationItem>

        {/* Password */}
        <MDBValidationItem
          feedback="Please enter your password."
          invalid
          className="mb-4"
        >
          <MDBInput
            value={formValue.password}
            name="password"
            onChange={onChange}
            id="validationCustomPassword"
            type="password"
            required
            label="Password"
          />
        </MDBValidationItem>

        {/* Submit Button */}
        <div className="d-grid">
          <MDBBtn type="submit">Log In</MDBBtn>
        </div>
      </MDBValidation>
    </div>
  );
};

export default LogIn;
