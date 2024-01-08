const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postShema = new Schema(
  {
    storyTitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    forRecommendation: {
      type: Boolean,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    votesNumber: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    storyText: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postShema);
