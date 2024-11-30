import React, { useEffect, useState } from "react";
import "./Research.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
const Research = () => {
  const [researchList, setResearchList] = useState([]);
  const [countVisible, setCountVisible] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    date: "",
    description: "",
    link: "",
    isVisible: false,
    category: "Journal",
  });

  const handleFetchResearchs = async () => {
    try {
      const researchs = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Research",
      });

      setResearchList(researchs.data.data);
      setCountVisible(
        researchs.data.data.filter((item) => {
          return item.isVisible === true && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchResearchs();
  }, []);

  const handleCreate = async () => {
    const newResearch = {
      type: "Research",
      title: "",
      date: "",
      description: "",
      link: "",
      category: "Journal",
      isVisible: false,
    };

    try {
      const research = await axios.post(`${apiURL}info/add`, newResearch);
      setResearchList([...researchList, research.data.data]);
      setCountVisible(
        [...researchList, research.data.data].filter((item) => {
          return item.isVisible === true && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const research = await axios.put(
        `${apiURL}info/update/${id}`,
        editedItem.isVisible && Number(countVisible) >= 3
          ? { ...editedItem, isVisible: false }
          : editedItem
      );
      const updatedResearch = researchList.map((item) =>
        item._id === id ? research.data.data : item
      );
      setResearchList(updatedResearch);
      setEditMode(null);
      setEditedItem({
        title: "",
        date: "",
        description: "",
        link: "",
        isVisible: false,
        category: "Journal",
      });

      setCountVisible(
        updatedResearch.filter((item) => {
          return item.isVisible && item;
        }).length
      );
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}info/delete/${id}`);
      const updatedResearch = researchList.filter((item) => item._id !== id);
      setResearchList(updatedResearch);
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
      link: item.link,
      isVisible: item.isVisible,
      category: item.category,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="research-container" className="research-container">
      <h2>Research</h2>

      <button onClick={handleCreate} className="create-btn">
        Create New Research
      </button>

      <div className="research-list">
        {researchList.map((item, index) => (
          <div key={item._id} className="research-card">
            <div className="research-card-counter">{index + 1}</div>
            {editMode === item._id ? (
              <>
                <h3>
                  <input
                    type="text"
                    name="title"
                    value={editedItem.title}
                    onChange={handleInputChange}
                    placeholder="Research Title"
                  />
                </h3>
                <p>
                  <strong>Date:</strong>
                  <input
                    type="text"
                    name="date"
                    value={editedItem.date}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Description:</strong>
                  <textarea
                    name="description"
                    value={editedItem.description}
                    onChange={handleInputChange}
                    placeholder="Research Description"
                  />
                </p>
                <p>
                  <strong>Link:</strong>
                  <input
                    type="url"
                    name="link"
                    value={editedItem.link}
                    onChange={handleInputChange}
                    placeholder="Research Link"
                  />
                </p>
                <p>
                  <strong>Type:</strong>
                  <select
                    name="category"
                    value={editedItem.category}
                    onChange={handleInputChange}
                  >
                    <option value="Book Chapter">Book Chapter</option>
                    <option value="Others">Others</option>
                    <option value="Journal">Journal</option>
                    <option value="Conference">Conference</option>
                  </select>
                </p>
                <p>
                  <strong>Visible on home page:</strong>
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
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </p>
                <p>
                  <strong>Type:</strong> {item.category}
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

export default Research;
