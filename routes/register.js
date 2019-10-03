var express = require('express');
var router = express.Router();
const Print = require("../models/Print");
const Detail = require("../models/Detail");
const multer = require("multer")
const upload = multer({dest:__dirname+"/views../public/images/print"})


router.post("/printer", (req, res) => {
  debugger;
  const name = req.body.name;
  Print.create({
        name
  })
  .then(
    res.redirect("/post")
  )
});


router.post("/photo",upload.single("photo"), (req, res) => {
  const { name,path,description,type } = req.body;
  debugger;
  Print.find({ type: type })
  .then(printer => {
    debugger; //check printer id
    Detail.create({
      name,
      path,
      description,
      type,
      printTypeID: printer
    })
  })
  .then(
    res.redirect("/post")
  );
});

module.exports = router;
