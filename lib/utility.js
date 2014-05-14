var request = require('request');
var session = require('express-session');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/

exports.checkSession = function(req,res, callback) {

  if (!req.session.user) {
    res.redirect('/login');
  } else {
    callback(req,res);
  }

  // ideally we would be able to also check if
  // the session has recently expired
};

exports.redirectIfLoggedIn = function (req, res,callback) {
  if (req.session && req.session.user) {
    res.redirect('/index');
  } else {
    callback();
  }
};

exports.generateSessionKey = function(req,res) {
  req.session.regenerate(function(){
    req.session.user = req.body.username;
    req.session.cookie.maxAge = 6000;
    console.log(req.session.user);
    res.redirect('/');
  });
};
