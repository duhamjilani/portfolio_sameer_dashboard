import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";

const TrainingHome = () => {
  const [trainingText, setTrainingText] = useState("");
   const [counter1, setCounter1] = useState("");
    const [counter2, setCounter2] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Training",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setTrainingText(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
      axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "TrainingCounter1",
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
        section: "TrainingCounter2",
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
            section: "Training",
            content: trainingText,
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
    axios
    .put(`${apiURL}content/update`, {
      page: "LandingPage",
      section: "TrainingCounter1",
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
      <h4>
        {" "}
        Summary of my Training and Membership Experiences Text in the Home Page
      </h4>
      <textarea
        className="responsive-textarea"
        name="heroText"
        cols={80}
        rows={10}
        value={trainingText}
        onChange={(e) => setTrainingText(e.target.value)}
      />
       <div className="counters">
 <label>
        Enter value for Trainings and Seminars  :
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
      <button onClick={sendData} className="mainBtn">
        Update
      </button>
    </div>
  );
};

export default TrainingHome;
