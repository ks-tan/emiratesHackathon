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

Template.listModal.helpers({
    eventList: function() {
        var lat = Number(Session.get("lat"));
        var lng = Number(Session.get("lng"));
        return Attractions.find({
            latitude: {
                $gt: lat-0.5, $lt: lat+0.5
            },
            longitude: {
                $gt: lng-0.5, $lt: lng+0.5
            }
        });
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
        var lat = Number(Session.get('my_lat'));
        var lng = Number(Session.get('my_lng'));
        Markers.insert({
            latitude: lat,
            longitude: lng,
            mood: mood
        });
        $("#yourMarker").modal("hide");
    }
})