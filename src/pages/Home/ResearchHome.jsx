import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios'
// import './ResearchHome.css'

const ResearchHome = () => {
  const [researchText,  setResearchText] = useState("");

  const fetchData = () => {
    axios
      .get("http://localhost:5008/Home")
      .then((response) => {
        const homeData = response.data[0];
        setResearchText(homeData.researchText);
        console.log(homeData.researchText);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("Something went wrong while fetching data.");
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
          .patch("http://localhost:5008/Home", {
            Home: [{researchText }],
          })
          .then((response) => {
            console.log("Data sent successfully:", response.data);
            Swal.fire("Updated!", "The text has been updated successfully.", "success");
          })
          .catch((error) => {
            console.error("Error sending data: ", error);
            Swal.fire("Error", "Something went wrong while updating data.", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
        Swal.fire("Cancelled", "No changes were made.", "info");
      }
    });
  };

  return (
    <div id='researchSection' className="text-container">
          <h4> Research Text in the Home Page</h4>
      <textarea
        className="responsive-textarea"
        name="heroText"
        cols={80}
        rows={10}
        value={researchText}
        onChange={(e) =>  setResearchText(e.target.value)}
      />
      <button onClick={sendData} className="mainBtn">Update</button>
    </div>
  )
}

export default ResearchHome
