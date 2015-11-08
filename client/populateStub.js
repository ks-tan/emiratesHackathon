
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
                var date = eventData.eventDateLocal;
                console.log(typeof date);
                if (typeof eventData.id === "undefined" || eventData.id == "" || typeof Attractions.findOne({_id: String(eventData.id)}) !== "undefined") {
                	continue
                }
                var id = String(eventData.id);
                var name = eventData.name;
                var desc = eventData.description;
                var lat = Number(eventData.venue.latitude)
                var lng = Number(eventData.venue.longitude)
                console.log(location);
                var ticketPrice = "NA"
                if (typeof eventData.ticketInfo !== "undefined") {
                    ticketPrice = eventData.ticketInfo.minPrice
                }
                var pictureUrl = "";
                if (typeof eventData.imageUrl !== "undefined") {
                    pictureUrl = eventData.imageUrl
                }
                var date = eventData.eventDateLocal;
                console.log(date);

                Attractions.insert({
                    _id: id,
                    source: "StubHub",
                    title: name,
                    description: desc,
                    latitude: lat,
                    longitude: lng,
                    price: ticketPrice,
                    pictureUrl: pictureUrl

                });
            }
        }
    });
}
