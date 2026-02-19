import React, { useState } from "react";
import StarRating from "./StarRating";

const MovieDetails = ({ movie, user, updateMovie, goBack }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // ✅ ADD REVIEW
  const addReview = () => {
    if (reviewText && reviewRating) {
      const newReview = {
        id: Date.now(),
        user,
        text: reviewText,
        rating: reviewRating,
        reviewLikes: 0,
        likedBy: []   // 👈 Track who liked
      };

      const updatedMovie = {
        ...movie,
        reviews: [...movie.reviews, newReview]
      };

      updateMovie(updatedMovie);
      setReviewText("");
      setReviewRating(0);
    }
  };

  // ✅ DELETE REVIEW
  const deleteReview = (id) => {
    const updatedMovie = {
      ...movie,
      reviews: movie.reviews.filter((r) => r.id !== id)
    };

    updateMovie(updatedMovie);
  };

  // ✅ LIKE REVIEW (ONLY ONCE PER USER)
  const likeReview = (id) => {
    const updatedMovie = {
      ...movie,
      reviews: movie.reviews.map((r) => {

        if (r.id === id) {

          // Ensure likedBy exists (for old reviews)
          const likedBy = r.likedBy || [];

          // ❌ Prevent liking own review
          if (r.user === user) {
            alert("You cannot like your own review");
            return r;
          }

          // ❌ Prevent liking twice
          if (likedBy.includes(user)) {
            alert("You already liked this review");
            return r;
          }

          // ✅ Allow like
          return {
            ...r,
            reviewLikes: r.reviewLikes + 1,
            likedBy: [...likedBy, user]
          };
        }

        return r;
      })
    };

    updateMovie(updatedMovie);
  };

  return (
    <div className="details-page">
      <button className="back-btn" onClick={goBack}>
        ⬅ Back
      </button>

      {/* Movie Info */}
      <div className="details-header">
        <img src={movie.thumbnail} alt={movie.name} />
        <div>
          <h1>{movie.name}</h1>
          <p className="movie-rating">
            ⭐ {movie.rating} / 5
          </p>
          <p className="movie-description">
            {movie.description}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <h2 className="review-heading">Reviews</h2>

      {movie.reviews.map((review) => {
        const likedBy = review.likedBy || [];
        const alreadyLiked = likedBy.includes(user);

        return (
          <div key={review.id} className="review-box">
            <div className="review-top">
              <h4>{review.user}</h4>
              <StarRating rating={review.rating} />
            </div>

            <p>{review.text}</p>

            <div className="review-actions">
              <button
                onClick={() => likeReview(review.id)}
                disabled={alreadyLiked || review.user === user}
                style={{
                  opacity:
                    alreadyLiked || review.user === user ? 0.6 : 1,
                  cursor:
                    alreadyLiked || review.user === user
                      ? "not-allowed"
                      : "pointer"
                }}
              >
                👍 Like ({review.reviewLikes})
              </button>

              {review.user === user && (
                <button
                  className="delete-btn"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Add Review */}
      <div className="add-review">
        <h3>Write Your Review</h3>

        <textarea
          placeholder="Share your thoughts..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <StarRating
          rating={reviewRating}
          setRating={setReviewRating}
        />

        <button onClick={addReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
