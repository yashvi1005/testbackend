const express = require('express');
const router = express.Router();
const authController = require("../controller/auth");
const multer = require("multer");
const path = require('path');
const fetchuser = require("../middleware/fetchuser")


const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads')
      },
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
        }
    })

    // const fileFilter = (req, file, cb) => {
    //   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    //   if(allowedFileTypes.includes(file.mimetype)){
    //     cb(null, true)
    //   }else{
    //     cb(null, false);
    //   }
    // }


    const upload = multer({storage})


router.post('/login', authController.postLogin )

router.post('/signup', upload.single('image') ,authController.postSignup )

router.get('/user/:id',fetchuser, authController.getUser);

router.put('/follow', fetchuser, authController.follow);

router.put('/unfollow', fetchuser, authController.unFollow);


module.exports = router;