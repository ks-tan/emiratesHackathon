Template.eventModal.helpers({
    markerInfo: function() {
    	var markerId = Session.get('markerId');
    	return Attractions.findOne(markerId);
    },
    isInWatchlist: function(id) {
        var watchlist = Watchlist.findOne({attractionId: id});
        console.log(typeof watchlist !== "undefined")
        return typeof watchlist !== "undefined"
    }
});

Template.eventModal.events({
    'click #smapButton': function(event) {
        var id = event.target.value;
        Watchlist.insert({
            attractionId: id
        });
        // $("#smapButton").attr('disabled','disabled');
        // $("#smapButton").text('SMapped');
        $("#eventMarker").modal("show");
    }
})

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

Template.listModal.events({
    'click #findOutMoreButton': function() {
        Session.set('markerId', this._id);
        $("#eventMarker").modal("show");
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