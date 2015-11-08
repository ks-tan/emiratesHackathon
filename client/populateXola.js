
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
				pictureUrl: photoUrl
			});
		}

		if (json.paging.next != null) {
			var nextPageUrl = "https://dev.xola.com" + json.paging.next
			console.log(nextPageUrl)
			getXolaExperiences(nextPageUrl)
		}
	});
}