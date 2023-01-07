const jwt = require("jsonwebtoken");
const JWT_SECRET = "jsonwebtoken";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token & add id to req. object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if(data) {
      req.user = data.user;
      next();
    } else {
      
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
