const Category = require("../models/category");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { comment } = require("fontawesome");

exports.postCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.category;
    const category = new Category({
      category: categoryName,
    });
    let success = true;
    res.json({ success, msg: "Category successfully added" });
    return await category.save();
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    console.log(req.params.id);
    if (!user) {
      return res.status(404).send("404 Not found");
    }
    //  if(note.user.toString() !== req.user.id){
    //     return res.status(401).send("not Allowed");
    //  }
    res.json("user deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.postDeleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndRemove(req.params.id);
      if (!category) {
        return res.status(404).send("404 Not found");
      }
      //  if(note.user.toString() !== req.user.id){
      //     return res.status(401).send("not Allowed");
      //  }
      console.log("category deleted");
      res.json("category deleted");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
};

exports.postDeleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      if (!blog) {
        return res.status(404).send("404 Not found");
      }
      //  if(note.user.toString() !== req.user.id){
      //     return res.status(401).send("not Allowed");
      //  }
      console.log("blog deleted");
      res.json("blog deleted");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
};


exports.fetchAllBlogs = async (req, res) => {
    try{
    const allBlogs = await Blog.find().populate('comments.postedBy');
    // const blogs =  allBlogs.map(async (blog)=>{

    //  const myblog= await blog.comments.map((comment)=>{
    //   console.log(95, comment.postedBy.fname);
    //       return {commentorName:comment.postedBy.fname,commentorComment:comment.text};
    //  })
    //  console.log(myblog);
    //  return {
    //   _id:blog._id, 
    //   title: blog.title,
    //   author: blog.author,
    //   description: blog.description,
    //   // image: blog.image,
    //   // likes: blog.likes, 
    //   // comments: myblog
    //  };
    // })
    // console.log(99,  allBlogs);
    // const oneBlog =await blogs.comments.map((comment) => {
    //   return comment.postedBy.fname;
    // })
    // console.log(blogs[0])
    // console.log(oneBlog)
    res.json(allBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};


exports.postUpdateCategory = async(req, res) => {
  const {category} = req.body;
  try{
    //create a new blog object
    const newCategory = {}
    if(category){newCategory.category = category};
    
  
    //find the caetgory to be update
    const categoryy =await Category.findById(req.params.id)
    if(!categoryy){
       return res.status(404).send("404 Not found");
    }
  
    // if(blog.user.toString() !== req.user.id){
    //    return res.status(401).send("not Allowed");
    // }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set: newCategory}, {new: true})
    res.json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
  }

  