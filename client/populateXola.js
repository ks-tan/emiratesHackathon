
Template.populateXola.helpers({
	populateCollections: function(){
		getXolaExperiences("https://dev.xola.com/api/experiences?limit=100")
	}
});

getXolaExperiences = function(url){
	Meteor.call("populateXola", url , function(err, result) {
		if (typeof err != "undefined") {
			console.log(err);
			return
		}

		var json = result.data
		var experiences = json.data

		for (x in experiences) {

			//randomise emotions
			var randomNum = Math.floor((Math.random() * 4) + 1);
			var mood;
			if (randomNum == 1){
				mood = "happy";
			} else if (randomNum == 2){
				mood = "love";
			} else if (randomNum == 3){
				mood = "nature";
			} else {
				mood = "adventure";
			}

			var experience = experiences[x]
			var name = experience.name
			var description = experience.desc
			var location = experience.geo
			var photo = experience.photo
			var photoUrl = ""
			if (typeof photo != "undefined"){
				photoUrl = "https://dev.xola.com" + photo.src
			}
			if (typeof name == "undefined" || typeof location.lat == "undefined") {
				console.log(x)
				continue;
			}
			Attractions.insert({
				_id: experience.id,
				source: 'Xola',
				title: name,
				description: description,
                latitude: Number(location.lat),
                longitude: Number(location.lng),
				price: experience.price,
				pictureUrl: photoUrl,
				mood: mood
			});

			getXolaDateAndTime(experience.id);
		}

		if (json.paging.next != null) {
			var nextPageUrl = "https://dev.xola.com" + json.paging.next
			console.log(nextPageUrl)
			getXolaExperiences(nextPageUrl)
		}
	});
}

getXolaDateAndTime = function(id){
	var url = "https://dev.xola.com/api/experiences/" + id + "/availability";
	Meteor.call("populateXola", url , function(err, result) {
		if (typeof err != "undefined") {
			console.log(err);
			return
		}

		var dateList = result.data

		for (date in dateList) {
			Attractions.update(id, {
				$set: {date: date}
			})
			break;
		}
	})
}