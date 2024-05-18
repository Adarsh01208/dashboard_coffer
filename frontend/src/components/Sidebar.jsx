import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const handleMouseEnter = (componentName) => {
    setHoveredComponent(componentName);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  return (
    <div className="h-screen w-64 fixed bg-gray-800 text-white p-5" style={{ zIndex: 1, top: '4rem' }}>
      <h2 cl className="text-2xl m-5 font-bold text-center">Dashboard</h2>
      
      <ul className='text-center'>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Home' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Home')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/">Home</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Intensity' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Intensity')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/intensity">Intensity</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Region' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Region')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/region">Region</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Topics' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Topics')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/topics">Topics</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Relevance' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Relevance')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/relevance">Relevance</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Sector' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Sector')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/sector">Sector</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Likelihood' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Likelihood')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/likelihood">Likelihood</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Country' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Country')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/country">Country</Link>
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'Year' ? 'bg-gray-700' : ''}`}
          onMouseEnter={() => handleMouseEnter('Year')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/year">Year</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;