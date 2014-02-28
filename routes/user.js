
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.createCaptcha = function(req, res){
    var ccap = require('ccap')();
    var ary = ccap.get();
    var txt = ary[0].toLocaleString().toLowerCase();
    var buf = ary[1];
    req.session.captchaTxt = txt;
    res.end(buf);
}

exports.checkCaptcha = function(req, res){
    var captchaVal = req.query.captchaVal.toLocaleString().toLowerCase();
    if(captchaVal == req.session.captchaTxt){
        res.send("1");
    }else{
        res.send("0");
    }
}