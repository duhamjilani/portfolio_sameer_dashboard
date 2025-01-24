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
 const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [counter5, setCounter5] = useState("");
  const [counter6, setCounter6] = useState("");
  const [counter7, setCounter7] = useState("");
  const [counter8, setCounter8] = useState("");
  const [counter9, setCounter9] = useState("");
 
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
    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter2",
    })
    .then((response) => {
      const AcademicCounter2 = response.data.data.content;
     
      setCounter2(AcademicCounter2);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });

    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter3",
    })
    .then((response) => {
      const AcademicCounter3 = response.data.data.content;
     
      setCounter3(AcademicCounter3);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });




    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter4",
    })
    .then((response) => {
      const AcademicCounter4 = response.data.data.content;
     
      setCounter4(AcademicCounter4);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter5",
    })
    .then((response) => {
      const AcademicCounter5 = response.data.data.content;
     
      setCounter5(AcademicCounter5);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter6",
    })
    .then((response) => {
      const AcademicCounter6 = response.data.data.content;
     
      setCounter6(AcademicCounter6);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter7",
    })
    .then((response) => {
      const AcademicCounter7 = response.data.data.content;
     
      setCounter7(AcademicCounter7);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter7",
    })
    .then((response) => {
      const AcademicCounter7 = response.data.data.content;
     
      setCounter7(AcademicCounter7);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter8",
    })
    .then((response) => {
      const AcademicCounter8 = response.data.data.content;
     
      setCounter8(AcademicCounter8);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });



    axios
    .post(`${apiURL}content/get-content`, {
      page: "academic",
      section: "AcademicCounter9",
    })
    .then((response) => {
      const AcademicCounter9 = response.data.data.content;
     
      setCounter9(AcademicCounter9);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // alert("Something went wrong while fetching data.");
    });







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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${apiURL}content/update`, {
        page: "academic",
        section: "AcademicCounter1",
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
        page: "academic",
        section: "AcademicCounter2",
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
        page: "academic",
        section: "AcademicCounter3",
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
        page: "academic",
        section: "AcademicCounter4",
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
        page: "academic",
        section: "AcademicCounter5",
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
        page: "academic",
        section: "AcademicCounter6",
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
        page: "academic",
        section: "AcademicCounter7",
        content: counter7,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });


      axios
      .put(`${apiURL}content/update`, {
        page: "academic",
        section: "AcademicCounter8",
        content: counter8,
      })
      .then(() => {
        Swal.fire("Success", "Projects updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update projects.", "error");
      });




      axios
      .put(`${apiURL}content/update`, {
        page: "academic",
        section: "AcademicCounter9",
        content: counter9,
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

      <form method="post" enctype="multipart/form-data">
        <div className="counters">
          <label>
           Undergraduate Courses Taught 
            <input
              type="text"
              value={counter1}
             
              onChange={(e) => setCounter1(e.target.value)}
            />
          </label>
          <label>
         Graduate Courses Taught 
            <input
              type="text"
              value={counter2}
              onChange={(e) => setCounter2(e.target.value)}
            />
          </label>
          <label>
         Teaching Cooperation 
            <input
              type="text"
              value={counter3}
              onChange={(e) => setCounter3(e.target.value)}
            />
          </label>
          <label>
          Bachelor Students Advising 
            <input
              type="text"
              value={counter4}
              onChange={(e) => setCounter4(e.target.value)}
            />
          </label>
          <label>
          Master Students Advising  
            <input
              type="text"
              value={counter5}
              onChange={(e) => setCounter5(e.target.value)}
            />
          </label>
          <label>
          Doctorate Students Advising 
            <input
              type="text"
              value={counter6}
              onChange={(e) => setCounter6(e.target.value)}
            />
          </label>
          <label>
          Committees
            <input
              type="text"
              value={counter7}
              onChange={(e) => setCounter7(e.target.value)}
            />
          </label>

          <label>
          Admin Positions 
            <input
              type="text"
              value={counter8}
              onChange={(e) => setCounter8(e.target.value)}
            />
          </label>
          <label>
          Examination Boards 
            <input
              type="text"
              value={counter9}
              onChange={(e) => setCounter9(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" className="mainBtn" onClick={handleSubmit} />
      </form>






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
