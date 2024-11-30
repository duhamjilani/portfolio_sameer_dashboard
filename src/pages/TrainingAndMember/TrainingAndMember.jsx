import React, { useEffect, useState } from "react";
import "./TrainingAndMember.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
const TrainingAndMember = () => {
  const [training, setTraining] = useState([]);
  const [countVisible, setCountVisible] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    date: "",
    description: "",
    isVisible: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/login");
    }
  }, []);

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
  }, []);

  const handleCreate = async () => {
    const newTraining = {
      type: "Training",
      title: "",
      date: "",
      description: "",
      isVisible: false,
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
      setEditedItem({ title: "", date: "", description: "", isVisible: false });
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
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="training-container" className="training-container">
      <h2>Training and Membership</h2>

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
  );
};

export default TrainingAndMember;
