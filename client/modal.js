Template.eventModal.helpers({
    markerInfo: function() {
    	var markerId = Session.get('markerId');
    	return Attractions.findOne(markerId);
    }
});

Template.eventModal.events({
	'click .smapButton': function(event){
		var id = event.target.value;
		
	}
});

Template.yourModal.helpers({
    moods: function() {
        moodsList = ['Happy', 'Romance', 'Adventurous', 'Calm'];
        return moodsList
    }
})

Template.yourModal.events({
    'click .chooseYourMood': function(event) {
        var mood = event.target.value;
        var lat = Session.get('lat');
        var lng = Session.get('lng');
        Markers.insert({
            latitude: lat,
            longitude: lng,
            mood: mood
        });
        $("#yourMarker").modal("hide");
    }
})