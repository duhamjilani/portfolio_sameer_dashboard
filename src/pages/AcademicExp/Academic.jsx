import React, { useEffect, useState } from "react";
import "./Academic.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Academic = () => {
  const [academic, setAcademic] = useState([]);
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    date: "",
    description: "",
    category: "",
    subCategory: "",
  });

  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) navigate("/login");
  }, [navigate]);

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/academic`);
      setImages(response.data.images);
    } catch (error) {
     
    }
  };

  // Fetch academic data
  const fetchData = async () => {
    try {
      const data = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Experience",
        category: editedItem.category,
        subCategory: editedItem.subCategory,
      });
      setAcademic(data.data.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", "academic");
    formData.append("name", file.name);

    try {
      await axios.post(`${apiURL}images/new-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Image uploaded successfully!", "success");
      fetchImages();
    } catch (error) {
     
      Swal.fire("Error", "Failed to upload image.", "error");
    }
  };

  // Image delete handler
  const handleImageDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}images/delete-image/${id}`);
      setImages(images.filter((image) => image._id !== id));
      Swal.fire("Deleted!", "Image deleted successfully.", "success");
    } catch (error) {
     
      Swal.fire("Error", "Failed to delete image.", "error");
    }
  };

  // Create new academic item
  const handleCreate = async () => {
    const newAcademic = {
      type: "Experience",
      title: "",
      date: "",
      description: "",
      category: "Examination Boards",
      subCategory: "Bachelor",
    };

    try {
      const response = await axios.post(`${apiURL}info/add`, newAcademic);
      setAcademic([...academic, response.data.data]);
    } catch (error) {
     
    }
  };

  // Update academic item
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `${apiURL}info/update/${id}`,
        editedItem
      );

      const updatedAcademic = academic.map((item) =>
        item._id === id ? response.data.data : item
      );
      setAcademic(updatedAcademic);
      setEditMode(null);
      resetEditedItem();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete academic item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}info/delete/${id}`);
      setAcademic(academic.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Reset edited item
  const resetEditedItem = () => {
    setEditedItem({
      title: "",
      date: "",
      description: "",
      category: "Committees",
      subCategory: "Department",
    });
  };

  // Edit handler
  const handleEdit = (item) => {
    setEditMode(item._id);
    setEditedItem({ ...item });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bigContainer">
      <h2>Academic And Professional Experience</h2>

      <div className="image-container">
        <h3>Image Slider in Academic Experience</h3>
        <div className="image-upload">
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="image-list">
          {images.map((image) => (
            <div key={image._id} className="image-card">
              <img src={image.path} alt="Uploaded" className="uploaded-image" />
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

      <div className="academic-container">
        <button onClick={handleCreate} className="create-btn">
          Create New Academic
        </button>

        <div className="academic-list">
          {academic.map((item) => (
            <div key={item._id} className="academic-card">
              {editMode === item._id ? (
                <>
                  <h3>
                    <input
                      type="text"
                      name="title"
                      value={editedItem.title}
                      onChange={handleInputChange}
                      placeholder="Academic Title"
                    />
                  </h3>
                  <p>
                    <strong>Date:</strong>
                    <input
                      type="text"
                      name="date"
                      value={editedItem.date}
                      onChange={handleInputChange}
                      placeholder="Date"
                    />
                  </p>
                  <p>
                    <strong>Description:</strong>
                    <textarea
                      name="description"
                      value={editedItem.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                  </p>
                  <p>
                    <strong>Experience Type:</strong>
                    <select
                      name="category"
                      value={editedItem.category}
                      onChange={handleInputChange}
                    >
                      <option value="Committees">Committees</option>
                      <option value="Teaching">Teaching</option>
                      <option value="University Administrative Position">
                        University Administrative Position
                      </option>
                      <option value="Student Advising">
                        Student Advising
                      </option>
                      <option value="Examination Boards">
                        Examination Boards
                      </option>
                    </select>
                  </p>
                  {editedItem.category !==
                    "University Administrative Position" && (
                    <p>
                      <strong>Detailed Experience Type:</strong>
                      <select
                        name="subCategory"
                        value={editedItem.subCategory}
                        onChange={handleInputChange}
                      >
                        <option value="Department">Department</option>
                        <option value="School">School</option>
                        <option value="University">University</option>
                        <option value="International">International</option>
                        <option value="PHD">PHD</option>
                        <option value="Master">Master</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </p>
                  )}
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="mainBtn"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p>
                    <strong>Year:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <button
                    onClick={() => handleEdit(item)}
                    className="mainBtn"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(item._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academic;
