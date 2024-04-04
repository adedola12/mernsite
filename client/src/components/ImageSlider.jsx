import React, { useEffect, useState } from "react";

export default function ImageSlider() {
  const images = [
    "../sliderImages/ADLM Training Teazer.jpg",
    "../sliderImages/ADLM Good Friday_011748.jpg",
    "../sliderImages/Happy New Month ADLM_073426.jpg",
    "../sliderImages/ADLM Training Teazer.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const intervalId = setInterval(nextImage, 20000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="w-[800px] items-center h-[900px] rounded-lg">
      <img
        src={images[currentIndex]}
        alt="Slider Image"
        className="object-contain"
      />
    </div>
  );
}
