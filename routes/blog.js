// auth.js
const router = require('express').Router();
const blog = require('../controllers/content/blog');
const { verifyToken, verifyAdmin } = require('../utility/verifytoken');


router.post('/', (req, res)=>{
    res.send(" blog posts")
});
router.post('/create', verifyAdmin, blog.createBlogpost);
router.put('/update', verifyAdmin, blog.updateBlogPost);
router.delete('/delete', verifyAdmin,  blog.deleteBlogPost);
router.get('/view', blog.getBlogPost);

// recents
router.get('/update')
// most viewed post
router.get('/update')
//related
router.get('/update')
//mostviewd catgory
router.get('/update')
//// stats for admin
router.get('/stats', verifyAdmin)

module.exports = router;
