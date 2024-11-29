import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";
// import './Hero.css'
const Hero = () => {
  const [heroText, setHeroText] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Hero",
      })
      .then((response) => {
        console.log(response);
        const homeData = response.data.data.content;
        setHeroText(homeData);
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
            page: "LandingPage",
            section: "Hero",
            content: heroText,
          })
          .then((response) => {
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

  return (
    <div id="hero" className="text-container">
      <h4> Hero Text in the Home Page</h4>
      <textarea
        className="responsive-textarea"
        name="heroText"
        cols={80}
        rows={10}
        value={heroText}
        onChange={(e) => setHeroText(e.target.value)}
      />
      <button onClick={sendData} className="mainBtn">
        Update
      </button>
    </div>
  );
};

export default Hero;
