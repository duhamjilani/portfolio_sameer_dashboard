import React, { useState, useEffect } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";

const IndExp = () => {
    const [ExpText, setExpText] = useState("");
    const [counter1, setCounter1] = useState("");
    const [counter2, setCounter2] = useState("");
    const [counter3, setCounter3] = useState("");
  
    const fetchData = () => {
      axios
        .post(`${apiURL}content/get-content`, {
          page: "LandingPage",
          section: "IndExp",
        })
        .then((response) => {
          const homeData = response.data.data.content;
          setExpText(homeData);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          // alert("Something went wrong while fetching data.");
        });
  
      axios
        .post(`${apiURL}content/get-content`, {
          page: "LandingPage",
          section: "PracticalExperienceCounter1",
        })
        .then((response) => {
          const homeData = response.data.data.content;
          setCounter1(homeData);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          // alert("Something went wrong while fetching data.");
        });
  
      axios
        .post(`${apiURL}content/get-content`, {
          page: "LandingPage",
          section: "InternshipExperienceCounter2",
        })
        .then((response) => {
          const homeData = response.data.data.content;
          setCounter2(homeData);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          // alert("Something went wrong while fetching data.");
        });

        axios
        .post(`${apiURL}content/get-content`, {
          page: "LandingPage",
          section: "ConsultancyCounter3",
        })
        .then((response) => {
          const homeData = response.data.data.content;
          setCounter3(homeData);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          // alert("Something went wrong while fetching data.");
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
     
  
      axios
        .put(`${apiURL}content/update`, {
          page: "LandingPage",
          section: "IndExp",
          content: ExpText,
        })
        .then(() => {
          Swal.fire("Success", " updated successfully!", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to update .", "error");
        });
  
      axios
        .put(`${apiURL}content/update`, {
          page: "LandingPage",
          section: "PracticalExperienceCounter1",
          content: counter1,
        })
        .then(() => {
          Swal.fire("Success", " updated successfully!", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to update .", "error");
        });
  
      axios
        .put(`${apiURL}content/update`, {
          page: "LandingPage",
          section: "InternshipExperienceCounter2",
          content: counter2,
        })
        .then(() => {
          Swal.fire("Success", " updated successfully!", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to update ", "error");
        });

        axios
        .put(`${apiURL}content/update`, {
          page: "LandingPage",
          section: "ConsultancyCounter3",
          content: counter3,
        })
        .then(() => {
          Swal.fire("Success", " updated successfully!", "success");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to update .", "error");
        });


    };




  return (
    <div className="projects-container">
      <form onSubmit={handleSubmit} className="projects-form">
        <div id="projects" className="projects-text">
          <h4>Summary of my Industrial Work Experience Text in the Home Page</h4>
          <textarea
            className="responsive-textarea"
            name="projectsText"
            cols={80}
            rows={10}
            value={ExpText}
            onChange={(e) => setExpText(e.target.value)}
          />
        </div>
        <div className="counters">
          <label>
            Enter value for  Practical Experience :
            <input
              type="text"
              value={counter1}
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          <label>
            Enter value for  Internship Experience :
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>

          <label>
            Enter value for Consultancy:
            <input
              type="text"
              value={counter3}
              onChange={(e) => setCounter3(e.target.value)}
            />
          </label>

        </div>
        <button type="submit" className="mainBtn">
          Update
        </button>
      </form>
    </div>
  )
}

export default IndExp
