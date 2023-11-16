import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ItemCarousel = ({ product, screenWidth }) => {
  const images = product?.imageURLs.map((url) => {
    return {
      original: url,
      thumbnail: url,
    };
  });

  return (
    <div className="w-full h-60">
      <ImageGallery
        className="h-full image-gallery-thumbnails-bottom md:image-gallery-thumbnails-left"
        items={images}
        thumbnailPosition={screenWidth >= 768 ? "left" : "bottom"}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={screenWidth >= 768 ? false : true}
        showBullets={screenWidth >= 768 ? false : true}
        showThumbnails={screenWidth >= 768 ? true : false}
      />
    </div>
  );
};

export default ItemCarousel;
