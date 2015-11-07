
Template.populateStub.helpers({
	populateCollections: function() {
		getStubHubData()
	}
});

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
