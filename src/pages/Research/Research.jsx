import React, { useState } from 'react';
import './Research.css';
import { v4 as uuidv4 } from 'uuid';
const Research = () => {
  const [researchList, setResearchList] = useState([
    {
      id: uuidv4(),
      title: 'AI and Ethics',
      date: '2023-09-01',
      description: 'Exploring the ethical implications of AI.',
      link: 'https://example.com/ai-ethics',
      type: 'Journal',
      visible:0
    },
    {
      id: uuidv4(),
      title: 'Quantum Computing Advances',
      date: '2022-06-15',
      description: 'A comprehensive study on quantum computing.',
      link: 'https://example.com/quantum-computing',
      type: 'Conference',
      visible:1
    },
  ]);

  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState({
    title: '',
    date: '',
    description: '',
    link: '',
    type: '',
    visible:''
  });

  const handleCreate = () => {
    const newResearch = {
      id: uuidv4(),
      title: '',
      date: '',
      description: '',
      link: '',
      type: 'Journal', 
       visible:''
    };
    setResearchList([...researchList, newResearch]);
  };

  const handleUpdate = (id) => {
    const updatedResearch = researchList.map((item) =>
      item.id === id ? { ...item, ...editedItem } : item
    );
    setResearchList(updatedResearch);
    setEditMode(null);
    setEditedItem({ title: '', date: '', description: '', link: '', type: '',visible:'' });
  };

  const handleDelete = (id) => {
    const updatedResearch = researchList.filter((item) => item.id !== id);
    setResearchList(updatedResearch);
  };

  const handleEdit = (item) => {
    setEditMode(item.id);
    setEditedItem({
      title: item.title,
      date: item.date,
      description: item.description,
      link: item.link,
      type: item.type,
      visible:item.visible
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
        {researchList.map((item) => (
          <div key={item.id} className="research-card">
            {editMode === item.id ? (
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
                    type="date"
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
                    name="type"
                    value={editedItem.type}
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
                    name="visible"
                    value={editedItem.visible}
                    onChange={handleInputChange}
                  >
                    
                    <option value='1'>yes</option>
                    <option value='0'>no</option>
                  </select>
                </p>
                <button onClick={() => handleUpdate(item.id)} className="mainBtn">
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
                  <strong>Link:</strong>{' '}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </p>
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
                <button onClick={() => handleEdit(item)} className="mainBtn">
                  Edit
                </button>
              </>
            )}
            <button onClick={() => handleDelete(item.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;

