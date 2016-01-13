'use strict'

var express = require('express')

var app = express()


app.set('view_engine', 'jade')
app.set('views', 'views')

app.get('/', function(req, res){
  res.render('home.jade')
})

app.listen(3000, function(){
  console.log("Server listening on 3000");
})
