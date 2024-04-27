import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

function Nav() {
  // Define user state
  const [user, setUser] = useState(null)
  // const isLoggedIn = false
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://demo-api-bnb.onrender.com/profile'
      )
      console.log('userdata', response.data)
      setUser(response.data) // Update user state with fetched data
    } catch (e) {
      alert(e.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex justify-between my-2 items-center">
      {/* Logo */}
      <Link to="/">
        <div className="w-20">
          <img
            src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
            alt="airbnb logo"
          />
        </div>
      </Link>
      {/* my bookings button */}
      <div className="flex justify-center gap-1">
        {isLoggedIn ? (
          <>
            <Link to="/bookings">
              <button className="border border-gray-300 rounded-md p-2">
                My Bookings
              </button>
            </Link>

            {/* my listings button */}
            <Link to="/listings">
              <button className="border border-gray-300 rounded-md p-2">
                My Listings
              </button>
            </Link>

            {/* my profile button */}
            <Link to="/profile">
              <button className="flex border border-gray-300 rounded-md p-2">
                <img
                  className=" rounded-full w-5"
                  src={user.profile_pic_url}
                  alt={user.first_name}
                />
                <div className=" pl-2">Profile</div>
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login" className="border border-gray-300 rounded-md p-2">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Nav
