import React, { useState } from 'react';
import Carousel from 'react-slick';
import img1 from '../img/Logo.png'
import rad from "../img/Radiology-Services.jpg"
import rad2 from "../img/Radiology-Services2.jpg"
import rad3 from "../img/Surgical-Services3.jpg"
import rad4 from "../img/ambulance.jpg"
const images = [
  // Add your 20 hospital ward and building image URLs here
  img1,
  
  // ...
];

const HospitalCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentImage(current),
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className='w-full h-auto itemss-center justify-center p-9'>
    <div className="carousel m-5 p-5 w-full h-4/6">
  <div id="item1" className="carousel-item w-full">
    <img src={rad} className="w-full" />
  </div> 
  <div id="item2" className="carousel-item w-full">
    <img src={rad2} className="w-full" />
  </div> 
  <div id="item3" className="carousel-item w-full">
    <img src={rad3} className="w-full" />
  </div> 
  <div id="item4" className="carousel-item w-full">
    <img src={rad4} className="w-full" />
  </div>
</div> 
<div className="flex justify-center w-full py-2 gap-2">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
  <a href="#item3" className="btn btn-xs">3</a> 
  <a href="#item4" className="btn btn-xs">4</a>
</div></div>
  );
};

export default HospitalCarousel;
