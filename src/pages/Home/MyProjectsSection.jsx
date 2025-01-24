import React, { useState, useEffect } from "react";
import "./MyProjectsSection.css";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";

const MyProjectsSection = () => {
  const [projectsText, setProjectsText] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Achievement",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setProjectsText(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "AchievementCounter1",
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
        section: "AchievementCounter2",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter2(homeData);
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

    const formData = {
      projectsText,
      experienceYears: counter1,
      memberships: counter2,
    };

    axios
      .put(`${apiURL}content/update`, {
        page: "LandingPage",
        section: "Achievement",
        content: projectsText,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });

    axios
      .put(`${apiURL}content/update`, {
        page: "LandingPage",
        section: "AchievementCounter1",
        content: counter1,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });

    axios
      .put(`${apiURL}content/update`, {
        page: "LandingPage",
        section: "AchievementCounter2",
        content: counter2,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });
  };

  return (
    <div className="projects-container">
      <form onSubmit={handleSubmit} className="projects-form">
        <div id="projects" className="projects-text">
          <h4>Summary of my Achievements Text in the Home Page</h4>
          <textarea
            className="responsive-textarea"
            name="projectsText"
            cols={80}
            rows={10}
            value={projectsText}
            onChange={(e) => setProjectsText(e.target.value)}
          />
        </div>
        <div className="counters">
          <label>
            Enter value for Experience Years:
            <input
              type="text"
              value={counter1}
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          {/* <label>
            Enter value for Memberships:
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label> */}
        </div>
        <button type="submit" className="mainBtn">
          Update
        </button>
      </form>
    </div>
  );
};

export default MyProjectsSection;
