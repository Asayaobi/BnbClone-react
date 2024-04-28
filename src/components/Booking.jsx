import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

function Booking({ house }) {
  //creating variables for getting booking date
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [booked, hasBooked] = useState(false)
  const [error, setError] = useState('')

  // Function to get check-in date from the form
  const getCheckInDate = (e) => {
    setStartDate(e.target.value)
  }

  // Function to get check-out date from the form
  const getCheckOutDate = (e) => {
    setEndDate(e.target.value)
  }

  // Function to create booking
  const createBooking = async (e) => {
    try {
      //prevent browser from reload
      e.preventDefault()
      //get data from form from e.target
      const form = new FormData(e.target)
      let formObject = Object.fromEntries(form.entries())
      //get house id from the props
      formObject.house_id = house.house_id
      console.log('formOject', formObject)
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings`,
        formObject
      )
      //check if there's an error with booking date
      if (response.data.error) {
        setError(response.data.error)
        hasBooked(false)
      } else {
        //check if the review is posted
        hasBooked(true)
      }
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
  }
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const calculateTime = end.getTime() - start.getTime()
      const nights = Math.ceil(calculateTime / (1000 * 3600 * 24))
      setNights(nights || 0)
    }
  }, [startDate, endDate])

  // useEffect to update totalPrice
  useEffect(() => {
    if (house) {
      setTotalPrice(nights * house.price_per_night)
    }
    // eslint-disable-next-line
  }, [nights])

  return (
    <>
      <div className="border border-gray-200 self-start my-5 ml-5 p-4 rounded-md">
        {/* booking form */}
        {booked ? (
          <div className=" bg-emerald-50 text-center rounded p-6 mt-3 h-20">
            Thank you for your reservation!
          </div>
        ) : (
          <form onSubmit={createBooking}>
            <span className="flex text-xl font-bold">
              <div>$</div>
              <div>{house.price_per_night}</div>
            </span>
            <span className=" text-gray-400 font-bold text-sm"> /night</span>
            <div className="flex justify-between mt-5 gap-1">
              {/* checkin date */}
              <div className="w-full">
                <div className=" text-xs text-gray-400">Check-in</div>
                <input
                  name="booking_start_date"
                  type="date"
                  className="border border-gray-200 rounded-md p-2 w-full"
                  value={startDate}
                  onChange={getCheckInDate}
                />
              </div>
              {/* checkout date */}
              <div className="w-full">
                <div className=" text-xs text-gray-400">Check-out</div>
                <input
                  name="booking_end_date"
                  type="date"
                  className="border border-gray-200 rounded-md p-2 w-full"
                  value={endDate}
                  onChange={getCheckOutDate}
                />
              </div>
            </div>
            <textarea
              name="message_to_host"
              placeholder="Please send a message to the host..."
              className="border border-gray-200 rounded-md mt-2 w-full p-2"
              rows="7"
            ></textarea>
            <div className="flex justify-between">
              {/* total nights */}
              <div className="flex self-center">
                <span>{nights} nights = </span>
                <span className="font-bold">{`$ ${totalPrice}`}</span>
              </div>
              <button className=" bg-rose-400 text-white py-3 px-4 rounded-md">
                Reserve
              </button>
            </div>
          </form>
        )}
        {/* add error message */}
        {error ? (
          <span className=" text-red-500 text-xs pl-1">{error}</span>
        ) : null}
      </div>
    </>
  )
}
export default Booking
