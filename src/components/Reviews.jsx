import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
axios.defaults.withCredentials = true

function Reviews(props) {
  //params
  const params = useParams()
  // declare useNavigate
  const navigate = useNavigate()

  //state
  const [reviews, setReviews] = useState([])
  const [hasBeenReviewed, setHasBeenReviewed] = useState(false)

  //post request for form
  const createReview = async (e) => {
    //1. prevent browser from reload
    e.preventDefault()
    //2 get data from form from e.target
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    //add house id from props.house.house_id
    formObject.house_id = props.house.house_id
    console.log('formObject with house_id', formObject)
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reviews`,
      formObject
    )
    //check if the review is posted to show thank you message
    setHasBeenReviewed(true)
    //creating a new array with the most recent review at the beginning, followed by all the existing reviews
    setReviews([...reviews, response.data])
    console.log('setReview data from post', response.data)
    navigate(`/houses/${params.id}`)
  }

  const getReviews = async () => {
    let result = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews?house_id=${params.id}`
    )
    setReviews(result.data)
    console.log('setReview data from get', result.data)
  }

  useEffect(() => {
    getReviews()
  }, [])

  // passing reviews with map
  console.log('reviews', reviews)
  const reviewData = reviews.map((review, index) => (
    <Review key={index} review={review} />
  ))

  return (
    <div className="grid grid-cols-3 gap-x-48 border-t-2 py-5">
      <div className="col-span-2 mt-5">
        <div className="mb-6">
          <div className="font-bold text-xl mb-2">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="text-md text-gray-500 mr-2"
            />
            {`${reviews.length} Reviews`}
          </div>
          <div className="flex gap-2">
            <div>
              {[...new Array(Math.floor(props.house.rating))].map(
                (i, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    style={{ color: '#FFD43B' }}
                  />
                )
              )}
            </div>
            <div>{props.house.rating}</div>
          </div>
        </div>
        {reviewData}
      </div>
      {/* Thank you message */}
      {hasBeenReviewed ? (
        <div className=" bg-emerald-50 text-center rounded p-6 mt-3 h-20">
          Thank you for your review!
        </div>
      ) : (
        <div className="border border-gray-200 self-start my-5 p-4 rounded-md">
          <div>Leave a Review</div>
          <div className="mt-2 text-sm">
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD43B' }} />0
          </div>
          <form onSubmit={createReview}>
            <div className=" py-2 text-sm flex justify-start">
              <input
                type="radio"
                name="star_rating"
                value="1"
                className="mr-1"
              />
              <input
                type="radio"
                name="star_rating"
                value="2"
                className="mr-1"
              />
              <input
                type="radio"
                name="star_rating"
                value="3"
                className="mr-1"
              />
              <input
                type="radio"
                name="star_rating"
                value="4"
                className="mr-1"
              />
              <input
                type="radio"
                name="star_rating"
                value="5"
                className="mr-1"
              />
            </div>
            <div className=" text-sm justify-start mt-3">
              <textarea
                name="review_text"
                className=" border w-full col-span-8 text-sm pb-16 pr-16"
                placeholder="Please leave a review for this house..."
              ></textarea>
            </div>
            <div className=" text-sm text-white mt-1">
              <button className=" border bg-rose-400 p-2 rounded-md">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
function Review(props) {
  console.log('props', props.review)
  // Check if props.review.author exists
  const author = props.review.author || {}
  return (
    <div className="border border-gray-300 rounded-md col-span-2 p-5 my-4">
      <div>
        <div className="flex col-span-2 justify-start gap-1">
          {/* user picture */}
          <div className=" rounded-full w-10 h-10 mr-3">
            <img
              src={author.profile_pic_url}
              alt={`user profile of ${author.firstName}`}
              className="rounded-full"
            />
          </div>
          <div>
            <div className=" text-gray-400">{props.review.review_date}</div>
            <div className="flex gap-2">
              {/* first name */}
              <div>{author.firstName}</div>
              {/* last name */}
              <div>{author.lastName}</div>
            </div>
          </div>
        </div>
        <div className=" flex my-3">
          {/* stars icon to the rating */}
          <div>
            {[...new Array(props.review.star_rating)].map((i, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ color: '#FFD43B' }}
              />
            ))}
          </div>
          <div className="ml-2">{props.review.star_rating}</div>
        </div>
        <div>{props.review.review_text}</div>
      </div>
    </div>
  )
}

export default Reviews
