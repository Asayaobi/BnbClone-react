import Nav from './Nav'
import HouseCard from './HouseCard'
import Filter from './Filter'

import axios from 'axios'
import { useEffect, useState } from 'react'

function Houses() {
  const [houses, setHouses] = useState([])

  const getHouses = async () => {
    let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/houses`)
    setHouses(data)
  }

  useEffect(() => {
    getHouses()
  }, [])

  const listOfHouseCards = houses.map((house, index) => (
    <HouseCard
      key={index}
      house={{ ...house, price: house.price || house.price_per_night }}
    />
  ))

  return (
    <>
      <div className="container px-2 md:mx-auto">
        <Nav />
        {/* pass the setHouses function to the Filters component as a prop */}
        <Filter setHouses={setHouses} />
        {/* loop through the houses array and render to HouseCard */}
        <div className="grid gap-4 mb-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {listOfHouseCards}
        </div>
      </div>
    </>
  )
}

export default Houses
