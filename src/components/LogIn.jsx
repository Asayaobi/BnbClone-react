import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true

function LogIn() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const submitForm = async (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      formObject
    )
    if (response.data.error) {
      setError(response.data.error)
    } else {
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
    }
  }
  return (
    <div className="flex mx-auto justify-center mt-12">
      <div className="border rounded p-6 shadow-md w-72">
        <Link to="/" className=" flex justify-center">
          <img
            src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
            alt="Airbnb logo"
            className="w-20 mb-4"
          />
        </Link>

        <form className="space-y-2" onSubmit={submitForm}>
          <div className="space-y-1">
            <div className="text-gray-400 text-xs">Email</div>
            <input
              type="email"
              name="email"
              className="border w-full p-1 rounded"
              autoFocus
            />
          </div>
          <div className="space-y-1">
            <div className="text-gray-400 text-xs">Password</div>
            <input
              name="password"
              type="password"
              className="border w-full p-1 rounded"
            />
          </div>
          <div className="flex justify-center">
            <button className="border rounded bg-rose-400 hover:bg-rose-500 text-white p-12 py-2 mt-2 w-full">
              Login
            </button>
          </div>
        </form>
        {error ? (
          <span className="flex justify-center text-red-500 text-xs">
            {error}
          </span>
        ) : null}
        <div className="flex text-xs mt-3 gap-2">
          <div>New to Airbnb?</div>
          <Link to="/signup" className="text-rose-400 hover:text-rose-500">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogIn
