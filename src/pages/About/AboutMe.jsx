import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AboutMe.css";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const [aboutText, setAboutText] = useState("");
  const [images, setImages] = useState([]);

  // Update to local path where images are saved
  const localImagePath = "/images/upload-image/";

  // Fetch content data (text) for AboutMe section
  const fetchData = async () => {
    try {
      const response = await axios.post(`${apiURL}content/get-content`, {
        page: "About",
        section: "AboutMe",
      });
      setAboutText(response.data.data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Fetch images for the About page
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/about`);
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);  
    formData.append("page", "about");
    formData.append("name", file.name);

    try {
      await axios.post(`${apiURL}images/new-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Image uploaded successfully!", "success");
      fetchImages(); // Fetch updated images
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "Failed to upload image.", "error");
    }
  };

  // Handle image deletion
  const handleImageDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}images/delete-image/${id}`);
      setImages(images.filter((image) => image._id !== id));
      Swal.fire("Deleted!", "Image deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting image:", error);
      Swal.fire("Error", "Failed to delete image.", "error");
    }
  };

  // Update the About text content
  const sendData = async () => {
    Swal.fire({
      title: "Update Confirmation",
      text: "Do you want to update the text?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${apiURL}content/update`, {
            page: "About",
            section: "AboutMe",
            content: aboutText,
          });
          Swal.fire("Updated!", "The text has been updated successfully.", "success");
        } catch (error) {
          console.error("Error updating text:", error);
          Swal.fire("Error", "Failed to update text.", "error");
        }
      }
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      navigate("/login");
    }
    fetchData();
    fetchImages();
  }, []);

  return (
    <div className="bigContainer">
      <h2>About Page</h2>
      <div className="image-container">
        <h3>Image Slider in About Page</h3>
        <div className="image-upload">
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="image-list">
          {images.map((image) => (
            <div key={image._id} className="image-card">
              {/* Local path used to display image */}
              <img
                src={image.path}
                alt="Uploaded"
                className="uploaded-image"
              />
              <button
                onClick={() => handleImageDelete(image._id)}
                className="delete-btn1-unique"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="aboutMe-container">
        <h4>About Text in the About Me Page</h4>
        <textarea
          className="responsive-textarea"
          name="aboutText"
          cols={80}
          rows={10}
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        <button onClick={sendData} className="mainBtn">
          Update
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
