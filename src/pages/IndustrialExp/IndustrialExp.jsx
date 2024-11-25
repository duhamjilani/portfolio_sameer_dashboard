import React, { useState } from 'react';
import './IndustrialExp.css';

const IndustrialExpHome = () => {
  const [industrialExperience, setIndustrialExperience] = useState([
    { title1: '', date: '', title2: '', description: '' },
    { title1: '', date: '', title2: '', description: '' },
    { title1: '', date: '', title2: '', description: '' },
    { title1: '', date: '', title2: '', description: '' },
  ]);

  const handleChange = (e, index, field) => {
    const updatedExperience = [...industrialExperience];
    updatedExperience[index][field] = e.target.value;
    setIndustrialExperience(updatedExperience);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Industrial Experience:', industrialExperience);
   
  };

  return (
    <div id='industrialExperience' className='industrial-experience-container'>
      <h3>Industrial Experience</h3>
      <form onSubmit={handleSubmit}>
        {industrialExperience.map((exp, index) => (
          <div className="experience-entry" key={index}>
            <label>
              Title 1 {index + 1}:
              <input
                type="text"
                value={exp.title1}
                onChange={(e) => handleChange(e, index, 'title1')}
                required
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={exp.date}
                onChange={(e) => handleChange(e, index, 'date')}
                required
              />
            </label>
            <label>
              Title 2 {index + 1}:
              <input
                type="text"
                value={exp.title2}
                onChange={(e) => handleChange(e, index, 'title2')}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(e, index, 'description')}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit" className="mainBtn">Update</button>
      </form>
    </div>
  );
};

export default IndustrialExpHome;
