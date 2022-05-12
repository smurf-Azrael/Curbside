//@ts-nocheck
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styling/ImageCarousel.css';

const ImageCarousel = ({carouselItems}) => {
  return (
    <Carousel>
      {carouselItems.map(function(item) {
        return <Carousel.Item key={item}>
          <img
            className="d-block w-100"
            src={item}
            alt="item for sale"
          />
        </Carousel.Item>
      })}
    </Carousel>
  )
}

export default ImageCarousel