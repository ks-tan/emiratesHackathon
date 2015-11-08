Meteor.methods({
	queryFlightAvailability: function(url) {
		this.unblock();
		return HTTP.get(url);
	}
});