var express = require('express');
var router = express.Router();
const Spacebrew = require('spacebrew');

//Spacebrew setup
// const server = "sandbox.spacebrew.cc";
const server = "localhost";
const name = "indexclient";
const description = "tocktock";
const sb = new Spacebrew.Client( server, name, description );
let customValue

//Spacevrew Subscriber 
sb.addSubscribe("indexsubscriber", "dice");

sb.onCustomMessage = function onCustomMessge( name, value, type ){
  console.log("Message from server: "+value);
  console.log("message type: "+type);
  customValue = value;
};

sb.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  sb.connect();
  console.log("customValue",customValue)
  res.render('index', { title: 'PRINT BIBLE', number: customValue});
});

module.exports = router;
