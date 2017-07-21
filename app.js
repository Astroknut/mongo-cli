const mongo = require("mongodb").MongoClient;
const prompt = require("prompt-sync")();
const url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  const collection = db.collection('restaurants');
   	var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  	if(allChoice == "all"){
    	collection.find().toArray(function(err, doc){
      	console.log(doc);
    	});
  	} else {
    	console.log("Aw, you don't want to see the restaurants?");
  	}


  //USER FIND SPECIFIC RESTAURANT
  	const userChoice = prompt("Type the name of the restaurant you would like to see: ");
  	collection.find({"name": userChoice}).toArray(function(err,doc) {
  		console.log(doc);
  		});

  	//USER ADDS NEW RESTAURANT	
 	const userNew = prompt("Add Your Own Restaurant!: ");
 	const yelpChoice = prompt("What is the yelp page?: ");
 	collection.insert({
  		"name": userNew,
  		"yelp": yelpChoice
  	});
	collection.find().toArray(function(err,doc) {
  	console.log(doc);
  });


	//USER UPDATES RESTAURANT
	const updateName = prompt("Which restaurant would you like to update? Name: ");
	const nameChange = prompt("Would you like to change the name? Y or N: ");
	if(nameChange == "Y"){
		const newName = prompt("What is the new name?: ");
		collection.update(
			{name: updateName},
			{ $set: {name: newName}}
			);
		collection.find().toArray(function(err,doc) {
			console.log(doc);
		 });
	} else if(nameChange == "N"){
		const addressChange = prompt("Would you like to change the address? Y or N: ");
		if(addressChange == "Y"){
			console.log("Too bad thats not happeneing yet");
		} else if(addressChange == "N") {
			const yelpChange = prompt("Would you like to change the Yelp URL? Y or N: ");
			if(yelpChange == "Y") {
				const newYelp = prompt("What is the new Yelp link?: ");
				collection.update(
					{name: updateName},
					{ $set: {yelp: newYelp}}
					);
				collection.find().toArray(function(err,doc) {
					console.log(doc);
				})
			} else if(yelpChange == "N") {
				console.log("You didn't change anything!");
			}
		}
		
	}


	//USER DELETES RESTAURANT
	var deleteChoice = prompt("Which restaurant would you like to delete? Name: ");
	collection.remove({name: deleteChoice});
	collection.find().toArray(function(err,doc) {
		console.log(doc);
	});
});