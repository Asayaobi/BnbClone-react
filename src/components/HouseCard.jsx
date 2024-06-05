import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

function HouseCard(props) {
  const isBooking = props.isBooking
  const isListing = props.isListing

  return (
    //  used a template literal (${props.house.house_id}) to dynamically generate the URL based on the house_id value from props
    <Link to={`/houses/${props.house.house_id}`}>
      <div className="border border-gray-300 rounded-md pb-5 hover:shadow">
        {/* photo */}
        <div className="w-70 h-40 overflow-hidden">
          <img
            src={`${props.house.pic_url}`}
            alt={`house in ${props.house.location}`}
            className="w-full h-full object-cover rounded-tr-md rounded-tl-md"
          />
        </div>
        {/* location, room, and price */}
        <div className=" pl-5 pr-5">
          <div className=" text-lg font-bold">{props.house.location}</div>
          <div className=" text-gray-500">{`${props.house.bedrooms} bedrooms • ${props.house.bathrooms} bathrooms`}</div>
          <div className=" text-xl font-bold">{`$ ${props.house.price_per_night}`}</div>
          <div className="flex justify-between mt-3">
            {/* ratings and stars */}
            <span className="flex gap-x-1">
              <div>
                {Array.from({ length: Math.floor(props.house.rating) }).map(
                  (i, index) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: '#FFD43B' }}
                      key={index}
                    />
                  )
                )}
              </div>
              <div>{props.house.rating}</div>
            </span>
            {/* total reviews */}
            <span className="flex gap-x-1">
              <div>{props.house.reviews_count}</div>
              <div>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="text-xs text-gray-500 ml-1"
                />
              </div>
            </span>
          </div>
        </div>
        {isBooking && (
          <div className="bg-green-50 p-2 mt-2 flex flex-col items-center">
            <p className="text-black">
              {props.house.booking_start_date} - {props.house.booking_end_date}
            </p>
            <p className="text-black font-bold">
              {props.house.nights} nights = {props.house.price_per_night}
            </p>
          </div>
        )}
        {/* for buttons in Listing Card */}
        {isListing && (
          <div className="flex justify-start px-2 gap-1 mt-3 ml-1">
            <Link to={`/houses/${props.house.house_id}`}>
              <button className=" border border-gray-200 px-2 rounded-md">
                View
              </button>
            </Link>
            <Link to={`/houses/${props.house.house_id}/edit`}>
              <button className=" border border-gray-200 px-2 rounded-md">
                Edit
              </button>
            </Link>
          </div>
        )}
      </div>
    </Link>
  )
}
export default HouseCard
