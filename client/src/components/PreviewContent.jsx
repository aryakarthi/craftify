import React from "react";
import { ModalCarousel } from "../components";
import { categoriesOptions } from "../utils/data";

const PreviewContent = ({ data }) => {
  const categoryTitle = categoriesOptions?.find(
    (item) => item.value === data?.product_category
  )?.title;
  return (
    <>
      <div>
        <ModalCarousel className="">
          {data &&
            data?.imageURLs.map((imageURL, index) => (
              <img src={imageURL} key={index} />
            ))}
        </ModalCarousel>
      </div>
      <p className="flex text-md font-medium">
        <span className="w-[40%]">Title:</span>
        <span className="w-[60%] text-zinc-800">{data?.product_name}</span>
      </p>

      <p className="flex text-md font-medium">
        <span className="w-[40%]">Category:</span>
        <span className="w-[60%]">{categoryTitle}</span>
      </p>

      <p className="flex text-md font-medium">
        <span className="w-[40%]">Price:</span>
        <span className="w-[60%]">Rs. {data?.product_price} /-</span>
      </p>

      <p className="flex text-md font-medium">
        <span className="w-[40%]">Size:</span>
        <span className="w-[60%]">{data?.size} cm(s)</span>
      </p>

      <p className="flex text-md font-medium">
        <span className="w-[40%]">Quantity:</span>
        <span className="w-[60%]">{data?.quantity}</span>
      </p>

      <p className="flex text-md font-medium">
        <span className="w-[40%]">Description:</span>
        <span className="w-[60%]">{data?.product_description}</span>
      </p>
    </>
  );
};

export default PreviewContent;
