Template.flights.events({
	"input #testTextField": function (event) {
		var a = {};
    	createLiveFlightSession(a);
 	},
 	"click .button .primary": function (event) {
 		var input = {};
 		createLiveFlightSession(input);
 	}
});

function testReverseGeocoding() {
	Meteor.call("getLocation", 37.678, -122.452, function(error,result){
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
	});
}

// the function below is the API call to skyscanner's live pricing
/***

***/

function requestLiveFlight(input, result) {
	if (result != undefined && result.data.Status == "UpdatesComplete") {
		// finish recursion
		console.log("finish recursion!");
		return;
	} else {
		Meteor.call("pollSession", input, function (error, result){
				if (error) {
					console.log(error);
				} else {
					window.setTimeout(function() {
						requestLiveFlight(input, result);
					}, 2000);
				}
			});
	}
}

// http://api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/37.776,-122.415-latlong/36.125,-97.065-latlong/2015-11-20/2015-11-25?apikey=ah784286533249542154336639656685

function createLiveFlightSession(input) {
	input = validateLiveFlightInput(input);
	Meteor.call("createLiveFlightSession", input, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
			console.log(result.headers.location);
			requestLiveFlight(result.headers.location, undefined);
			
		}
	});
}

function validateLiveFlightInput(input) {
	if (input.origin == undefined || input.origin == null) {
		input.origin = "37.678,-122.452"; // sf dummy
	}
	if (input.destination == undefined || input.destination == null) {
		input.destination = "40.747,-74.080"; // ny dummy
	}
	if (input.outboundDate == undefined || input.outboundDate == null) {
		input.outboundDate = "2015-11-09";
	}
	if (input.inboundDate == undefined || input.inboundDate == null) {
		input.inboundDate = "2015-11-12";
	}
	if (input.noOfAdults == undefined || input.noOfAdults == null) {
		input.noOfAdults = 1;
	}
	if (input.noOfChildren == undefined) {
		input.noOfChildren = 0;
	}
	if (input.noOfInfants == undefined) {
		input.noOfInfants = 0;
	}
	if (input.cabinClass == undefined) {
		input.cabinClass = "Economy";
	}
	return input;
}

// the function below is the API call to skyscanner's browse quotes
/***
PARAM: an object of parameters. the object must have these properties (follow the exact name):
	<(float)latitude,(float)longitude> origin
	<(float)latitude,(float)longitude> destination
	<(string OR date)> outboundDate // yyyy-MM-dd
	<(string OR date)> inboundDate // yyyy-MM-dd

RETURN: an object of necessary data. The properties are:
	price // int
	isDirectFlight // bool
	outboundCarrier // string
	outboundOrigin // string
	outboundDestination // string
	outboundDate // string or date (the format is "yyyy-MM-ddT00:00:00" so you can parse to date or keep it as string)
	isRoundTrip // bool
	inboundCarrier // string
	inboundOrigin // string
	inboundDestination // string
	inboundDate // string or date (same as outboundDate)

***/

function queryFlightAvailability(input) {
	input = validateInput(input);
	Meteor.call("queryFlightAvailability", input, function(error, result){
		if (error) {
			console.log(error);
		} else {
			var resultQuotes = [];
			for (var i = result.data.Quotes.length - 1; i >= 0; i--) {
				var quote = result.data.Quotes[i];
				if (quote.OutboundLeg != undefined) {
					var outboundLeg = quote.OutboundLeg;
					var outboundCarrier = carrierNameLookup(outboundLeg.CarrierIds[0], result.data.Carriers);
					var outboundOrigin = placeNameLookup(outboundLeg.OriginId, result.data.Places);
					var outboundDestination = placeNameLookup(outboundLeg.DestinationId, result.data.Places);
					var outboundDate = outboundLeg.DepartureDate;
				} else {
					var outboundCarrier = "unknown carrier";
					var outboundOrigin = "";
					var outboundDestination = "";
					var outboundDate = "";
				}
				

				if (quote.InboundLeg != undefined) {
					var isRoundTrip = true;
					var inboundLeg = quote.InboundLeg;
					var inboundCarrier = carrierNameLookup(inboundLeg.CarrierIds[0], result.data.Carriers);
					var inboundOrigin = placeNameLookup(inboundLeg.OriginId, result.data.Places);
					var inboundDestination = placeNameLookup(inboundLeg.DestinationId, result.data.Places);
					var inboundDate = inboundLeg.DepartureDate;

				} else {
					var isRoundTrip = false;
					var inboundCarrier = "unknown carrier";
					var inboundOrigin = "";
					var inboundDestination = "";
					var inboundDate = "";
				}

				if (outboundCarrier != "unknown carrier" && inboundCarrier != "unknown carrier") {
					resultQuotes.push({
						price: quote.MinPrice, // int
						isDirectFlight: quote.Direct, // bool
						outboundCarrier: outboundCarrier, // string
						outboundOrigin: outboundOrigin, // string
						outboundDestination: outboundDestination, // string
						outboundDate: outboundDate.substring(0,10), // string or date
						isRoundTrip: isRoundTrip, // bool
						inboundCarrier: inboundCarrier, // string
						inboundOrigin: inboundOrigin, // string
						inboundDestination: inboundDestination, // string
						inboundDate: inboundDate.substring(0,10), // string or date
					});
				}
			};
			// console.log(resultQuotes);
        	Session.set("flightSearchResults", resultQuotes);
		}
	});
}

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

function validateInput(input) {
	// if (input.origin == undefined || input.origin == null || isNaN(input.origin)) {
	// 	input.origin = "37.678,-122.452"; // sf latlong lol
	// }
	if (input.outboundDate == undefined || input.outboundDate == null) {
		input.outboundDate = "anytime";
	}
	// if (input.inboundDate == undefined || input.inboundDate == null) {
	// 	input.inboundDate = "anytime";
	// }
	return input;
}

function validateLatLng(input) {
	if (input == undefined || input == null || isNaN(input)) {
		return null;			
	} 
}

function formatDate(date) {
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	}

	return yyyy+'-'+mm;
}

Template.flights.helpers({
	search: function() {
		var dateDepart = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
		var dateReturn = formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
		var currLat = 37.627284;
        var currLng = (Number(Session.get('my_lng')));

    	var markerId = Session.get('markerId');
    	var attraction = Attractions.findOne(markerId);
    	if (attraction == undefined) return;
        var eventLat = (Number(attraction.latitude));
 		var eventLng = (Number(attraction.longitude));

        var input = {
        	"origin": ""+currLat+","+currLng,
        	"destination": ""+eventLat+","+eventLng,
        	"outboundDate": ""+dateDepart,
        	"inboundDate": ""+dateReturn
        };
        input = validateInput(input);
        // console.log(input);
      	queryFlightAvailability(input);
      	return Session.get("flightSearchResults");
	},
	isResultsAvailable: function() {
		return Object.keys(Session.get("flightSearchResults")).length != 0;
	}
});