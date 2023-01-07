const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jsonwebtoken";
const Blog = require("../models/Blog");
const { findByIdAndUpdate } = require("../models/Blog");

exports.postLogin = async (req, res) => {
  //If there are errors return bad requst and the errors

  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "please try to login with correct Credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      let success = false;
      return res
        .status(400)
        .json({
          success,
          error: "please try to login with correct Credentials",
        });
    }
    const data = {
      user: {
        id: user.id,
        fname: user.fname,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.status(200).json({ success, msg: "successfully Logedin", authtoken, data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.postSignup = async (req, res) => {
  console.log(req.file);
  let success = false;
  //If there are errors return bad requst and the errors

  //check for already existing email
  // const success = false;
  try {
    const duplicateEmail = await User.findOne({ email: req.body.email });
    if (duplicateEmail) {
      return res.status(400).json({ errors: "sorry email alrady exists" });
    }
    //create a new user
    const fname = req.body.fname;
    const lname = req.body.lname;
    const image = req.file.path;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      fname: fname,
      lname: lname,
      image: image,
      password: hashedPassword,
      email: email,
    });

    let success = true;
    res.status(201).json({ success, msg: "successfully created account" });
    return await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id })
    // console.log(84, user)
    .select("-password")
    if (!user) {
      return res.status(400).json({ errors: "User Not Found!" });
    }
    const blog = await Blog.find({ user: req.params.id })
    // console.log(93, blog)
    if (!blog) {
      return res.status(400).json({ errors: "Blog Not Found!" });
    }
    return res.status(200).json({user, blog});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!!!!");
  }
};

exports.follow = async (req, res) => {
  console.log(103, req.body.followId)
  try{
    const user = await User.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user.id}},
      {
        new:true
      })
      if(!user){
        return res.status(404).send("user Not found");
      }
    const user2 = await User.findByIdAndUpdate(req.user.id,{
      $push:{following:req.body.followId}},
      {
        new: true
      })
      if(!user2){
        return res.status(404).send("user2 Not found");
      }
    // console.log(114, user)
    return res.status(200).json({user, user2});
  
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!!!!");
  }
}


exports.unFollow = async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.body.unfollowId,{
      $pull:{followers:req.user.id}},
      {
        new:true
      })
      if(!user){
        return res.status(404).send("user Not found");
      }
    const user2 = await User.findByIdAndUpdate(req.user.id,{
      $pull:{following:req.body.unfollowId}},
      {
        new: true
      })
      if(!user2){
        return res.status(404).send("user2 Not found");
      }
    console.log(114, user)
    return res.status(200).json({user, user2});
  
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!!!!");
  }
}

