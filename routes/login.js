const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {

  req.session.user_id = req.params.id;
  console.log(req.session);
  res.redirect("/");
  // console.log("res", res);
});



module.exports = router;
