import React, { useState } from "react";
import "./TrainingAndMember.css";
import { v4 as uuidv4 } from "uuid";
const TrainingAndMember = () => {
  const [training, setTraining] = useState([
    {
      id: uuidv4(),
      title: "React Training",
      year: "2023",
      description: "Comprehensive React.js training program.",
      showTitle: 0,
    },
    {
      id: uuidv4(),
      title: "JavaScript Bootcamp",
      year: "2022",
      description: "Intensive JavaScript learning experience.",
      showTitle: 0,
    },
    {
      id: uuidv4(),
      title: "Frontend Membership",
      year: "2021",
      description: "Exclusive membership for frontend developers.",
      showTitle: 1,
    },
  ]);

  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    year: "",
    description: "",
    showTitle: "",
  });

  const handleCreate = () => {
    const newTraining = {
      id: uuidv4(),
      title: "",
      year: "",
      description: "",
      showTitle: "",
    };
    setTraining([...training, newTraining]);
  };

  const handleUpdate = (id) => {
    const updatedTraining = training.map((item) =>
      item.id === id ? { ...item, ...editedItem } : item
    );
    setTraining(updatedTraining);
    setEditMode(null);
    setEditedItem({ title: "", year: "", description: "", showTitle: "" });
  };

  const handleDelete = (id) => {
    const updatedTraining = training.filter((item) => item.id !== id);
    setTraining(updatedTraining);
  };

  const handleEdit = (item) => {
    setEditMode(item.id);
    setEditedItem({
      title: item.title,
      year: item.year,
      description: item.description,
      showTitle: item.showTitle,
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
          <div key={item.id} className="training-card">
            {editMode === item.id ? (
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
                    name="year"
                    value={editedItem.year}
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
                    name="showTitle"
                    value={editedItem.showTitle}
                    onChange={handleInputChange}
                  >
                    <option value="1">yes</option>
                    <option value="0">no</option>
                  </select>
                </p>
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="mainBtn"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <h3>{item.title}</h3>
                <p>
                  <strong>Year:</strong> {item.year}
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
              onClick={() => handleDelete(item.id)}
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
