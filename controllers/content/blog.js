const createError = require('../../utility/createError');
const Blog = require('../../models/content/Blog');

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


/////// GET HOTEL BY ID
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

/////GET ALL HOTELS
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





module.exports = {
    createBlogpost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPost,
    getAllPost
  };