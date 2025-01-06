import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";

const Hero = () => {
  const [heroText, setHeroText] = useState("");
  const [fileInfo, setFileInfo] = useState(null);

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "LandingPage",
        section: "Hero",
      })
      .then((response) => {
        const homeData = response.data.data.content;
        setHeroText(homeData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleFile = (e) => {
    setFileInfo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fileInfo) {
      Swal.fire("Error", "Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInfo);

    axios
      .post(`${apiURL}cv/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire(
          "Uploaded!",
          "The CV file has been uploaded successfully.",
          "success"
        );
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        Swal.fire(
          "Error",
          "Something went wrong while uploading the file.",
          "error"
        );
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
          .then(() => {
            Swal.fire(
              "Updated!",
              "The text has been updated successfully.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error sending data:", error);
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
    <div className="big-container">
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
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="file-upload-container">
          <label htmlFor="file" className="custom-file-upload">
            Upload CV File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFile}
            className="cvUploader"
          />
        </div>
        <input type="submit" className="mainBtn" value="Upload CV" />
      </form>
    </div>
  );
};

export default Hero;
