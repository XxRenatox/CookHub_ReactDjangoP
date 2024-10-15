import React, { useState } from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    setAnimate(!animate);
  };

  return (
    <>
      <div>
        <button
          onClick={handleClick}
          className={`p-2 rounded-full fav-btn`}
        >
          <span className={`text-2xl transition-transform duration-300`}>
            {isFavorite ? "❤️" : "🤍"}
          </span>
        </button>
      </div>
    </>
  );
};

export default FavoriteButton;
