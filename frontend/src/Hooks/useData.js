
import{ useState, useEffect } from 'react'
const useData = () => {

    const [data, setData] = useState();

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        const data = await fetch('http://localhost:8000/data')
        const json = await data.json();
      //  console.log(json);
        setData(json);
    }
    return data;
}
export default useData ;
