var express = require('express');
var router = express.Router();
const Spacebrew = require('spacebrew');

//Spacebrew setup
// const server = "sandbox.spacebrew.cc";
const server = "localhost";
const name = "risoclient";
const description = "tocktock";
const sb = new Spacebrew.Client( server, name, description );
const videoArr = ["risovideo1.mp4","risofile.mp4"];
let customValue


//Spacevrew Subscriber 
sb.addSubscribe("risoSubscriber", "range");

sb.onRangeMessage = function onRangeMessage( name, value ){
  console.log("Message from server: "+value);
  customValue = value;
};

sb.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('riso', { title: 'RISO ROOM', number:customValue, video:videoArr[0]});
});

module.exports = router;
