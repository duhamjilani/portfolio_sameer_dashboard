import React, { useState } from "react";
import "./WorkExp.css";

const WorkExpHome = () => {
  const [workExperience, setWorkExperience] = useState([
    { title1: "", date: "", title2: "", description: "" },
    { title1: "", date: "", title2: "", description: "" },
    { title1: "", date: "", title2: "", description: "" },
  ]);

  const handleChange = (e, index, field) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = e.target.value;
    setWorkExperience(updatedExperience);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Work Experience:", workExperience);
  };

  return (
    <div id="workExperience" className="work-experience-container">
      <h3>Work Experience</h3>
      <form onSubmit={handleSubmit}>
        {workExperience.map((exp, index) => (
          <div className="experience-entry" key={index}>
            <label>
              Job Title 1 {index + 1}:
              <input
                type="text"
                value={exp.title1}
                onChange={(e) => handleChange(e, index, "title1")}
                required
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={exp.date}
                onChange={(e) => handleChange(e, index, "date")}
                required
              />
            </label>

            <label>
              Job Title 2 {index + 1}:
              <input
                type="text"
                value={exp.title2}
                onChange={(e) => handleChange(e, index, "title2")}
                required
              />
            </label>

            <label>
              Description:
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(e, index, "description")}
                required
              />
            </label>
          </div>
        ))}

        <button type="submit" className="mainBtn">
          update
        </button>
      </form>
    </div>
  );
};

export default WorkExpHome;
