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
        var currEvent = Attractions.findOne(id);
        var lat = currEvent.latitude.toString();
        var lng = currEvent.longitude.toString();
        Meteor.call('getLocation', lat, lng, function(err, data){
            if (typeof err != "undefined") {
                console.log(err);
                return
            }
            var tmp = data.results[0].address_components
            for (var i in tmp) {
                if (tmp[i].types[0] == "administrative_area_level_1") {
                    loc = tmp[i].long_name;
                    console.log(loc);
                    break
                }
            }
            Watchlist.insert({
                attractionId: id,
                state: loc
            });
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
        console.log(lat);
        console.log(lng);
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
        moodsList = ['Fun', 'Romance', 'Adventurous'];
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
        var editText = $("#romanceValue").text();
        var num = Number(editText.substring(editText.indexOf(" "),editText.indexOf("%"))) + 5;
        $("#romanceValue").html("<i class='heart icon'></i>Romantic: " + num + "%");
        var editText = $("#adventureValue").text();
        var num = Number(editText.substring(editText.indexOf(" "),editText.indexOf("%"))) - 5;
        $("#adventureValue").html("<i class='send icon'></i>Adventure: " + num + "%");
    }
})



