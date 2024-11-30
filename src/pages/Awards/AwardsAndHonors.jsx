import React, { useState, useEffect } from "react";
import "./AwardsAndHonors.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
const AwardsAndHonors = () => {
  const [awards, setAwards] = useState([]);
  const [countVisible, setCountVisible] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [editedAward, setEditedAward] = useState({
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

  const handleCreate = async () => {
    const newAward = {
      title: "",
      date: "",
      description: "",
      isVisible: 0,
      type: "Award",
    };

    try {
      const award = await axios.post(`${apiURL}info/add`, newAward);
      setAwards([...awards, award.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedReward = await axios.put(
        `${apiURL}info/update/${id}`,
        editedAward.isVisible && Number(countVisible) >= 3
          ? { ...editedAward, isVisible: false }
          : editedAward
      );

      const updatedAwards = awards.map((award) =>
        award._id === id ? { ...award, ...updatedReward.data.data } : award
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
        updatedAwards.filter((item) => {
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

      const updatedAwards = awards.filter((award) => award._id !== id);
      setAwards(updatedAwards);
      setCountVisible(
        awards.filter((item) => {
          return item.isVisible === true && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (award) => {
    setEditMode(award._id);
    setEditedAward({
      title: award.title,
      date: award.date,
      description: award.description,
      isVisible: award.isVisible,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAward((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchAwards = async () => {
    try {
      const awards = await axios.post(`${apiURL}info/get-infos-by-type`, {
        type: "Award",
      });
      setAwards(awards.data.data);
      setCountVisible(
        awards.data.data.filter((item) => {
          return item.isVisible === true && item;
        }).length
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchAwards();
  }, []);

  return (
    <div id="awards-container" className="awards-container">
      <h2>Awards and Honors</h2>

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
                    <option value={false}>no</option>
                    <option value={true}>yes</option>
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
                <button onClick={() => handleEdit(award)} className="mainBtn">
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
  );
};

export default AwardsAndHonors;
