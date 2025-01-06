import React, { useState, useEffect } from "react";
import "./IndustrialExp.css";
import Swal from "sweetalert2";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IndustrialExp = () => {
  const [industrialExperience, setIndustrialExperience] = useState([
    { title1: "", date: "", title2: "", description: "" },
    { title1: "", date: "", title2: "", description: "" },
    { title1: "", date: "", title2: "", description: "" },
    { title1: "", date: "", title2: "", description: "" },
  ]);
  const [bannerImage, setBannerImage] = useState(null);
  const navigate = useNavigate();

  const fetchBannerImage = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/industrial`);
      setBannerImage(response.data.images[0]);
     // Log the banner path
    } catch (error) {
      console.error("Error fetching banner image:", error);
    }
  };





  

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", "industrial");
    formData.append("name", file.name);

    try {
      await axios.post(`${apiURL}images/new-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Image uploaded successfully!", "success");
      fetchBannerImage(); // Fetch updated image after upload
    } catch (error) {
      console.error("Error uploading banner image:", error);
      Swal.fire("Error", "Failed to upload image.", "error");
    }
  };

  // Handle banner delete
  const handleBannerDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}images/delete-image/${id}`);
      setBannerImage(null);
      Swal.fire("Success", "Banner deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting banner image:", error);
      Swal.fire("Error", "Failed to delete banner image.", "error");
    }
  };

  const handleChange = (e, index, field) => {
    const updatedExperience = [...industrialExperience];
    updatedExperience[index][field] = e.target.value;
    setIndustrialExperience(updatedExperience);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      navigate("/login");
    }
    fetchBannerImage();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted Industrial Experience:", industrialExperience);
  };

  return (
    <div className="industrial-experience-container">
      <div className="bigContainerExp">
        <h3>Industrial Experience</h3>
        <div className="banner-section">
          <h3>Banner Image</h3>
          {bannerImage ? (
            <div className="banner-preview">
              <img
                src={bannerImage.path}
                alt="Industrial Banner"
                className="banner-image"
              />
              <button
                onClick={() => handleBannerDelete(bannerImage._id)}
                className="delete-btn"
              >
                Delete Banner
              </button>
            </div>
          ) : (
            <div className="image-upload-container">
              <label htmlFor="imageUpload" className="custom-image-upload">
                Upload Banner
              </label>
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageUpload}
                className="imageUploader"
              />
            </div>
          )}
        </div>

        {/* <form
          
          method="post"
          encType="multipart/form-data"
          className="formExp"
        >
          {industrialExperience.map((exp, index) => (
            <div className="experience-entry" key={index}>
              <label>
                Title 1 {index + 1}:
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
                Title 2 {index + 1}:
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
          <button type="submit" className="mainBtn" onClick={handleSubmit}>
            Update
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default IndustrialExp;
