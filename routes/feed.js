const express = require("express");
const { body } = require("express-validator");

const feedControllers = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/GetAllPosts", feedControllers.getPosts);

router.get("/GetTopRatedStories", feedControllers.getTopRatedStories);

router.post("/CreateNewStory", isAuth, feedControllers.createNewPost);

router.post("/getSearchedStories", feedControllers.getSuggestions);

router.post("/DeleteStory", isAuth, feedControllers.DeleteStory);

router.post("/RateStory", isAuth, feedControllers.rateStory);

router.post("/GetStorybyId", feedControllers.getPostById);

router.get("/GetMyStories", isAuth, feedControllers.getMyStories);

router.get("/GetUserData", isAuth, feedControllers.getUserData);

router.post("/GetPost", isAuth, feedControllers.getPost);

router.get("/GetRecommendatedPosts", feedControllers.getRecommendatedPosts);

router.post("/CheckUserName", feedControllers.CheckUserName);

router.post("/CheckEmail", feedControllers.CheckEmail);

router.post("/ChangeUserDetails", isAuth, feedControllers.ChangeUserDetails);
// router.post("/ModifyStory", isAuth, feedControllers.ModifyStory);

module.exports = router;
