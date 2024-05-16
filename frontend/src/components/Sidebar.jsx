import React, { useState } from 'react'

const Sidebar = ({ setSelectedComponent }) => {
    const [hoveredComponent, setHoveredComponent] = useState(null);

    const handleComponentSelect = (componentName) => {
      setSelectedComponent(componentName);
    };
  
    const handleMouseEnter = (componentName) => {
      setHoveredComponent(componentName);
    };
  
    const handleMouseLeave = () => {
      setHoveredComponent(null);
    };
  
  
  return (
    <>
     <div className="h-screen w-64 fixed bg-gray-800 text-white p-5"style={{ zIndex: 1, top: '4rem'  }}>
      <h2 className="text-2xl mb-5">Dashboard Components</h2>
      <ul>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'IntensityChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('IntensityChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('IntensityChart')}
        >
          Intensity Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'LikelihoodRadarChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('LikelihoodRadarChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('LikelihoodRadarChart')}
        >
          Likelihood Radar Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'RelevanceBubbleChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('RelevanceBubbleChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('RelevanceBubbleChart')}
        >
          Relevance Bubble Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'YearChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('YearChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('YearChart')}
        >
          Year Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'CountryChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('CountryChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('CountryChart')}
        >
          Country Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'TopicsRadarChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('TopicsRadarChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('TopicsRadarChart')}
        >
          Topics Radar Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'RegionChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('RegionChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('RegionChart')}
        >
          Region Chart
        </li>
        <li 
          className={`mb-3 px-4 py-2 rounded cursor-pointer ${hoveredComponent === 'PieChart' ? 'bg-gray-700' : ''}`} 
          onMouseEnter={() => handleMouseEnter('PieChart')} 
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleComponentSelect('PieChart')}
        >
          Pie Chart
        </li>
      </ul>
    </div>

    </>
  )
}

export default Sidebar