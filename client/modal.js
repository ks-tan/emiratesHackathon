Template.eventModal.helpers({
    markerInfo: function() {
    	var markerId = Session.get('markerId');
    	console.log(Attractions.findOne(markerId));
    	return Attractions.findOne(markerId);
    }
});