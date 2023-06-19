// auth.js
const router = require('express').Router();
const blog = require('../../controllers/content/blog');
const { verifyToken, verifyAdmin } = require('../../utility/verifytoken');


router.get('/', (req, res)=>{
    res.send(" blog posts")
});
router.post('/create/:userId', verifyAdmin, blog.createBlogpost);
router.put('/update/:id', verifyAdmin, blog.updateBlogPost);
router.delete('/delete/:id', verifyAdmin,  blog.deleteBlogPost);
router.get('/view', blog.getAllPosts);
router.get('/viewpost', blog.getBlogPost); /// VIEW POST WITH ID


///FEATURES
router.get('/featured', blog.getFeaturedPosts)
// recents
router.get('/recent', blog.getRecentPosts)
// most viewed post
router.get('/mostViewed', blog.getMostViewedPost)
//related
router.get('/related', blog.getRelatedPosts)
//mostviewd catgory
router.get('/mostviewdcat', blog.getMostViewedCategory)
//// stats for admin
router.get('/stats', verifyAdmin, blog.getAdminStats)

module.exports = router;


/*
 createBlogpost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPost,
  getAllPosts,
  getFeaturedPosts,
  getRecentPosts,
  getMostViewedPost,
  getRelatedPosts,
  getMostViewedCategory,
  getAdminStats


*/
