var express = require('express');
var router = express.Router();
const Spacebrew = require('spacebrew');
const http = require('http');
const HttpDispatcher = require('httpdispatcher');;
const dispatcher = new HttpDispatcher();

//Spacebrew setup
// const server = "sandbox.spacebrew.cc";
const server = "localhost";
const name = "fbclient";
const description = "facebook";
const sb = new Spacebrew.Client( server, name, description );

//Spacevrew Subscriber 
sb.addPublish( "fbPublisher", "boolean", false);
sb.addSubscribe("fbSubscriber", "boolean");

sb.onBooleanMessage = function onBoolean( name, value ){
  console.log("Boolean Message from Server: "+value);
};

// router.get('/clicked', function(req, res, next) {
//   sb.send("fbPublisher", "boolean", "true");
//   // res.redirect('/riso');
// });

sb.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fb', { title: 'fakebook'});
});



const hello = function hello(){
  sb.send( "button_pressed", true);
}

module.exports = hello;
module.exports = router;
