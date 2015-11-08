Meteor.methods({
	queryFlightAvailability: function(input) {
		this.unblock();
		var APIKey = "ah784286533249542154336639656685";
		var url = "http://api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US";
		if (input.origin != "anywhere") {
			var origin = input.origin + "-latlong";
		} else {
			var origin = input.origin;
		}
		if (input.destination != "anywhere") {
			var destination = input.destination + "-latlong";
		} else {
			var destination = input.destination;
		}
		var outboundDate = input.outboundDate;
		var inboundDate = input.inboundDate;
		url = url +"/"+ origin +"/"+ destination +"/"+ outboundDate +"/"+ inboundDate + "?apikey=" + APIKey;
		return HTTP.get(url);
	}
});

function carrierNameLookup(carrierId, carrierArray) {
	for (var i = carrierArray.length - 1; i >= 0; i--) {
		var carrier = carrierArray[i];
		if (carrierId == carrier.CarrierId) {
			return carrier.Name;
		}
	};
	return "unknown carrier";
}

function placeNameLookup(placeId, placeArray) {
	for (var i = placeArray.length - 1; i >= 0; i--) {
		var place = placeArray[i];
		if (placeId == place.PlaceId) {
			return place;
		};
	};
	return {};
}