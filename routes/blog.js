const express = require('express');
const router = express.Router();
const blogController = require("../controller/blog");
const fetchuser = require("../middleware/fetchuser")
const multer = require("multer");

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads')
      },
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        }
    })
const upload = multer({storage:storage})

router.post('/postblog', fetchuser , upload.single('image') ,blogController.postBlog )

router.get('/postFetchAllBlogs', blogController.postFetchAllBlogs)

router.get('/postFetchBlogs', fetchuser , blogController.postFetchBlogs)

router.get('/blog/:categoryId', blogController.getCategoryBlog);

router.put('/postUpdateBlog/:id', fetchuser,blogController.postUpdateBlog);

router.delete('/postDeleteBlog/:id', fetchuser,blogController.postDeleteBlog);

router.put("/like", fetchuser,  blogController.postLike);

router.put("/unlike", fetchuser,  blogController.postUnlike);

router.put("/comment", fetchuser,  blogController.postComment);

router.get("/myPost",fetchuser, blogController.myPost)

module.exports = router;