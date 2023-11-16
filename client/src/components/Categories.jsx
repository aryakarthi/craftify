import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerFadeInOut } from "../animations";
import { allCategories } from "../utils/data";
import { setCategory } from "../app/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const category = useSelector((data) => data.category);
  const dispatch = useDispatch();
  // console.log(category.value);

  return (
    <div className="w-full h-full overflow-x-scroll scrollbar-none flex items-center gap-4">
      {allCategories &&
        allCategories.map((data, i) => (
          <CategoryCard
            data={data}
            category={category}
            dispatch={dispatch}
            index={i}
            key={data.id}
          />
        ))}
    </div>
  );
};

export const CategoryCard = ({ data, index, category, dispatch }) => {
  return (
    <motion.div
      key={data.id}
      {...staggerFadeInOut(index)}
      onClick={() => dispatch(setCategory(data.category))}
      className={`flex items-center gap-1 px-2 py-1 shadow-md text-lg font-medium cursor-pointer rounded-md whitespace-nowrap ${
        category.value === data.category
          ? "bg-red-400 text-primary"
          : "bg-primary text-textColor"
      } hover:bg-red-400 hover:text-primary transition-all`}
    >
      {data.title}
    </motion.div>
  );
};

export default Categories;
