const Blog = require("../models/Blog");

exports.postBlog = async (req, res) => {
  //If there are errors return bad requst and the errors
  try {
    const author = req.body.author;
    console.log(author);
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const categoryId = req.body.categoryId;
    console.log(image);

    const blog = new Blog({
      title: title,
      description: description,
      image: image,
      author: author,
      categoryId: categoryId,
      user : req.user.id
    });
    let success = true;
    res.json({ success, msg: "successfully added blog" });
    return await blog.save();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internale server error");
  }
};

exports.postFetchAllBlogs = async (req, res) => {
  try{
  const blogs = await Blog.find()
  res.json(blogs);
} catch (err) {
  console.log(err);
  res.status(500).send("Internal server error");
}
}

exports.postFetchBlogs = async (req, res) => {
  try{
  const blogs = await Blog.find({user: req.user.id})
  return res.json(blogs);
} catch (err) {
  // console.log(err);
  return res.status(500).send("Internal server error");
}
}

exports.getCategoryBlog = async (req, res) => {
  try{
  const blogs = await Blog.find({categoryId: req.params.categoryId})
  res.json(blogs);
} catch (err) {
  console.log(err);
  res.status(500).send("Internal server error");
}
}

exports.postUpdateBlog = async(req, res) => {
  const {title, description, author, categoryId} = req.body;
  try{
  //create a new blog object
  const newBlog = {}
  if(title){newBlog.title = title};
  if(description){newBlog.description = description};
  if(author){newBlog.author = author};
  if(categoryId){newBlog.categoryId = categoryId};

  //find the note to be update
  const blog =await Blog.findById(req.params.id)
  if(!blog){
     return res.status(404).send("404 Not found");
  }

  // if(blog.user.toString() !== req.user.id){
  //    return res.status(401).send("not Allowed");
  // }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: newBlog}, {new: true})
  res.json(updatedBlog);
} catch (err) {
  console.log(err);
  res.status(500).send("Internal server error");
}
}

exports.postDeleteBlog = async (req, res) => {
  try {
  const blog = await Blog.findByIdAndRemove(req.params.id);
  if(!blog){
      return res.status(404).send("404 Not found");
   }

  //  if(blog.user.toString() !== req.user.id){
  //     return res.status(401).send("not Allowed");
  //  }
   console.log('blog deleted');
   res.json('blog deleted')
  } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
}

exports.postLike = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.body.blogId,{
    $push:{likes:req.user.id}},
    {
      new: true
    })
    if(!blog){
      return res.status(404).send("blog Not found");
    }
}

exports.postUnlike = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.body.blogId,{
    $pull:{likes:req.user.id}},
    {
      new: true
    })
    if(!blog){
      return res.status(404).send("blog Not found");
    }
}

exports.postComment = async (req, res) => {
  const comments = {
    text: req.body.text,
    postedBy: req.user.id
  }
  const blog = await Blog.findByIdAndUpdate(req.body.blogId,{
    $push:{comments:comments}},
    {
      new: true
    })
    // .populate('comments.postedBy');
    // console.log(139, comments.postedBy);
    
    // console.log(142, blog)
    if(!blog){
      return res.status(404).send("blog Not found");
    }
}

// exports.myPost = async (req, res) => {
//   try{
//     const myBlog = await Blog.find({user:req.user.id})
//     .populate("user")
//     if(!myBlog){
//       return res.status(404).send("User Not found");
//     }
//     console.log(153, myBlog)
//     return res.status(200).json({myBlog});
//     }
//   catch (err) {
//     console.log(err);
//     res.status(500).send("Internal server error");
//   }
  
// }
exports.myPost = async (req, res) => {
  try{
    const myBlog = await Blog.find({user:req.user.id})
    .populate("user")
    if(!myBlog){
      return res.status(404).send("User Not found");
    }
    console.log(153, myBlog)
    return res.status(200).json({myBlog});
    }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
  
}

