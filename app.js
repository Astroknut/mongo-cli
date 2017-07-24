const mongo = require("mongodb").MongoClient;
const prompt = require("prompt-sync")();
const url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  const collection = db.collection('restaurants');
  console.log("Check out Mongo for our collection of restaurants!")
  const userAction = prompt("Would you like to view, view all, add, update, or delete?: ");

  	//SHOW ALL RESTAURANTS
  	if(userAction == "view all"){
    	collection.find().toArray(function(err, doc){
      	console.log(doc);
    	});

  	//USER FIND SPECIFIC RESTAURANT
  	} else if(userAction == "view"){
  		const userChoice = prompt("Type the name of the restaurant you would like to see: ");
  		collection.find({"name": userChoice}).toArray(function(err,doc) {
  			console.log(doc);
  			});

  	//USER ADDS NEW RESTAURANT
  	} else if (userAction == "add"){	
 		const userNew = prompt("Add Your Own Restaurant!: ");
 		const yelpChoice = prompt("What is the yelp page?: ");
 		const street = prompt("what is the street address?");
 		const zip = prompt("what is the Zip code?");
 		collection.insert({
  			"name": userNew,
  			"address": {
  				"street": street,
  				"zipcode": zip
			},	
  			"yelp": yelpChoice
  		});
		collection.find().toArray(function(err,doc) {
  		console.log(doc);
  	});

	//USER UPDATES RESTAURANT
	} else if (userAction == "update") {
		const updateName = prompt("Which restaurant would you like to update? Name: ");
		const updateType = prompt("What would you like to change: name/address/yelp: ");
	
		if(updateType == "name"){
			const newName = prompt("What is the new name?: ");
			collection.update(
				{name: updateName},
				{ $set: {name: newName}}
				);
			collection.find().toArray(function(err,doc) {
				console.log(doc);
		 	});
		} else if (updateType == "address"){
			const street = prompt("What is the new street?: ");
			const zip = prompt("What is the new Zip code?: ");	
			collection.update(
				{name: updateName},
				{ $set: {address: {
					street: street,
					zipcode: zip}
					}
				});
			collection.find().toArray(function(err,doc) {
				if (err) console.log(err);
				console.log(doc);
			});
		} else if (updateType == "yelp"){
			const newYelp = prompt("What is the new Yelp link?: ");
			collection.update(
				{name: updateName},
				{ $set: {yelp: newYelp}}
				);
			collection.find().toArray(function(err,doc) {
				console.log(doc);
				});
			}

	//USER DELETES RESTAURANT
	} else if (userAction == "delete"){
		var deleteChoice = prompt("Which restaurant would you like to delete? Name: ");
		collection.remove({name: deleteChoice});
		collection.find().toArray(function(err,doc) {
			console.log(doc);
		});
	}
});