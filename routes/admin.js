const express = require('express');
const router = express.Router();
const adminController = require("../controller/admin");

router.post('/category', adminController.postCategory);

router.get('/category', adminController.getCategory);

router.get('/user', adminController.getUser);

router.delete('/postDeleteUser/:id', adminController.postDeleteUser)

router.delete('/postDeleteCategory/:id', adminController.postDeleteCategory);

router.delete('/postDeleteBlog/:id', adminController.postDeleteBlog);

router.get('/getBlog', adminController.fetchAllBlogs);

router.put('/postUpdateCategory/:id',adminController.postUpdateCategory);

module.exports = router;