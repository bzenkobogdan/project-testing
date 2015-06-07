var express = require('express'),
    path = require('path'),
    app = express(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    dataConfig = require('./data_config'),
	mongooseConfig = require('./mongoose_config');

app.use("/", express.static(path.join(__dirname, './dist')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')));

var Test = mongoose.model('tests', {name: String, questions: Array});

mongoose.connect(mongooseConfig.src, function() {
	Test.collection.remove();
	insertDataInDb();
});

//Router
app.get('/languages/:language', function(req,res) {
	var language = req.params.language;
	Test.find({name: language}, function(err,doc) {
		res.send(doc);
	})
})

app.get('/languages', function(req,res) {
	var languages = []
	Test.find(function(err,doc) {
		for(var i = 0; i < doc.length; i++) {
			languages.push({
				name: doc[i].name
			})
		}
		res.send(languages);
	})
})

//Insert data in database
function insertDataInDb() {
	for(var i = 0; i < dataConfig.length; i++) {
		fs.readFile(dataConfig[i].src, 'utf8', function(err,doc) {
			var test = new Test(JSON.parse(doc));
			test.save();
		});
	}
}


app.listen(1337, function(){
	console.log('Express server listening on port 1337');
});
