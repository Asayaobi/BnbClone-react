import Nav from './Nav'
import HouseCard from './HouseCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
axios.defaults.withCredentials = true

function Bookings() {
  const [bookings, setBookings] = useState([])

  // function to get bookings
  const getBookings = async (e) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings`
      )
      setBookings(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  // Use the useEffect hook to trigger the getBookings function when the component loads
  useEffect(() => {
    getBookings()
  }, [])

  const listOfBookings = bookings.map((booking, index) => (
    <HouseCard key={index} house={booking} isBooking={true} />
  ))
  return (
    <div className="container px-2 md:mx-auto">
      <Nav />
      <div className="grid gap-4 mb-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {listOfBookings}
      </div>
    </div>
  )
}
export default Bookings
