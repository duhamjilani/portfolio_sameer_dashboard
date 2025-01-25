import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";

const MemberShips = () => {
  const [membershipsText, setmembershipsText] = useState("");
  const [counter2, setCounter2] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "memberships",
      })
      .then((response) => {
        const membershipsContentText = response.data.data.content;
        setmembershipsText(membershipsContentText);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "TrainingCounter2",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter2(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = () => {
    axios
    .put(`${apiURL}content/update`, {
      page: "LandingPage",
      section: "memberships",
      content: membershipsText,
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
        section: "TrainingCounter2",
        content: counter2,
      })
      .then(() => {
        Swal.fire("Success", " updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update ", "error");
      });
  };

  return (
    <div id="trainingSection" className="text-container">
      <h4>Summary of my Memberships Experiences Text in the Home Page</h4>
      <textarea
        className="responsive-textarea"
        name="membershipsText"
        cols={80}
        rows={10}
        value={membershipsText}
        onChange={(e) => setmembershipsText(e.target.value)}
      />
      <div className="counters">
        <label>
          Enter value for memberships:
          <input
            type="text"
            value={counter2}
            onChange={(e) => setCounter2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={sendData} className="mainBtn">
        Update
      </button>
    </div>
  );
};

export default MemberShips;
