import React, { useEffect, useState } from "react";
import "./Research.css";
import axios from "axios";
import { apiURL } from "../../constants/apiURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    by: "",
  });
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [counter5, setCounter5] = useState("");
  const [counter6, setCounter6] = useState("");
  const [counter7, setCounter7] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const navigate = useNavigate();

  // Fetch banner image
  const fetchBannerImage = async () => {
    try {
      const response = await axios.get(`${apiURL}images/getImages/research`);
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
    formData.append("page", "research");
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

  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchData = () => {
    axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "i10IndexCounter1",
      })
      .then((response) => {
        const i10IndexCounter1 = response.data.data.content;
       
        setCounter1(i10IndexCounter1);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });


      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "CitationsCounter2",
      })
      .then((response) => {
        const CitationsCounter2 = response.data.data.content;
        
        setCounter2(CitationsCounter2);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "hIndexCounter3",
      })
      .then((response) => {
        const hIndexCounter3 = response.data.data.content;
        
        setCounter3(hIndexCounter3);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });


      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "PermanentJournalEditorRoleCounter4",
      })
      .then((response) => {
        const PermanentJournalEditorRoleCounter4 = response.data.data.content;
        
        setCounter4(PermanentJournalEditorRoleCounter4);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "RefereeingPublicationsCounter5",
      })
      .then((response) => {
        const RefereeingPublicationsCounter5 = response.data.data.content;
       
        setCounter5(RefereeingPublicationsCounter5);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });

      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "GuestEditedSpecialIssuesCounter6",
      })
      .then((response) => {
        const GuestEditedSpecialIssuesCounter6 = response.data.data.content;
        
        setCounter6(GuestEditedSpecialIssuesCounter6);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
      




      axios
      .post(`${apiURL}content/get-content`, {
        page: "Research",
        section: "PublicationsInHighQualityJournalsConferencesCounter7",
      })
      .then((response) => {
        const PublicationsInHighQualityJournalsConferencesCounter7 = response.data.data.content;
       
        setCounter7(PublicationsInHighQualityJournalsConferencesCounter7);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // alert("Something went wrong while fetching data.");
      });
    
  };


 
  
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
    fetchBannerImage();
    fetchData();
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
      by: "",
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
        by: "",
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
      by: item.by,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "i10IndexCounter1",
        content: counter1,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });


      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "CitationsCounter2",
        content: counter2,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });


      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "hIndexCounter3",
        content: counter3,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });


      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "PermanentJournalEditorRoleCounter4",
        content: counter4,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });


      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "RefereeingPublicationsCounter5",
        content: counter5,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });

      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "GuestEditedSpecialIssuesCounter6",
        content: counter6,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });



      axios
      .put(`${apiURL}content/update`, {
        page: "Research",
        section: "PublicationsInHighQualityJournalsConferencesCounter7",
        content: counter7,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });

   
  };





  return (
    <div className="bigContainer">
      <h2>Research</h2>
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
            i-10 Index (Dec 2024)
            <input
              type="text"
              value={counter1}
             
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          <label>
            Citations (Dec 2024)
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>
          <label>
            h-index (Scopus, Dec 2024)
            <input
              type="text"
              value={counter3}
              onChange={(e) => setCounter3(e.target.value)}
            />
          </label>
          <label>
            Permanent Journal Editor Role
            <input
              type="text"
              value={counter4}
              onChange={(e) => setCounter4(e.target.value)}
            />
          </label>
          <label>
            Guest-Edited Special Issues
            <input
              type="text"
              value={counter5}
              onChange={(e) => setCounter5(e.target.value)}
            />
          </label>
          <label>
            Refereeing Publications
            <input
              type="text"
              value={counter6}
              onChange={(e) => setCounter6(e.target.value)}
            />
          </label>
          <label>
            Publications in High-Quality Journals & Conferences
            <input
              type="text"
              value={counter7}
              onChange={(e) => setCounter7(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" className="mainBtn" onClick={handleSubmit} />
      </form>

      <div id="research-container" className="research-container">
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
                    <strong>By:</strong>
                    <textarea
                      name="by"
                      value={editedItem.by}
                      onChange={handleInputChange}
                      placeholder="Research by"
                    />
                  </p>
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
                    <strong>Journal Name:</strong>
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
                    <strong>by:</strong> {item.by}
                  </p>
                  <p>
                    <strong>Journal Name:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
    </div>
  );
};

export default Research;
