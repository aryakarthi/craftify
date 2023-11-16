import React from "react";
import { MdDelete } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavItems, removeItemsFromFav } from "../api";
import { clearFavItems, setFavItems } from "../app/slices/favSlice";
import toast from "react-hot-toast";

const Favourites = () => {
  const favItems = useSelector((state) => state?.favItems);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const removeFromFav = (product_id) => {
    if (user) {
      removeItemsFromFav(user?.user_id, product_id).then((res) => {
        getAllFavItems(user?.user_id).then((items) => {
          if (items?.length === 0) {
            dispatch(clearFavItems());
            toast.success("Your favourites is empty!");
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
    <div className="container">
      <div className="pt-[8rem] pb-[4rem] md:px-2">
        <h2 className="font-bold text-3xl text-zinc-800 mb-4 ">
          My Favourites
        </h2>
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {favItems &&
            favItems?.length > 0 &&
            favItems?.map((item, i) => (
              <div
                key={i}
                className="flex gap-2 rounded-lg bg-white p-2 h-full"
              >
                <img
                  className="w-16 h-16 md:w-24 md:h-24 object-contain block rounded-md"
                  src={item?.imageURLs[0]}
                  alt=""
                />
                <div className="flex w-full flex-col overflow-hidden relative">
                  <p className="font-bold text-sm md:text-md whitespace-nowrap ">
                    {item?.product_name}
                  </p>
                  <p className="font-medium text-zinc-600 text-sm md:text-md">
                    {item?.product_category}
                  </p>
                  <p className="font-medium text-sm md:text-md">
                    Rs. {item?.product_price}
                  </p>
                  <div className="absolute bottom-1 right-1 z-20 cursor-pointer">
                    <MdDelete
                      className="text-xl md:text-2xl overflow-hidden text-red-500"
                      onClick={() => removeFromFav(item?.productId)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
