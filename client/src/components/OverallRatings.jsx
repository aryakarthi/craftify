import React from "react";
import { Rating } from "@mui/material";

const OverallRatings = ({ overallRatings, totalRatings }) => {
  return (
    <div className="flex flex-col mb-2">
      <div className="flex gap-1">
        <p className="font-semibold">{overallRatings.toFixed(1)}</p>
        <Rating
          name="overall-ratings"
          defaultValue={0}
          value={overallRatings}
          precision={0.1}
          readOnly
        />
      </div>
      <p>{`${totalRatings === 0 ? "No " : totalRatings}`} review(s)</p>
    </div>
  );
};

export default OverallRatings;
