import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AboutMe.css";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
const AboutMe = () => {
  const [aboutText, setAboutText] = useState("");
  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "About",
        section: "AboutMe",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setAboutText(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = () => {
    Swal.fire({
      title: "Update Confirmation",
      text: "Do you want to update the text?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${apiURL}content/update`, {
            page: "About",
            section: "AboutMe",
            content: aboutText,
          })
          .then((response) => {
            console.log("Data sent successfully:", response.data);
            Swal.fire(
              "Updated!",
              "The text has been updated successfully.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error sending data: ", error);
            Swal.fire(
              "Error",
              "Something went wrong while updating data.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "No changes were made.", "info");
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="aboutMe-container">
        <h4> About Text in the About me Page</h4>
        <textarea
          className="responsive-textarea"
          name="aboutText"
          cols={80}
          rows={10}
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        <button onClick={sendData} className="mainBtn">
          Update
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
