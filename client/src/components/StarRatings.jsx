import React from "react";
import { Rating } from "@mui/material";

const StarRatings = ({ ratingStars, setRatingStars, review, setReview }) => {
  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <Rating
        name="ratings"
        value={ratingStars}
        onChange={(event, newValue) => {
          setRatingStars(newValue);
        }}
      />

      <ReviewInput
        type="text"
        placeHolder={"Add Review"}
        stateValue={review}
        stateFunction={setReview}
      />
    </div>
  );
};

export const ReviewInput = ({
  type,
  placeHolder,
  stateValue,
  stateFunction,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-yellow-400"
        value={stateValue}
        onChange={(e) => stateFunction(e.target.value)}
      />
    </>
  );
};

export default StarRatings;
