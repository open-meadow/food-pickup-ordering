const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log("email", req.body.userEmail);
  console.log("password", req.body.userPW);
  console.log("req.params.id", req.params.id);
  req.session.user_id = req.params.id;

  res.redirect("/");
});



module.exports = router;
