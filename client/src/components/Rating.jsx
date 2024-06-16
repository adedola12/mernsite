
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({MAX_STARS = 5, rating, setRating = () => {} }) => {
    const [hover, setHover] = useState(0);


    const handleRating = (newRating) => {
        const updatedRating = newRating === rating ? 0 : newRating;
        setRating(updatedRating);
    }

    const handleMouseHover = (newRating) => {
        setHover(newRating)
    }

    const handleMouseLeave = (newRating) => {
        setHover(newRating)
    }


// (hover >= currentRating || rating >= currentRating)
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
                onMouseEnter={() => handleMouseHover(currentRating)}
                onMouseLeave={() => handleMouseLeave(0)}
                className={`cursor-pointer duration-300 ${
                        currentRating <= (hover || rating)
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