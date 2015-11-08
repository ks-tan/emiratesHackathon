Template.eventModal.helpers({
    markerInfo: function() {
    	var markerId = Session.get('markerId');
    	return Attractions.findOne(markerId);
    },
    isXola: function(source){
    	console.log(source == "Xola");
    	return source == "Xola";
    }
});

Template.eventModal.onRendered({ 
	function() {
        var co=document.createElement("script");
        co.type="text/javascript";
        co.async=true;
        co.src="https://xola.com/checkout.js";
        var s=document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(co, s);
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