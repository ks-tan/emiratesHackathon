Template.page2.helpers({
	generate: function () {
		//call the skyscanner api
	},
	result: function() {
		var res = [
		    {
		    	"FlightNo": "SQ1",
				"FlightDateTime": "23:12",
				"Sector": "Commercial Asia",
				"TransitsStations": {
				"TransitsStation": [
					"Hong Kong"
			        ]
			      },
			    "Duration": "12h",
			    "FlightFare": "1000SGD",
				"Currency": "SGD"
		    },
		    {
		    	"FlightNo": "SQ2",
				"FlightDateTime": "23:12",
				"Sector": "Commercial Asia",
				"TransitsStations": {
				"TransitsStation": [
					"Hong Kong"
			        ]
			      },
			    "Duration": "12h",
			    "FlightFare": "1000SGD",
				"Currency": "SGD"
		    }
		]
		return res;
	}
});

Template.page2.events({

});