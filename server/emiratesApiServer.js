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
	},
	createLiveFlightSession: function(input) {
		var APIKey = "ah784286533249542154336639656685";
		var url = "http://api.skyscanner.net/apiservices/pricing/v1.0/?apikey=" + APIKey;
		var urlQuery = "country=US&currency=USD&locale=en-US&locationSchema=iata&grouppricing=true";
		var origin = "&originplace=" + input.origin;
		var destination = "&destinationplace=" + input.destination;
		var outboundDate = "&outbounddate=" + input.outboundDate;
		var inboundDate = "&inbounddate=" + input.inboundDate;
		var adults = "&adults=" + input.noOfAdults; // 1-8
		var children = "&children=" + input.noOfChildren; // 0-8
		var infants = "&infants=" + input.noOfInfants; // 0- no of adults
		var cabinClass = "&cabinclass=" + input.cabinClass; // ["Economy", "PremiumEconomy", "Business", "First"]
		urlQuery = url + origin + destination + outboundDate + inboundDate + adults + children + infants + cabinClass;

		HTTP.get(url, {
			Headers: {
				"Host": "api.skyscanner.net"
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		}, function(error,success) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});

	}
});