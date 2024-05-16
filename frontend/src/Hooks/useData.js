import { useState, useEffect } from 'react';

const useData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.toString());
    }
  };

  return { data, error };
};

export default useData;