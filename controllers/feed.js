const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("creator", "name");

    res.status(200).json({
      message: "Fetched posts succesfully.",
      posts: posts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.DeleteStory = async (req, res, next) => {
  postId = req.body.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    console.log(err);
  }
};

exports.getSuggestions = async (req, res, next) => {
  const userCountryInput =
    req.body.userCountryInput.charAt(0).toUpperCase() +
    req.body.userCountryInput.slice(1);

  const userCityInput =
    req.body.userCityInput.charAt(0).toUpperCase() +
    req.body.userCityInput.slice(1);

  const userAuthorInput = req.body.userAuthorInput;
  try {
    //1
    const matchPosts = await Post.find({
      country: { $regex: userCountryInput },
      city: { $regex: userCityInput },
    }).populate("creator", "name");
    const ids = matchPosts.map((post) => {
      return post.creator;
    });
    //2
    const authorMatch = await User.find(
      { _id: { $in: ids }, name: { $regex: userAuthorInput } },
      "name"
    );

    const authorIds = [];
    const countriesSuggestions = [];
    const citiesSuggestions = [];
    const authorsSuggestions = authorMatch.map((author) => {
      authorIds.push(author._id.toString());
      return author.name;
    });

    const filteredStories = matchPosts.filter((post) => {
      if (authorIds.includes(post.creator._id.toString())) {
        countriesSuggestions.push(post.country);
        citiesSuggestions.push(post.city);
        return true;
      }
      return false;
    });

    res.status(200).json({
      authorsSuggestions: authorsSuggestions.slice(0, 3),
      countriesSuggestions: [...new Set(countriesSuggestions)].slice(0, 3),
      citiesSuggestions: [...new Set(citiesSuggestions)].slice(0, 3),
      stories: filteredStories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getTopRatedStories = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("creator", "name");
    const newPosts = posts.reduce((accumulator, currentValue, index) => {
      if (currentValue.rating / currentValue.votesNumber > 4.4) {
        accumulator.push(posts[index]);
      }
      return accumulator;
    }, []);

    res.status(200).json({
      message: "Fetched posts succesfully.",
      stories: newPosts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getMyStories = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    let userPostsIds;
    if (user.posts.length > 0) userPostsIds = user.posts.slice();

    const posts = await Post.find({ _id: { $in: userPostsIds } });
    res.status(200).json({
      message: "Stories fetched successfully",
      stories: posts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserData = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const userPostsIds = user.posts.slice();
    const posts = await Post.find({ _id: { $in: userPostsIds } });

    const sumViews = posts
      .map((item) => item.views)
      .reduce((prev, next) => prev + next);

    const ratingSum = posts
      .map((item) => item.rating)
      .reduce((prev, next) => prev + next);

    const voteNumbSum = posts
      .map((item) => item.votesNumber)
      .reduce((prev, next) => prev + next);

    const userRating = ratingSum / voteNumbSum;
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
      sumViews: sumViews,
      userRating: userRating,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.CheckUserName = async (req, res, next) => {
  const userName = req.body.username;
  try {
    const result = await User.findOne({ name: userName });
    const returnValue = result !== null;
    res.status(200).json({
      exist: returnValue,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.ChangeUserDetails = async (req, res, next) => {
  const userId = req.userId;
  const email = req.body.email;
  const username = req.body.username;

  try {
    const user = await User.findById(userId);
    user.email = email;
    user.name = username;
    user.save();

    res.status(200).json({
      changed: true,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.CheckEmail = async (req, res, next) => {
  const email = req.body.email;
  try {
    const result = await User.findOne({ email: email });
    const returnValue = result !== null;
    res.status(200).json({
      exist: returnValue,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPostById = async (req, res, next) => {
  const storyId = req.body.storyId;
  try {
    const story = await Post.findById(storyId).populate("creator", "name");
    story.views = story.views + 1;
    story.save();

    const newStory = story.toObject();
    const ratingSum = newStory.rating;
    const votesNumber = newStory.votesNumber;
    delete newStory.votesNumber;

    newStory.rating = ratingSum / votesNumber;
    res.status(200).json({
      message: "Post fetched successfully",
      fullStory: newStory,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.rateStory = async (req, res, next) => {
  const userRate = req.body.userRate;
  const storyId = req.body.storyId;
  try {
    const story = await Post.findById(storyId);
    story.votesNumber = story.votesNumber + 1;
    story.rating = story.rating + userRate;
    story.save();
    res.status(201).json({
      message: "Post rated successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createNewPost = async (req, res, next) => {
  if (!req.file) {
    console.log("NO file");
  }
  const postId = req.body.id;

  const storyTitle = req.body.storyTitle;
  const imageUrl = req.file.path.replace("\\", "/");
  const forRecommendation = req.body.forRecommendation;
  const city = req.body.city.charAt(0).toUpperCase() + req.body.city.slice(1);
  const country =
    req.body.country.charAt(0).toUpperCase() + req.body.country.slice(1);
  const storyText = req.body.storyText;
  const summary = req.body.summary;
  const tag = req.body.tag;
  if (postId === "undefined") {
    const post = new Post({
      storyTitle: storyTitle,
      imageUrl: imageUrl,
      forRecommendation: forRecommendation,
      city: city,
      country: country,
      rating: 0,
      views: 0,
      storyText: storyText,
      summary: summary,
      creator: req.userId,
      tag: tag,
      votesNumber: 0,
    });
    try {
      await post.save();

      const user = await User.findById(req.userId);

      user.posts.push(post);
      await user.save();

      res.status(201).json({
        message: "Post created successfully",
        post: post,
        creator: { _id: user._id, name: user.name },
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    userId = req.userId;

    try {
      const user = await User.findById(userId);

      if (user.posts.indexOf(postId) < 0) {
        throw Error;
      }

      const post = await Post.findById(postId);

      post.storyTitle = storyTitle;
      post.forRecommendation = forRecommendation;
      post.city = city;
      post.country = country;
      post.storyText = storyText;
      post.summary = summary;
      post.tag = tag;
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
        post.imageUrl = imageUrl;
      }
      await post.save();

      res.status(200).json({ message: "Post updated.", post: post });
    } catch (err) {
      res.status(403).json({ message: "Not authorized" });
    }
  }
};

exports.getRecommendatedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("creator", "name");
    posts.sort((a, b) => b.views - a.views);
    const posts2 = [...posts];
    posts2.sort((a, b) => b.rating / b.votesNumber - a.rating / a.votesNumber);
    res.status(200).json({
      message: "Fetched posts succesfully.",
      postsByViews: posts.slice(0, 5),
      postsByRating: posts2.slice(0, 5),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.body.postId;
  try {
    const post = await Post.findById(postId);
    res.status(200).json({ message: "Post fetched.", post: post });
  } catch (err) {
    res.status(404).json({ message: "Post don't exist" });
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed. entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 500;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl);
    }
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const result = await post.save();

    res.status(200).json({ message: "Post updated.", post: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
