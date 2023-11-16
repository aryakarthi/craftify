import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemCarousel,
  StarRatings,
  OverallRatings,
  ItemCard,
} from "../components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { btnClick } from "../animations";
import toast from "react-hot-toast";

import {
  addNewItemToCart,
  addNewItemToFav,
  addUserReview,
  getAllCartItems,
  getAllFavItems,
  getAllProducts,
} from "../api";
import { setAllProducts } from "../app/slices/productSlice";
import { setCartItems } from "../app/slices/cartSlice";
import { sizes, categoriesOptions } from "../utils/data";
import { setFavItems } from "../app/slices/favSlice";

const PreviewItem = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ratingStars, setRatingStars] = useState(null);
  const [review, setReview] = useState("");
  const [overallRatings, setOverallRatings] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  // console.log(selectedSize);
  const [showError, setShowError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const getProduct = products?.find((product) => product?.product_id === id);
  console.log(getProduct);
  const categoryTitle = categoriesOptions?.find(
    (item) => item.value === getProduct?.product_category
  )?.title;

  const getAllReviews = getProduct?.reviews;

  const isReviewed = getAllReviews?.some(
    (review) => review?.userId === user?.user_id
  );
  // console.log(isReviewed);

  let sum = getAllReviews?.reduce(
    (total, current) => total + current?.ratingStars,
    0
  );
  let counts = getAllReviews?.length;
  let avegRatings = sum / counts || 0;

  const relatedProducts = products?.filter(
    (data) =>
      data.product_category === getProduct?.product_category &&
      data.product_id !== getProduct?.product_id
  );

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTotalRatings(counts);
    setOverallRatings(avegRatings);
  }, [avegRatings, counts]);

  const handleReview = (e) => {
    e.preventDefault();
    if (!review && !ratingStars) {
      toast.error("Required fields shouldn't be empty!");
    } else if (review && !ratingStars) {
      toast.error("Give your rating for the product!");
    } else {
      const userReview = {
        ratingStars,
        review,
        addedAt: Date.now(),
        addedBy: user?.name ? user?.name : user?.email,
        userId: user?.user_id,
      };
      addUserReview(id, userReview).then((response) => {
        toast.success("Your review added successfully!");
        getAllProducts().then((data) => {
          dispatch(setAllProducts(data));
        });
      });
      console.log(userReview);
    }
  };

  const sendToCart = () => {
    if (user) {
      if (getProduct?.product_category && selectedSize) {
        addNewItemToCart(user?.user_id, getProduct, selectedSize).then(
          (res) => {
            console.log(res);
            getAllCartItems(user?.user_id).then((items) => {
              console.log(items);

              dispatch(setCartItems(items));
              toast.success("Added to the cart!");
            });
          }
        );
      } else {
        toast.error("Size is not selected!");
      }
    } else {
      toast.error("Please login first!");
    }
  };

  const sendToFav = () => {
    if (user) {
      addNewItemToFav(user?.user_id, getProduct).then((res) => {
        getAllFavItems(user?.user_id).then((items) => {
          dispatch(setFavItems(items));
          toast.success("Added to the cart!");
        });
      });
    } else {
      toast.error("Please login first!");
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container">
        <div className="w-full h-full grid md:grid-flow-row md:grid-cols-2 gap-4 pt-[8rem] pb-[4rem]">
          <div className="w-full h-[360px] col-span-1">
            {products && (
              <ItemCarousel product={getProduct} screenWidth={screenWidth} />
            )}
          </div>
          <div className="w-full md:px-6 col-span-1">
            <p className="text-3xl font-semibold mb-2 leading-tight">
              {getProduct?.product_name}
            </p>

            <p className="text-lg font-semibold mb-2">{categoryTitle}</p>

            <p className="text-md font-medium text-gray-500 mb-2">
              {getProduct?.product_description}
            </p>

            <div>
              <OverallRatings
                overallRatings={overallRatings}
                totalRatings={totalRatings}
              />
            </div>

            <p className="mr-2 text-lg font-semibold mb-5">
              MRP : &#8377;{getProduct?.product_price}
            </p>
            <div className="mb-5">
              <p className="text-md font-semibold mb-2">Select Size (in cms)</p>
              <div className="w-full md:w-[50%] grid grid-cols-3 grid-rows-2 gap-1">
                {sizes?.map((item, i) => (
                  <div
                    key={i}
                    className={`col-span-1 bg-white border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-5">
              <motion.button
                {...btnClick}
                className="w-full md:w-[50%] px-4 py-2 rounded-md bg-amber-400 cursor-pointer text-black text-xl capitalize hover:bg-amber-500 transition-all duration-150"
                onClick={sendToCart}
              >
                Add to Cart
              </motion.button>

              <motion.button
                {...btnClick}
                className="w-full md:w-[50%] px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150"
                onClick={sendToFav}
              >
                Add to Favourites
              </motion.button>
            </div>
            <>
              {!isReviewed && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 leading-tight">
                    Review this product
                  </h3>
                  <StarRatings
                    ratingStars={ratingStars}
                    setRatingStars={setRatingStars}
                    review={review}
                    setReview={setReview}
                  />
                  <motion.button
                    {...btnClick}
                    className="w-full md:w-[50%] px-4 py-2 rounded-md bg-slate-400 cursor-pointer text-black text-xl capitalize hover:bg-slate-500 transition-all duration-150"
                    onClick={handleReview}
                  >
                    Review
                  </motion.button>
                </div>
              )}
            </>
          </div>
        </div>
        <div>
          <h3>Related Products</h3>

          {relatedProducts?.length > 0 ? (
            <>
              <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-[1rem] md:px-2">
                {relatedProducts?.map((data, i) => (
                  <ItemCard key={i} data={data} index={i} />
                ))}
              </div>
            </>
          ) : (
            <>
              <p>No products found!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewItem;
