import React, { useEffect, useState } from "react";
import "./TrainingAndMember.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const TrainingAndMember = () => {
  const [training, setTraining] = useState([]);
  const [countVisible, setCountVisible] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    date: "",
    description: "",
    isVisible: false,
    location:"",
  });
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  // Fetch banner image
  const fetchBannerImage = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/training`);
      setBannerImage(response.data.images[0]);
      console.log(response.data.images[0].path);
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
    formData.append("page", "training");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`${apiURL}content/update`, {
        page: "Training",
        section: "TaughtCoursesCounter1",
        content: counter1,
      })
      .then(() => {
        Swal.fire("Success", " updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update ", "error");
      });

    axios
      .put(`${apiURL}content/update`, {
        page: "Training",
        section: "SupervisedCoSupervisedThesesCounter2",
        content: counter2,
      })
      .then(() => {
        Swal.fire("Success", " updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update ", "error");
      });
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

  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "Training",
        section: "SupervisedCoSupervisedThesesCounter2",
      })
      .then((response) => {
        const SupervisedCoSupervisedThesesCounter2 = response.data.data.content;
        console.log(response.data)
        setCounter2(SupervisedCoSupervisedThesesCounter2);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
    axios
      .post(`${apiURL}content/get-content`, {
        page: "Training",
        section: "TaughtCoursesCounter1",
      })
      .then((response) => {
        const TaughtCoursesCounter1 = response.data.data.content;
        setCounter1(TaughtCoursesCounter1);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
  };

  const handleFetchData = async () => {
    try {
      const data = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Training",
      });
      setTraining(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchData();
    fetchBannerImage();
    fetchData();
  }, []);

  const handleCreate = async () => {
    const newTraining = {
      type: "Training",
      title: "",
      date: "",
      description: "",
      isVisible: false,
      location:""
    };

    try {
      const trainings = await axios.post(`${apiURL}info/add`, newTraining);
      setTraining([...training, trainings.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedReward = await axios.put(
        `${apiURL}info/update/${id}`,
        editedItem.isVisible && Number(countVisible) >= 10
          ? { ...editedItem, isVisible: false }
          : editedItem
      );

      const updatedTraining = training.map((item) =>
        item._id === id ? updatedReward.data.data : item
      );
      setTraining(updatedTraining);
      setEditMode(null);
      setEditedItem({ title: "", date: "", description: "", isVisible: false, location:"" });
      setCountVisible(
        updatedTraining.filter((item) => {
          return item.isVisible && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}info/delete/${id}`);

      const updatedAwards = training.filter((award) => award._id !== id);
      setTraining(updatedAwards);
      setCountVisible(
        updatedAwards.filter((item) => {
          return item.isVisible === true && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditMode(item._id);
    setEditedItem({
      title: item.title,
      date: item.date,
      description: item.description,
      isVisible: item.isVisible,
      location:item.location
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bigContainer">
      <h2>Training and Membership</h2>
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
      <form method="post" enctype="multipart/form-data">
        <div className="counters">
          <label>
            Taught Courses at All Levels
            <input
              type="text"
              value={counter1}
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          <label>
            Supervised & Co-supervised Theses
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" className="mainBtn" onClick={handleSubmit} />
      </form>
      <div id="training-container" className="training-container">
        <button onClick={handleCreate} className="create-btn">
          Create New Training/Membership
        </button>

        <div className="training-list">
          {training.map((item) => (
            <div key={item._id} className="training-card">
              {editMode === item._id ? (
                <>
                  <h3>
                    <input
                      type="text"
                      name="title"
                      value={editedItem.title}
                      onChange={handleInputChange}
                      placeholder="Training/Membership Title"
                    />
                  </h3>
                  <p>
                    <strong>Year:</strong>
                    <input
                      type="text"
                      name="date"
                      value={editedItem.date}
                      onChange={handleInputChange}
                      placeholder="Year"
                    />
                  </p>

                  <p>
                    <strong>location:</strong>
                    <textarea
                      name="location"
                      value={editedItem.location}
                      onChange={handleInputChange}
                      placeholder="Training/Membership location"
                    />
                  </p>


                  <p>
                    <strong>Description:</strong>
                    <textarea
                      name="description"
                      value={editedItem.description}
                      onChange={handleInputChange}
                      placeholder="Training/Membership Description"
                    />
                  </p>
                  <p>
                    <strong>Visible title on home page:</strong>
                    <select
                      name="isVisible"
                      value={editedItem.isVisible}
                      onChange={handleInputChange}
                    >
                      <option value={false}>no</option>
                      <option value={true}>yes</option>
                    </select>
                  </p>
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
                  <button onClick={() => handleEdit(item)} className="mainBtn">
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

export default TrainingAndMember;
