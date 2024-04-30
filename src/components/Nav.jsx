import { Link } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

function Nav() {
  // const isLoggedIn = false
  const isLoggedIn = localStorage.getItem('isLoggedIn')

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
                <div className=" pl-2">My Profile</div>
              </button>
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center ps-3.5 border border-gray-300 rounded-md p-2 w-20 "
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Nav
