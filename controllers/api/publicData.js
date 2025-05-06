const asyncHandler = require("express-async-handler");
const { postMethods } = require("../../db/postQueries");


//get all post in database
const getPublicPost = asyncHandler(async (req, res, next) => {
  const posts = await postMethods.getPublicPosts();

  res.status(200).json({
    success: true,
    data: {
      posts
    }
  })
});

module.exports = {
  getPublicPost
}