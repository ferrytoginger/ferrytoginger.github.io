'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

// iterating through object with .map method returning array of objects
var postsList = Object.keys(posts).map(function(value){
                                    return posts[value]});


// assiging express to app
var app = express();

// mount URL to static server
// add static server middleware as second parameter: path static files in folder 'public'
    // setting route relative from running app to public folder using __dirname
app.use('/static', express.static( __dirname + '/public'));

// view engine to jade
// setting route using __dirname
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');


// register route to root of site with 'get'
    // locationparameter + callback function with 2 parameters: request/response
    //render index.jade template
app.get('/', function(req, res){
    var path = req.path
    res.locals.path = path
	res.render('index');
});


// calling blog posts - and blog main page if title is undefined
app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if (title === undefined){
        res.status(503);
        res.render('blog', {posts: postsList});
    } else {
    var post = posts[title] || {};
    res.render('post', {post: post});
    }
});

// REST
app.get('/posts', function(req, res) {
    res.json(postsList);
});

// assigning port to serve app
    // callbackfunction as second parameter
app.listen(3000, function(){
	console.log("The frontend server is running on port 3000!")
});
