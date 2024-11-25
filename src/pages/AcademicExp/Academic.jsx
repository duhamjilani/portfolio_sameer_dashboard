import {React,useState }from 'react'
import './Academic.css'
import { v4 as uuidv4 } from 'uuid';
const Academic = () => {
  const [academic, setAcademic] = useState([
    { id: uuidv4(), title: 'React Training', date: '2023', description: 'Comprehensive React.js training program.',experienceType:5},
    { id: uuidv4(), title: 'JavaScript Bootcamp', date: '2022', description: 'Intensive JavaScript learning experience.',experienceType:1 },
    { id: uuidv4(), title: 'Frontend Membership', date: '2021', description: 'Exclusive membership for frontend developers.',experienceType:4 },
  ]);

  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({ title: '', date: '', description: '',experienceType:'' });

  const handleCreate = () => {
    const newAcademic = {
      id:  uuidv4(),
      title: '',
      date: '',
      description: '',
      experienceType:''
    };
     setAcademic([...academic, newAcademic]);

  };

  const handleUpdate = (id) => {
    const updatedAcademic = academic.map((item) =>
      item.id === id ? { ...item, ...editedItem } : item
    );
    setAcademic(updatedAcademic);
    setEditMode(null);
    setEditedItem({ title: '', date: '', description: '',experienceType:'' });
  };

  const handleDelete = (id) => {
    const updatedAcademic = academic.filter((item) => item.id !== id);
    setAcademic(updatedAcademic);
  };

  const handleEdit = (item) => {
    setEditMode(item.id);
    setEditedItem({ title: item.title, date: item.date, description: item.description ,experienceType:item.experienceType});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div className='academic-container'>
       <h2>Academic And Professional Experience</h2>
       <button onClick={handleCreate} className="create-btn">Create New Academic</button>

<div className="academic-list">
  {academic.map((item) => (
    <div key={item.id} className="academic-card">
      {editMode === item.id ? (
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
              name="experienceType"
              value={editedItem.experienceType}
              onChange={handleInputChange}
            >
              
              <option value='1'>Committees</option>
              <option value='2'>Teaching</option>
              <option value='3'>University Administrative Position</option>
              <option value='4'>Student Advising</option>
              <option value='5'>Examination Boards</option>
            </select>
          </p>


          
          <button onClick={() => handleUpdate(item.id)} className="mainBtn">Update</button>
        </>
      ) : (
        <>
          <h3>{item.title}</h3>
          <p><strong>Year:</strong> {item.year}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <button onClick={() => handleEdit(item)} className="mainBtn">Edit</button>
        </>
      )}
      <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
    </div>
  ))}
</div>
    </div>
  )
}

export default Academic
