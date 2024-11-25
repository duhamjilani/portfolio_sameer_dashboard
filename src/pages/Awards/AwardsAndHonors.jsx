import React, { useState ,useEffect} from 'react';
import './AwardsAndHonors.css';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
const AwardsAndHonors = () => {
  const [awards, setAwards] = useState([
    { id: uuidv4(), title: 'Best Developer', year: '2023', description: 'Awarded for outstanding contribution to software development.',visible:1 },
    { id: uuidv4(), title: 'Employee of the Year', year: '2022', description: 'Awarded for exceptional performance throughout the year.' ,visible:1},
    { id: uuidv4(), title: 'Innovator of the Year', year: '2021', description: 'Awarded for innovative solutions and creative problem-solving.',visible:0 },
  ]);

  const [editMode, setEditMode] = useState(null); 
  const [editedAward, setEditedAward] = useState({ title: '', year: '', description: '',visible:'' }); 

  
  const handleCreate = () => {
    const newAward = {
      id: awards.length + 1,  
      title: '',
      year: '',
      description: '',
      visible:0
    };
    setAwards([...awards, newAward]);
  };

 
  const handleUpdate = (id) => {
    const updatedAwards = awards.map((award) =>
      award.id === id ? { ...award, ...editedAward } : award
    );
    setAwards(updatedAwards);
    setEditMode(null); 
    setEditedAward({ title: '', year: '', description: '',visible:0 }); 
  };

 
  const handleDelete = (id) => {
    const updatedAwards = awards.filter((award) => award.id !== id);
    setAwards(updatedAwards);
  };

  
  const handleEdit = (award) => {
    setEditMode(award.id); 
    setEditedAward({ title: award.title, year: award.year, description: award.description ,visible:award.visible}); 
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAward((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="awards-container" className="awards-container">
      <h2>Awards and Honors</h2>

     
      <button onClick={handleCreate} className="create-btn">Create New Award</button>

     
      <div className="awards-list">
        {awards.map((award) => (
          <div key={award.id} className="award-card">
            {editMode === award.id ? (
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
                    name="year"
                    value={editedAward.year}
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
                    name="visible"
                    value={award.visible}
                    onChange={handleInputChange}
                  >
                    
                    <option value='1'>yes</option>
                    <option value='0'>no</option>
                  </select>
                </p>
                <button onClick={() => handleUpdate(award.id)} className="mainBtn">Update Award</button>
              </>
            ) : (
              <>
               
                <h3>{award.title}</h3>
                <p><strong>Year:</strong> {award.year}</p>
                <p><strong>Description:</strong> {award.description}</p>
                <button onClick={() => handleEdit(award)} className="mainBtn">Edit Award</button>
              </>
            )}

           
            <button onClick={() => handleDelete(award.id)} className="delete-btn">
              Delete Award
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsAndHonors;
