import Nav from './Nav'
import HouseCard from './HouseCard'
import Filter from './Filter'

import axios from 'axios'
import { useEffect, useState } from 'react'

function Houses() {
  const [houses, setHouses] = useState([])

  const getHouses = async () => {
    let { data } = await axios.get('https://demo-api-bnb.onrender.com/houses')
    console.log('data----->', data[0])
    setHouses(data)
  }

  useEffect(() => {
    getHouses()
  }, [])

  const listOfHouseCards = houses.map((house, index) => (
    <HouseCard key={index} house={house} />
  ))
  return (
    <>
      <div className=" container mx-auto">
        <Nav />
        {/* pass the setHouses function to the Filters component as a prop */}
        <Filter setHouses={setHouses} />
        {/* loop through the houses array and render to HouseCard */}
        <div className="grid gap-4 grid-cols-5 mb-5">{listOfHouseCards}</div>
      </div>
    </>
  )
}

export default Houses
