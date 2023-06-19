
const createError = require('../../utility/createError');
const Blog = require('../../models/content/Blog');
const User = require('../../models/user/User.js');

/////CREATE BLOG POST
const createBlogpost = async (req, res, next) => {
  const AddBlogPost = new Blog(req.body);

  try {
    const savedBlogPost = await AddBlogPost.save();
    res.json({
      status: 200,
      message: "Successfully created a new blog post",
      data: savedBlogPost
    });
  } catch (err) {
    next(err);
  }
};

////// UPDATE BLOG POST
const updateBlogPost = async (req, res, next) => {
  try {
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({
      status: 200,
      message: `Post with ID ${req.params.id} updated`,
      data: updatedBlogPost,
    });
  } catch (err) {
    next(err);
  }
};

/////DELETE BLOG POST
const deleteBlogPost = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      message: `Post with ID ${req.params.id} deleted successfully`
    });
  } catch (err) {
    next(err);
  }
};

/////// GET BLOG POST BY ID
const getBlogPost = async (req, res, next) => {
  try {
    const BlogPosts = await Blog.findById(req.params.id);
    res.json({
      status: 200,
      message: `Posts with this ID ${req.params.id} found`,
      data: BlogPosts
    });
  } catch (err) {
    next(err);
  }
};

/////GET ALL POSTS
const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Blog.find()
      .populate('username')
      .exec();

    res.json({
      status: 200,
      message: allPosts,
    });
  } catch (err) {
    next(err);
  }
};

/////GET FEATURED POSTS
const getFeaturedPosts = async (req, res, next) => {
  try {
    const featuredPosts = await Blog.find({ featured: true })
      .populate('username')
      .exec();

    res.json({
      status: 200,
      message: featuredPosts,
    });
  } catch (err) {
    next(err);
  }
};

/////GET RECENT POSTS
const getRecentPosts = async (req, res, next) => {
  try {
    const recentPosts = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('username')
      .exec();

    res.json({
      status: 200,
      message: recentPosts,
    });
  } catch (err) {
    next(err);
  }
};

/////GET MOST VIEWED POST
const getMostViewedPost = async (req, res, next) => {
  try {
    const mostViewedPost = await Blog.findOne()
      .sort({ views: -1 })
      .populate('username')
      .exec();

    res.json({
      status: 200,
      message: mostViewedPost,
    });
  } catch (err) {
    next(err);
  }
};

/////GET RELATED POSTS
const getRelatedPosts = async (req, res, next) => {
  try {
    const relatedPosts = await Blog.find({ category: req.query.category })
      .limit(5)
      .populate('username')
      .exec();

    res.json({
      status: 200,
      message: relatedPosts,
    });
  } catch (err) {
    next(err);
  }
};

/////GET MOST VIEWED CATEGORY
const getMostViewedCategory = async (req, res, next) => {
  try {
    const mostViewedCategory = await Blog.aggregate([
      { $unwind: '$category' },
      {
        $group: {
          _id: '$category',
          views: { $sum: '$views' },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      status: 200,
      message: mostViewedCategory,
    });
  } catch (err) {
    next(err);
  }
};

/////GET ADMIN STATS
const getAdminStats = async (req, res, next) => {
  try {
    // Logic to retrieve admin stats
    // ...

    res.json({
      status: 200,
      message: 'Admin stats retrieved successfully',
      data: adminStats,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};










/*const createError = require('../../utility/createError');
const Blog = require('../../models/content/Blog');
const User = require('../../models/user/User.js')

/////CREATE BLOG POST
const createBlogpost = async (req, res, next) =>{
    const AddBlogPost = new Blog(req.body)

    try{
        const savedBlogPost = await AddBlogPost.save();
        res.json({
            status: 200,
            message: "successfully Created a new blog post",
            data: savedBlogPost
        });

    }catch(err){
        next(err);
    }
}

////// UPDATE HOTEL
const updateBlogPost = async (req, res, next) =>{
    try{
        const updatedBlogPost = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: value },
            { new: true }
          );
          res.json({
            status: 200,
            message: `Post with ID ${req.params.id} updated`,
            data: updatedBlogPost,
          });
        //catch blog for update
    }catch(err){
        next(err);
    }
}

/////DELETE HOTEL
const deleteBlogPost = async (req, res, next) =>{
    try{
        await Blog.findByIdAndDelete(req.params.id);
        res.json({
            status: 200,
            message: `Post with ID:  ${req.params.id} deleted succesfully`
        })
        //catch blog for delete
    }catch(err){
        next(err);
    }
}


/////// GET blog post BY ID
const getBlogPost = async (req, res, next) =>{
    try{
        const BlogPosts = await Blog.findById(req.params.id);
        res.json({
            status: 200,
            message: `Posts with this ID(s) ${req.params.id} found`,
            data: BlogPosts
        })

    }catch(err){
        next(err);
    }
}

/////GET ALL POST
const getAllPost = async (req, res, next) =>{
    try{
        
        const AllPosts = await Blog.find();
        res.json({
            status: 200,
            message: AllPosts
        })

    }catch(err){
        next(err);
    }
}


/////GET ALL HOTELS
const getAllPosts = async (req, res, next) => {
    try {
      const allPosts = await Blog.findOne({title})
        .populate('username')
        .exec();
  
      res.json({
        status: 200,
        message: allPosts,
      });
    } catch (err) {
      next(err);
    }
  };
  



module.exports = {
    createBlogpost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPost,
    getAllPost,
    getAllPosts
  };


  */