const express = require('express');
var app=express();
var port=process.env.PORT ||3000;
app.use(express.static(__dirname+"/dist/"));
app.get(/.*/,function(req,res){
    res.sendfile(__dirname+"/dist/index.html");
});
app.listen(port);