Template.flights.events({
	"input #testTextField": function (event) {
    onInputChange(event.target.value);
  }
});

function onInputChange(inputVal) {
	var APIKey = "ah784286533249542154336639656685";
	var url = "http://api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/BOS-iata/SFO-iata/2015-11-30/2015-12-03?apikey=ah784286533249542154336639656685";
	Meteor.call("queryFlightAvailability", url, function(error, result){
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
	});
}



