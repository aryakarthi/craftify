import React from "react";
import { GoHeart, GoHeartFill, FaRupeeSign } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";

import { categoriesOptions } from "../utils/data";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { addNewItemToFav, getAllFavItems, removeItemsFromFav } from "../api";
import { setFavItems, clearFavItems } from "../app/slices/favSlice";
import toast from "react-hot-toast";

const ItemCard = ({ data, index, favItems, user }) => {
  const dispatch = useDispatch();

  const categoryTitle = categoriesOptions.find(
    (item) => item.value === data.product_category
  ).title;

  const isFav = favItems?.find((item) => item?.productId === data?.product_id);

  const allReviews = data?.reviews;
  let sum = allReviews?.reduce(
    (total, current) => total + current?.ratingStars,
    0
  );
  let counts = allReviews?.length;
  let avegRatings = sum / counts || 0;

  const sendToFav = () => {
    if (user) {
      // console.log("Add Fav");
      addNewItemToFav(user?.user_id, data).then((res) => {
        getAllFavItems(user?.user_id).then((items) => {
          dispatch(setFavItems(items));
          toast.success("Added to the favourites!");
        });
      });
    } else {
      toast.error("Please login first!");
    }
  };

  const removeFromFav = () => {
    if (user) {
      removeItemsFromFav(user?.user_id, data?.product_id).then((res) => {
        getAllFavItems(user?.user_id).then((items) => {
          if (items?.length === 0) {
            dispatch(clearFavItems());
            toast.success("Removed from favourites!");
          } else {
            dispatch(setFavItems(items));
            toast.success("Removed from favourites!");
          }
        });
      });
    } else {
      toast.error("Please login first!");
    }
  };

  return (
    <>
      <Link
        to={`/preview/${data?.product_id}`}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-slate-300">
            <img
              className="object-contain h-full w-full group-hover:scale-110 transition-all"
              src={data?.imageURLs[0]}
              alt="Listing"
            />
            <div className="absolute top-3 right-3 z-20">
              <GoHeartFill
                className={`text-2xl overflow-hidden  ${
                  isFav ? "text-red-500" : "text-slate-500"
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  isFav ? removeFromFav(event) : sendToFav(event);
                }}
              />
            </div>
          </div>

          <p className="font-semibold text-lg capitalize">
            {data?.product_name}
          </p>
          <div className="w-full flex flex-1 justify-between items-center">
            <p className="font-normal text-neutral-500">{categoryTitle}</p>
            <div className="flex items-center gap-1">
              <FaRupeeSign className="text-md" />
              <p className="font-semibold">{data?.product_price}</p>
            </div>
          </div>
          <div className="w-full flex flex-1 justify-end items-center">
            {allReviews?.length > 0 ? (
              <div className="flex items-center gap-1">
                <p className="font-semibold">{avegRatings?.toFixed(1)}</p>
                <Rating
                  name="overall-ratings"
                  defaultValue={0}
                  value={avegRatings}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <p>{`(${counts})`}</p>
              </div>
            ) : (
              <p>No reviews</p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemCard;
