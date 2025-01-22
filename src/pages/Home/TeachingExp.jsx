import { React, useEffect, useState } from "react";
import "./TeachingExp.css";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";

const TeachingExp = () => {
  const [TeachingText, setTeachingText] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [counter5, setCounter5] = useState("");
  const [counter6, setCounter6] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Teaching",
      })
      .then((response) => {
        const TeachingContentText = response.data.data.content;
        setTeachingText(TeachingContentText);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "UndergraduateCoursesTaughtCounter1",
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
        section: "GraduateCoursesTaughtCounter2",
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
        section: "TeachingCooperationCounter3",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter3(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "BachelorStudentsAdvisingCounter4",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter4(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "MasterStudentsAdvisingCounter5",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter5(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "DoctorateStudentsAdvisingCounter6",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter6(homeData);
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
        section: "Teaching",
        content: TeachingText,
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
        section: "UndergraduateCoursesTaughtCounter1",
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
        section: "GraduateCoursesTaughtCounter2",
        content: counter2,
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
        section: "TeachingCooperationCounter3",
        content: counter3,
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
        section: "BachelorStudentsAdvisingCounter4",
        content: counter4,
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
        section: "MasterStudentsAdvisingCounter5",
        content: counter5,
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
        section: "DoctorateStudentsAdvisingCounter6",
        content: counter6,
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
          <h4>Summary of my Teaching Experience Text in the Home Page</h4>
          <textarea
            className="responsive-textarea"
            name="projectsText"
            cols={80}
            rows={10}
            value={TeachingText}
            onChange={(e) => setTeachingText(e.target.value)}
          />
        </div>
        <div className="counters">
          <label>
            Enter value for Undergraduate Courses Taught :
            <input
              type="text"
              value={counter1}
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          <label>
            Enter value for Graduate Courses Taught :
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>
          <label>
            Enter value for Teaching Cooperation:
            <input
              type="text"
              value={counter3}
              onChange={(e) => setCounter3(e.target.value)}
            />
          </label>

          <label>
            Enter value for Bachelor Students Advising :
            <input
              type="text"
              value={counter4}
              onChange={(e) => setCounter4(e.target.value)}
            />
          </label>

          <label>
            Enter value for Master Students Advising :
            <input
              type="text"
              value={counter5}
              onChange={(e) => setCounter5(e.target.value)}
            />
          </label>

          <label>
            Enter value for Doctorate Students Advising:
            <input
              type="text"
              value={counter6}
              onChange={(e) => setCounter6(e.target.value)}
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

export default TeachingExp;
