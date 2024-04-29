import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faBed,
  faDollarSign,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState, useEffect } from 'react'

//received setHouses from Houses
function Filter({ setHouses }) {
  //use State Hook to store the array in a state variable locations
  const [locations, setLocations] = useState([])
  //functions
  // make an initial GET request to the /locations endpoint of the API
  const getLocation = async () => {
    let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/locations`)
    setLocations(data)
  }
  //function to prevent default then get data to api
  const submitForm = async (e) => {
    try {
      e.preventDefault()
      //making query for url
      //encodeURIComponent removes spaces between values
      let queryArray = []
      if (e.target.location.value) {
        queryArray.push(
          `location=${encodeURIComponent(e.target.location.value)}`
        )
      }
      if (e.target.min_rooms.value) {
        queryArray.push(`min_rooms=${e.target.min_rooms.value}`)
      }
      if (e.target.max_price.value) {
        queryArray.push(`max_price=${e.target.max_price.value}`)
      }
      if (e.target.sort.value) {
        queryArray.push(`sort=${e.target.sort.value}`)
      }
      if (e.target.search.value) {
        queryArray.push(`search=${e.target.search.value}`)
      }
      let url = `${process.env.REACT_APP_API_URL}/houses?${queryArray.join('&')}`
      const response = await axios.get(url)
      setHouses(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])
  return (
    <div>
      {/* Location */}
      <form
        className="flex flex-col justify-between gap-2"
        onSubmit={submitForm}
      >
        <div className="flex-1 relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon icon={faHouse} className="text-xs" />
          </div>
          {/* Set "Any Location"  value  to an empty string to avoid
          searching for houses with a location of "Any Location" */}
          <select
            name="location"
            className="border border-gray-300 rounded ps-9 w-full p-2"
          >
            {/* map the array of locations*/}
            <option value="">Any Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Rooms */}
        <div className="flex-1 relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon icon={faBed} className="text-xs" />
          </div>
          <select
            name="min_rooms"
            className="border border-gray-300 rounded ps-9 w-full p-2"
          >
            <option value="">Any Rooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        {/* Prices */}
        <div className="flex-1 relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon icon={faDollarSign} className="text-xs" />
          </div>
          <input
            name="max_price"
            type="number"
            placeholder="max price"
            className="border border-gray-300 rounded ps-9 w-full p-2"
          />
        </div>

        {/* Sort by */}
        <div className="flex-1 relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon icon={faSort} className="text-xs" />
          </div>
          <select
            name="sort"
            className="border border-gray-300 rounded ps-9 w-full p-2"
          >
            <option value="">sort by</option>
            <option value="price">price: low to high</option>
            <option value="rooms">rooms: high to low</option>
          </select>
        </div>

        {/* Keywords */}
        <input
          name="search"
          type="text"
          placeholder="keywords..."
          className="border border-gray-300 rounded ps-9 w-full p-2"
        />

        {/* button */}
        <button className=" bg-rose-400 text-white border rounded ps-9 w-full p-2">
          Search
        </button>
      </form>
    </div>
  )
}

export default Filter
