import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "../components";

const Home = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const category = useSelector((data) => data.category);
  const favItems = useSelector((state) => state?.favItems);
  const orders = useSelector((state) => state?.orders);

  return (
    <div className="container">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-[12rem] pb-[4rem] md:px-2">
        {/* xl:grid-cols-5 2xl:grid-cols-6 */}
        {products?.length > 0 && category.value === "all" ? (
          <>
            {products?.map((data, i) => (
              <ItemCard key={i} data={data} index={i} favItems={favItems} user={user} />
            ))}
          </>
        ) : (
          <>
            {products
              ?.filter((data) => data.product_category === category.value)
              ?.map((data, i) => (
                <ItemCard key={i} data={data} index={i} user={user} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
