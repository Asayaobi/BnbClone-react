import Nav from './Nav'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
axios.defaults.withCredentials = true

function HouseEdit() {
  //params
  const params = useParams()
  // declare useNavigate
  const navigate = useNavigate()

  const [house, setHouse] = useState({
    images: []
  })
  //Create an async function getHouse that uses axios to get a house object from the API url /houses/1
  // then sets the object as the value of the house state variable
  const getHouse = async () => {
    let { data } = await axios.get(
      `https://haiku-bnb.onrender.com/houses/${params.id}`
    )
    setHouse(data)
  }
  // Use the useEffect hook to trigger the getHouse function when the component loads
  useEffect(() => {
    getHouse()
    // eslint-disable-next-line
  }, [])

  //update the data with patch
  const updateHouse = async (e) => {
    //1. prevent browser from reload
    try {
      e.preventDefault()
      //2 get data from form from e.target
      const form = new FormData(e.target)
      const formObj = Object.fromEntries(form.entries())
      //retrieves all 'images' field in an array of strings
      formObj.photos = form.getAll('images')
      formObj.house_id = params
      let response = await axios.patch(
        `https://demo-api-bnb.onrender.com/houses/${params.id}`,
        formObj
      )
      setHouse(response.data)
      navigate(`/houses/${params.id}`)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="container mx-auto">
      <Nav />
      <form onSubmit={updateHouse}>
        <div className="border border-gray-200 p-2 rounded-md mt-2">
          <div className="grid gap-32 grid-cols-2 ">
            {/* col 1 */}
            <div className="grid items-center">
              <div>Edit your listing</div>
              <div className=" text-gray-400 mt-2 text-sm">Location</div>
              <input
                defaultValue={house.location}
                name="location"
                type="text"
                placeholder={house.location}
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Bedrooms</div>
              <input
                defaultValue={house.rooms}
                name="rooms"
                type="number"
                placeholder={house.rooms}
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Bathrooms</div>
              <input
                defaultValue={house.bathrooms}
                name="bathrooms"
                type="number"
                placeholder={house.bathrooms}
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Price per Night</div>
              <input
                defaultValue={house.price}
                name="price"
                type="number"
                placeholder={house.price}
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Description</div>
              <textarea
                defaultValue={house.description}
                name="description"
                className="border border-gray-200 rounded-md p-2 w-full text-sm"
                rows="4"
                placeholder={house.description}
              ></textarea>
            </div>
            {/* col 2 */}
            <div>
              <div className=" text-gray-400 mt-2 text-sm">Photos</div>
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[0]}
                placeholder={house.images && house.images[0]}
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[1]}
                placeholder={house.images && house.images[1]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[2]}
                placeholder={house.images && house.images[2]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[3]}
                placeholder={house.images && house.images[3]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[4]}
                placeholder={house.images && house.images[4]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[5]}
                placeholder={house.images && house.images[5]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[6]}
                placeholder={house.images && house.images[6]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[7]}
                placeholder={house.images && house.images[7]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="images"
                type="text"
                defaultValue={house.images && house.images[8]}
                placeholder={house.images && house.images[8]}
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-start gap-2 mt-2">
            <button className=" bg-rose-400 text-white rounded-md p-3">
              Save Changes
            </button>
            <Link to="/listings" className="hover:text-rose-400">
              <button className="border border-gray-200 rounded-md py-3 px-6">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default HouseEdit
