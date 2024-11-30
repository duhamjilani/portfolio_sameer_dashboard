import { React, useEffect, useState } from "react";
import "./Academic.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
const Academic = () => {
  const [academic, setAcademic] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Experience",
        category: editedItem.categoty,
        subCategory: editedItem.subCategory,
      });

      setAcademic(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: "",
    date: "",
    description: "",
    category: "",
    subCategory: "",
  });

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
      const fetchAcademic = await axios.post(`${apiURL}info/add`, newAcademic);
      setAcademic([...academic, fetchAcademic.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const fetchAcademic = await axios.put(
        `${apiURL}info/update/${id}`,
        editedItem
      );

      const updatedAcademic = academic.map((item) =>
        item._id === id ? fetchAcademic.data.data : item
      );
      setAcademic(updatedAcademic);
      setEditMode(null);
      setEditedItem({
        title: "",
        date: "",
        description: "",
        category: "Committees",
        subCategory: "Department",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}info/delete/${id}`);

      const updatedAcademic = academic.filter((item) => item._id !== id);
      setAcademic(updatedAcademic);
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
      category: item.category,
      subCategory: item.subCategory,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="academic-container">
      <h2>Academic And Professional Experience</h2>
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
                    placeholder="date"
                  />
                </p>
                <p>
                  <strong>Description:</strong>
                  <textarea
                    name="description"
                    value={editedItem.description}
                    onChange={handleInputChange}
                    placeholder="Academic description"
                  />
                </p>
                <p>
                  <strong>Experience type :</strong>
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
                    <option value="Student Advising">Student Advising</option>
                    <option value="Examination Boards">
                      Examination Boards
                    </option>
                  </select>
                </p>
                {editedItem.category !==
                  "University Administrative Position" && (
                  <p>
                    <strong> detailed Experience type :</strong>
                    <select
                      name="subCategory"
                      value={editedItem.subCategory}
                      onChange={handleInputChange}
                    >
                      <option value="Department">Department</option>
                      <option value="School">School</option>
                      <option value="University">University </option>
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

export default Academic;
