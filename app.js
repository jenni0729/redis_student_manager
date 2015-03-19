var express = require("express"),
app = express(),
redis = require("redis"),
client = redis.createClient(),
methodOverride = require("method-override"),
bodyParser = require("body-parser");
//storing dependencies in variables to be able to call them later. 
//They're strings because dependencies are stored in JSON files


app.set("view engine", "ejs"); 
//using set method for express configuration and now trying to apply
//ejs functionality to Express

//MIDDLEWARE THAT ARE NEEDED
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

client.lrange("")
}

    //post route
app.post('/create', function(req, res){
    client.lpush("students", req.body.student);
    res.redirect("/");
});

app.delete('/remove/:student', function(req, res){
    client.lrange("students", 0, -1, function(err, students){
        students.forEach(function(student){
            if(req.params.student === student) {
                client.lrem("students", 1, student);
                res.redirect("/");
            }
        });
    });
});

// Start the server
app.listen(3000, function(){
    console.log("Server starting on port 3000");
});


