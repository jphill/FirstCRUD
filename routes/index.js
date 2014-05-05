var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET Hello World page.*/
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!' })
});

/*GET Toylist Page. */
router.get('/toylist', function(req, res) {
	var db = req.db;
	var collection = db.get('toycollection');
	collection.find({},{},function(e,docs){
		console.log(docs);
		res.render('toylist', {
			"toylist" : docs
		});
	});
});

/* GET New User page. */
router.get('/newtoy', function(req, res) {
    res.render('newtoy', { title: 'Add New Toy' });
});

/* POST to Add Toy Service */
router.post('/addtoy', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var childhoodtoy = req.body.childhoodtoy;
    

    // Set our collection
    var collection = db.get('toycollection');

    // Submit to the DB
    collection.insert({
        "childhoodtoy" : childhoodtoy
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /addtoy
            res.location("toylist");
            // And forward to success page
            res.redirect("toylist");
        }
    });
});

module.exports = router;
