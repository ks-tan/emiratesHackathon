
Template.populateXola.helpers({
	populateCollections: function(){
		getXolaExperiences("https://dev.xola.com/api/experiences?limit=100")
	},

	populateStubHubCollections: function() {
		getStubHubData()
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
				location: location.lat + ", " + location.lng,
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

getStubHubData= function(){
    Meteor.call('populateStubHub', function(err, data) { 
        if (typeof err != "undefined") {
            console.log(err);
            return
        }

        for (var state_index in data) {
            stateData = data[state_index]
            for (var event_index in stateData) {
                eventData = stateData[event_index];
                console.log(eventData);
                var id = eventData.id;
                var name = eventData.name;
                var desc = eventData.description;
                var loc = eventData.venue.latitude + ", " + eventData.venue.longitude;
                console.log(location);
                var ticketPrice = "NA"
                if (typeof eventData.ticketInfo !== "undefined") {
                    ticketPrice = eventData.ticketInfo.minPrice
                }
                var pictureUrl = "";
                if (typeof eventData.imageUrl !== "undefined") {
                    pictureUrl = eventData.imageUrl
                }

                Attractions.insert({
                    _id: id,
                    source: "StubHub",
                    title: name,
                    description: desc,
                    location: loc,
                    price: ticketPrice,
                    pictureUrl: pictureUrl
                });
            }
        }
    });
}
