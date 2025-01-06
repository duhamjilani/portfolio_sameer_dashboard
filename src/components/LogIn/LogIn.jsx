import React, { useState, useEffect } from "react";
import { apiURL } from "../../constants/apiURL";
import axios from "axios";
import Swal from "sweetalert2";
import { MDBValidation, MDBValidationItem, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect if already logged in
      navigate("/dashboardaAzZdashboard");
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValue.name || !formValue.password) {
      Swal.fire("Login Failed", "Must enter username and password", "error");
      return;
    }

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
      Swal.fire("Login Failed", "username or password is wrong", "error");
    }
  };

  // Reset password using Swal
  const handleResetPasswordClick = async () => {
    const { value: newPassword } = await Swal.fire({
      title: "Enter your new password",
      input: "password",
      inputLabel: "New Password",
      inputPlaceholder: "Enter your new password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
    });

    if (newPassword) {
      try {
        // Send the reset password request to the backend
        const response = await axios.post(`${apiURL}admin/reset-password`, {
          name: formValue.name,
          newPassword,
        });

        if (response.data.message === "Password reset successful!") {
          Swal.fire("Success", "Password reset successful", "success");
        } else {
          Swal.fire("Reset Failed", response.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Reset Failed", "An error occurred. Please try again.", "error");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <MDBValidation className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Log In</h3>

        {/* Username */}
        <MDBValidationItem feedback="Please enter your username." invalid className="mb-3">
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
        <MDBValidationItem feedback="Please enter your password." invalid className="mb-4">
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

        {/* Reset Password Button */}
        <div className="d-grid mt-3">
          <MDBBtn color="link" type="button" onClick={handleResetPasswordClick}>
            Reset Password
          </MDBBtn>
        </div>
      </MDBValidation>
    </div>
  );
};

export default LogIn;
