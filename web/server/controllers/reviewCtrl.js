const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validations");
const Review = require("../models/reviewModel");
const Game = require("../models/gameModel");

const addReview = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { rating, comment, gameId } = req.body;
  try {
    const review = await Review.find({ userId: id });
    const alreadyReview = review.find((item) => item.gameId.toString() === gameId);
    if (alreadyReview) {
      throw new Error("This game already review");
    }
    const addReview = await Review.create({ userId: id, rating, comment, gameId });
    await Game.findByIdAndUpdate(
      gameId,
      {
        $push: {
          ratings: {
            rating,
            comment,
            postedby: id,
          },
        },
      },
      {
        new: true,
      }
    );
    const getAllRatings = await Game.findById(gameId);
    const totalRating = getAllRatings.ratings.length;
    const ratingSum = getAllRatings.ratings.map((item) => item.rating).reduce((prev, curr) => prev + curr, 0);
    const actualRating = (ratingSum / totalRating).toFixed(1);
    await Game.findByIdAndUpdate(
      gameId,
      {
        totalRating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(addReview);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllReviews = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const reviewsUser = await Review.find({ userId: id }).populate("gameId");
    res.json(reviewsUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addReview, getAllReviews };
