Template.page2.events({
	"input #testTextField": function (event) {
		var a = {};
    createLiveFlightSession(a);
  }
});

// the function below is the API call to skyscanner's live pricing
/***

***/

function requestLiveFlight(input) {

}

function createLiveFlightSession(input) {
	input = validateLiveFlightInput(input);
	Meteor.call("createLiveFlightSession", input, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
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
		input.outboundDate = "2015-11-08";
	}
	if (input.inboundDate == undefined || input.inboundDate == null) {
		input.inboundDate = "2015-11-11";
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

function onInputChange(input) {
	input = validateInput(input);
	Meteor.call("queryFlightAvailability", input, function(error, result){
		if (error) {
			console.log(error);
		} else {
			console.log(result);
			var resultQuotes = [];
			for (var i = result.data.Quotes.length - 1; i >= 0; i--) {
				var quote = result.data.Quotes[i];
				var outboundLeg = quote.OutboundLeg;
				var outboundCarrier = carrierNameLookup(outboundLeg.CarrierIds[0], result.data.Carriers);
				var outboundOrigin = placeNameLookup(outboundLeg.OriginId, result.data.Places);
				var outboundDestination = placeNameLookup(outboundLeg.OriginId, result.data.Places);
				var outboundDate = outboundLeg.DepartureDate;

				if (quote.InboundLeg != undefined) {
					var isRoundTrip = true;
					var inboundLeg = quote.InboundLeg;
					var inboundCarrier = carrierNameLookup(inboundLeg.CarrierIds[0], result.data.Carriers);
					var inboundOrigin = placeNameLookup(inboundLeg.OriginId, result.data.Places);
					var inboundDestination = placeNameLookup(inboundLeg.OriginId, result.data.Places);
					var inboundDate = outboundLeg.DepartureDate;

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
						outboundDate: outboundDate, // string or date
						isRoundTrip: isRoundTrip, // bool
						inboundCarrier: inboundCarrier, // string
						inboundOrigin: inboundOrigin, // string
						inboundDestination: inboundDestination, // string
						inboundDate: inboundDate, // string or date
					});
				}
			};
			console.log(resultQuotes);
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
	if (input.origin == undefined || input.origin == null) {
		input.origin = "37.678,-122.452"; // sf latlong lol
	}
	if (input.destination == undefined || input.destination == null) {
		input.destination = "anywhere";
	}
	if (input.outboundDate == undefined || input.outboundDate ==null) {
		input.outboundDate = "anytime";
	}
	if (input.inboundDate == undefined || input.inboundDate == null) {
		input.inboundDate = "anytime";
	}
	return input;
}


