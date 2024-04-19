import { useState, useEffect } from "react"

const ChooseFood = () => {
  const [JSONResponse, setJSONResponse] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3500/foodImages');
      const jsonData = await response.json();
      console.log(jsonData);
      setJSONResponse(jsonData);
    }
    fetchData();
  }, []);


  // http://http://localhost:3500/foodImages
  return (
    <div className='border h-48 grid grid-cols-12 grid-flow-row overflow-y-auto'>
      {JSONResponse.map((image, index) => (
        <img
          key={index}
          src={'http://localhost:3500/foodImages/' + image}
          className="w-full"
        />
      ))}
    </div>
  )
}

export default ChooseFood