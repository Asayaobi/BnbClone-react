import { useState } from 'react'

function Gallery(props) {
  const [selectedImage, setSelectedImage] = useState(props.images[0])
  return (
    <>
      {/* Left Picture */}
      <div className="grid grid-row lg:grid-cols-2 gap-10">
        <div className=" bg-white">
          <img src={selectedImage} alt="Sample" className="rounded-md" />
        </div>

        {/* Right Pictures */}
        <div className="grid grid-cols-3 gap-2">
          {props.images.map((image, index) => (
            <div key={index} className=" w-70 h-40 overflow-hidden">
              <img
                src={image}
                alt="Sample"
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onClick={(event) => {
                  setSelectedImage(image)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Gallery
