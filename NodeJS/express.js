var express = require('express');
var app = express();
var fs = require('fs');

app.get('/listing',function functionName(req,res) {
  //res.send('User Listeleme');
  fs.readFile('users.json','utf8',function(err,data){
    console.log(data);
    res.end(data);
  });
});

app.get('/add',function functionName(req,res) {
  //res.end('User Add')
  var newUser = {
    "User4":{
      "name": req.query.isim,
      "password":req.query.password,
      "email":req.query.password
    }
  };
    fs.readFile('users.json','utf8',function(err,data){
      //console.log(data);
      data = JSON.parse(data);
      data["User4"] = newUser["User4"];
      console.log(data);
      res.end(JSON.stringify(data));
      fs.writeFile('users.json',JSON.stringify(data),function(err){
        console.log('Add Error');
      });
  });
});

app.get('/delete',function functionName(req,res) {
  fs.readFile('users.json','utf8',function(err,data){
    //console.log(data);
    data = JSON.parse(data);
    delete data["User4"];
    console.log(data);
    res.end(JSON.stringify(data));
    fs.writeFile('users.json',JSON.stringify(data),function(err){
      console.log('Delete Error');
    });
});
  res.end('User delete')
});

app.get('/sorgula',function functionName(req,res) {
  res.end('User sorgula')
});

var server = app.listen(8000,function(){
  console.log('sunucu çalışıyor');
  });
