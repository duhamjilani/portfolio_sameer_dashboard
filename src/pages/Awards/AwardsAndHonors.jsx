import React, { useState, useEffect } from "react";
import "./AwardsAndHonors.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AwardsAndHonors = () => {
  const [awards, setAwards] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [countVisible, setCountVisible] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedAward, setEditedAward] = useState({
    title: "",
    date: "",
    description: "",
    isVisible: false,
  });

  const navigate = useNavigate();

  // Fetch banner image
  const fetchBannerImage = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/awards`);
      setBannerImage(response.data.images[0]);
      console.log(response.data.images[0].path)
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
    formData.append("page", "awards");
    formData.append("name", file.name);

    try {
      await axios.post(`${apiURL}images/new-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Image uploaded successfully!", "success");
      fetchBannerImage(); // Fetch updated images
    } catch (error) {
      console.error("Error uploading image:", error);
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

  // Ensure user is logged in
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch awards
  const handleFetchAwards = async () => {
    try {
      const response = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Award",
      });
      setAwards(response.data.data);
      setCountVisible(
        response.data.data.filter((item) => item.isVisible === true).length
      );
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  // Create new award
  const handleCreate = async () => {
    const newAward = {
      title: "",
      date: "",
      description: "",
      isVisible: 0,
      type: "Award",
    };

    try {
      const response = await axios.post(`${apiURL}info/add`, newAward);
      setAwards([...awards, response.data.data]);
    } catch (error) {
      console.error("Error creating award:", error);
    }
  };

  // Update award
  const handleUpdate = async (id) => {
    try {
      const updatedAward = await axios.put(
        `${apiURL}info/update/${id}`,
        editedAward.isVisible && countVisible >= 3
          ? { ...editedAward, isVisible: false }
          : editedAward
      );

      const updatedAwards = awards.map((award) =>
        award._id === id ? { ...award, ...updatedAward.data.data } : award
      );
      setAwards(updatedAwards);
      setEditMode(null);
      setEditedAward({
        title: "",
        date: "",
        description: "",
        isVisible: false,
      });
      setCountVisible(
        updatedAwards.filter((item) => item.isVisible === true).length
      );
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  // Delete award
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}info/delete/${id}`);
      const updatedAwards = awards.filter((award) => award._id !== id);
      setAwards(updatedAwards);
      setCountVisible(
        updatedAwards.filter((item) => item.isVisible === true).length
      );
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  // Edit award
  const handleEdit = (award) => {
    setEditMode(award._id);
    setEditedAward({
      title: award.title,
      date: award.date,
      description: award.description,
      isVisible: award.isVisible,
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAward((prev) => ({ ...prev, [name]: value }));
  };

  // Initial data fetch
  useEffect(() => {
    handleFetchAwards();
    fetchBannerImage();
  }, []);

  return (
    <div className="bigContainer">
      <h2>Awards and Honors</h2>
      <div className="banner-section">
        <h3>Banner Image</h3>
        {bannerImage ? (
          <div className="banner-preview">
            <img
              src={bannerImage.path}
              alt="Awards Banner"
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

      <div id="awards-container" className="awards-container">
        <button onClick={handleCreate} className="create-btn">
          Create New Award
        </button>
        <div className="awards-list">
          {awards.map((award) => (
            <div key={award._id} className="award-card">
              {editMode === award._id ? (
                <>
                  <h3>
                    <input
                      type="text"
                      name="title"
                      value={editedAward.title}
                      onChange={handleInputChange}
                      placeholder="Award Title"
                    />
                  </h3>
                  <p>
                    <strong>Year:</strong>
                    <input
                      type="text"
                      name="date"
                      value={editedAward.date}
                      onChange={handleInputChange}
                      placeholder="Year"
                    />
                  </p>
                  <p>
                    <strong>Description:</strong>
                    <textarea
                      name="description"
                      value={editedAward.description}
                      onChange={handleInputChange}
                      placeholder="Award Description"
                    />
                  </p>
                  <p>
                    <strong>Visible on home page:</strong>
                    <select
                      name="isVisible"
                      value={editedAward.isVisible}
                      onChange={handleInputChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </p>
                  <button
                    onClick={() => handleUpdate(award._id)}
                    className="mainBtn"
                  >
                    Update Award
                  </button>
                </>
              ) : (
                <>
                  <h3>{award.title}</h3>
                  <p>
                    <strong>Year:</strong> {award.date}
                  </p>
                  <p>
                    <strong>Description:</strong> {award.description}
                  </p>
                  <button
                    onClick={() => handleEdit(award)}
                    className="mainBtn"
                  >
                    Edit Award
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(award._id)}
                className="delete-btn"
              >
                Delete Award
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsAndHonors;
