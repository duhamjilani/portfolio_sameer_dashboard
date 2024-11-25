import React, { useState } from "react";
import "./MyProjectsSection.css";
import axios from "axios";
import Swal from "sweetalert2";

const MyProjectsSection = () => {
  const [projectsText, setProjectsText] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      projectsText,
      experienceYears: counter1,
      memberships: counter2,
    };

    axios
      .post("/api/updateProjects", formData)
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
          <h4>Projects Text in the Home Page</h4>
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
          <label>
            Enter value for Memberships:
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="mainBtn">
          Update
        </button>
      </form>
    </div>
  );
};

export default MyProjectsSection;
