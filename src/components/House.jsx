import Gallery from './Gallery'
import Nav from './Nav'
import Reviews from './Reviews'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Booking from './Booking'
function House() {
  //useParams hook to extract the id  from params.id of the house from the URL
  const params = useParams()
  console.log('params', params)
  //Replace the hardcoded house with a an empty object, using the useState hook
  const [house, setHouse] = useState({})
  const [loading, setLoading] = useState(true)
  //Create an async function getHouse that uses axios to get a house object from the API url /houses/1
  // then sets the object as the value of the house state variable
  const getHouse = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/houses/${params.id}`
    )
    console.log('data------->', data)
    setHouse(data)
    setLoading(false)
  }
  // Use the useEffect hook to trigger the getHouse function when the component loads
  useEffect(() => {
    getHouse()
  }, [])
  useEffect(() => {
    console.log('house---->', house)
  }, [loading])
  return (
    <div className="container mx-2 md:mx-auto">
      <Nav />
      {/* if it's' loading, show loading */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Gallery images={house.images} />
          <div className="grid gap-30 lg:grid-cols-3">
            <div className=" col-span-2">
              <div className=" text-3xl font-bold mt-5">{house.location}</div>
              <div className="flex text-gray-400 mt-4 text-sm gap-2">
                <div>{house.bedrooms}</div>
                <div> rooms • </div>
                <div>{house.bathrooms}</div>
                <div>bathrooms</div>
              </div>
              <div className="flex col-span-2 justify-start gap-1 mt-8">
                <div>
                  <img
                    src={house.host.profile_pic_url}
                    alt={`${house.host.firstName} is hosting this house`}
                    className="rounded-full h-14 w-14"
                  />
                </div>
                <div>
                  <div className=" text-gray-400 text-sm">Hosted by</div>
                  <div className="flex gap-1">
                    <div>{house.host.firstName}</div>
                    <div>{house.host.lastName}</div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-sm">{house.description}</div>
            </div>
            {/* Use the Booking component and pass the house prop */}
            <Booking house={house} />
          </div>
          <Reviews house={house} />
        </>
      )}
    </div>
  )
}
export default House
