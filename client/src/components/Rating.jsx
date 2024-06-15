
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';

const StarRating = ({MAX_STARS = 5, rating, setRating = () => {} }) => {
    const [hover, setHover] = useState(0);


    const handleRating = (newRating) => {
        const updatedRating = newRating === rating ? 0 : newRating;
        setRating(updatedRating);
    }

    const handleHover = (newRating) => {
        setHover(newRating)
    }
    const handleMouseLeave = (newRating) => {
        setHover(newRating)
    }



  return (
    <>
    {
        [...Array(MAX_STARS)].map((_, index) => {
            const currentRating = index + 1;
            return (
                <FaStar
                key={currentRating}
                size={18}
                onClick={() => handleRating(currentRating)}
                onMouseEnter={() => handleHover(currentRating)}
                onMouseLeave={() => handleMouseLeave(0)}
                className={`cursor-pointer duration-300 ${ 
                      (hover >= currentRating || rating >= currentRating)
                        ? "text-yellow-500" 
                        : "text-gray-300" 
                }`}
                />
            )
        })
    }
    </>
  )
}

export default StarRating