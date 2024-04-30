import { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true

function Profile() {
  //State
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('')
  const [message, setMessage] = useState(false)
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`
      )
      if (response.data.error) {
        navigate('/')
      } else {
        setUser(response.data)
      }
    } catch (e) {
      alert(e.message)
    }
  }

  const modifyUser = async (e) => {
    e.preventDefault()
    // alert('working')
    const form = new FormData(e.target)
    const formObj = Object.fromEntries(form.entries())
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/profile`,
        formObj
      )
      setUser(response.data)
      setPicture(response.data.picture)
      setMessage(true)
      // alert('your changes have been save')
    } catch (e) {
      alert(e.message)
    }
  }

  //remove jwt token when logging out with local storage
  const logout = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout`
      )
      console.log({ data })
      localStorage.removeItem('isLoggedIn')
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="container px-2 md:mx-auto">
      <Nav />
      <div className="border border-gray-300 p-5 rounded-md">
        <form onSubmit={modifyUser}>
          <div className="text-lg font-bold ">Your Profile</div>
          {/* Create Profile photo & Photo route */}
          <div className="flex gap-2 mt-4">
            <img
              name="picture"
              defaultValue={user.profile_pic_url}
              src={user.profile_pic_url}
              alt="profile"
              className="border rounded-full  w-16"
            />
            <div className="flex justify-center w-full self-center">
              <input
                name="profile_pic_url"
                type="text"
                placeholder={user.profile_pic_url}
                className="border border-gray-200 w-full p-2 rounded-md"
              />
            </div>
          </div>
          {/* First name */}
          <div className="text-gray-400 pt-4">First Name</div>
          <input
            defaultValue={user.first_name}
            name="first_name"
            type="text"
            placeholder={user.firstName}
            className="border border-gray-200 w-full p-2 rounded-md placeholder-black "
          />
          {/* Last name */}
          <div className="text-gray-400 pt-2">Last Name</div>
          <input
            defaultValue={user.last_name}
            name="last_name"
            type="text"
            placeholder={user.lastName}
            className="border border-gray-200 w-full p-2 rounded-md placeholder-black"
          />
          {/* Email */}
          <div className="text-gray-400 pt-2">Email</div>
          <input
            name="email"
            type="Email"
            placeholder={user.email}
            defaultValue={user.email_name}
            className="border border-gray-200 w-full p-2 rounded-md placeholder-black"
          />
          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button className="border rounded bg-rose-400 hover:bg-rose-500 text-white p-2">
              Save Changes
            </button>
            {message ? (
              <div className=" text-xs text-green-600">
                'your changes have been save'
              </div>
            ) : null}
            <button
              onClick={logout}
              className="border rounded bg-white hover:bg-gray-100 text-black py-2 px-4"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
