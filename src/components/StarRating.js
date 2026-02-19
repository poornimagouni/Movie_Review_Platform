import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: setRating ? "pointer" : "default",
            color: star <= rating ? "gold" : "gray",
            fontSize: "20px"
          }}
          onClick={() => setRating && setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
