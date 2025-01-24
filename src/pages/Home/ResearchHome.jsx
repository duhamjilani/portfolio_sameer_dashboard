import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import './ResearchHome.css'
import { apiURL } from "../../constants/apiURL";

const ResearchHome = () => {
  const [researchText, setResearchText] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [counter5, setCounter5] = useState("");
  const [counter6, setCounter6] = useState("");
  const [counter7, setCounter7] = useState("");
  const [counter8, setCounter8] = useState("");
  const [counter9, setCounter9] = useState("");

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Research",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setResearchText(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

      axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "ResearchCounter1",
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
        section: "ResearchCounter2",
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
        section: "ResearchCounter3",
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
        section: "ResearchCounter4",
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
        section: "ResearchCounter5",
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
        section: "ResearchCounter6",
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
        section: "ResearchCounter7",
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
        section: "ResearchCounter7",
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
        section: "ResearchCounter8",
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
        section: "ResearchCounter9",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setCounter1(homeData);
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
            section: "Research",
            content: researchText,
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
      section: "ResearchCounter1",
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
      section: "ResearchCounter2",
      content: counter2,
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
      section: "ResearchCounter3",
      content: counter3,
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
      section: "ResearchCounter4",
      content: counter4,
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
      section: "ResearchCounter5",
      content: counter5,
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
      section: "ResearchCounter6",
      content: counter6,
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
      section: "ResearchCounter7",
      content: counter7,
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
      section: "ResearchCounter8",
      content: counter8,
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
      section: "ResearchCounter9",
      content: counter9,
    })
    .then(() => {
      Swal.fire("Success", " updated successfully!", "success");
    })
    .catch(() => {
      Swal.fire("Error", "Failed to update .", "error");
    });






  };

  return (
    <div className="dd">

   
    <div id="researchSection" className="text-container">
      <h4> Research Text in the Home Page</h4>
      <textarea
        className="responsive-textarea"
        name="heroText"
        cols={80}
        rows={10}
        value={researchText}
        onChange={(e) => setResearchText(e.target.value)}
      />
      </div>
      <div className="counters">
        <label>
          Enter value for Citations :
          <input
            type="text"
            value={counter1}
            onChange={(e) => setCounter1(e.target.value)}
          />
        </label>

        <label>
          Enter value for H-index :
          <input
            type="text"
            value={counter2}
            onChange={(e) => setCounter2(e.target.value)}
          />
        </label>
        <label>
          Enter value for Journal Publications :
          <input
            type="text"
            value={counter3}
            onChange={(e) => setCounter3(e.target.value)}
          />
        </label>
        <label>
          Enter value for Conference Proceedings :
          <input
            type="text"
            value={counter4}
            onChange={(e) => setCounter4(e.target.value)}
          />
        </label>
        <label>
          Enter value for Book Chapters :
          <input
            type="text"
            value={counter5}
            onChange={(e) => setCounter5(e.target.value)}
          />
        </label>
        <label>
          Enter value for Guest Editor SIs :
          <input
            type="text"
            value={counter6}
            onChange={(e) => setCounter6(e.target.value)}
          />
        </label>
        <label>
          Enter value for Permanent Editor :
          <input
            type="text"
            value={counter7}
            onChange={(e) => setCounter7(e.target.value)}
          />
        </label>
        <label>
          Enter value for TPCs at Conferences :
          <input
            type="text"
            value={counter8}
            onChange={(e) => setCounter8(e.target.value)}
          />
        </label>
        <label>
          Enter value for Journal Reviewer:
          <input
            type="text"
            value={counter9}
            onChange={(e) => setCounter9(e.target.value)}
          />
        </label>
      </div>

      <button onClick={sendData} className="mainBtn">
        Update
      </button>
    
    </div>
  );
};

export default ResearchHome;
