const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

const mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}) );

var jokes=[{setup:"Our wedding was so beautiful,",punchline:"even the cake was in tiers", votes: 0},{setup:"I'm reading a book on the history of glue",punchline:"I just can't seem to put it down", votes: 0},{setup:"What do you call an Argentinian with a rubber toe?",punchline:"Roberto", votes: 0}];
var uri = "mongodb://swati:hello@ds145385.mlab.com:45385/jokesdb";


var db1;
	mongodb.connect(uri,function(err,db) {
	if(err) {return console.log(err);}
	db1=db;
	app.listen(3000,function(){
	//console.log('listening onport 3000');
} );
});

app.get('/', function(req, res){
//	res.sendFile(__dirname+'/index.html');
	//console.log();
	db1.collection('jokes').find().toArray(function(err, results){
		if(err) return console.log(err);
		
		res.render('index.ejs',{jok: results});
		
	} );
	
});

app.post('/jokes',function(req,res) {
	
db1.collection('jokes').save(req.body,function(err,result){
	if(err) return console.log(err);
	
	//console.log(req.body +"saved to database");
	res.redirect('/'); 
} );
	
});


app.delete('/jokes', function(req, res) {
	//console.log(req.body.setup);
  db1.collection('jokes').findOneAndDelete({setup: req.body.setup}, function(err, result)  {
    if (err) return res.send(500, err);
    //res.send('entry deleted');
	res.redirect('/');
  })
});

app.put('/jokes', function(req, res) {
	//console.log("inside app.put"+req.body.setup,req.body.setup1, req.body.punchline1);
  db1.collection('jokes').findOneAndUpdate({setup: req.body.setup},
				{$set:{setup:req.body.setup1, punchline: req.body.punchline1}}, 
				function(err, result) {	
				if (err) return res.send(500, err);
		//		console.log("respnose redirect");
				res.redirect('/');
  
				});

  });
