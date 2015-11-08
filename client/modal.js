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
        var mood = "you"
        var lat = Number(Session.get('my_lat'));
        var lng = Number(Session.get('my_lng'));
        //find markers around your area, and place you.png on top of them
        var nearYou = getNearYou(lat, lng);
        console.log(nearYou);
        $("#yourMarker").modal("hide");
        nearYou.forEach(function (marker) {
          console.log(marker.latitude + ", " + marker.longitude);
          //insert markers
          map = globalMap;

          var image = {
            url: 'images/'+mood+'.png',
            scaledSize: new google.maps.Size(45, 45),
            origin: new google.maps.Point(0, 0),
          };

          var marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker.latitude ,marker.longitude),
                map: map.instance,
                icon: image,
                opacity: 0.01,
                zIndex: 500,
                id: document._id
          });
        });

        marker.addListener('click', function(event) {
           showListModal(event);
         });
    }
})

function getNearYou(lat,lng){
    return Attractions.find({
        latitude: {
            $gt: lat-5.0, $lt: lat+5.0
        },
        longitude: {
            $gt: lng-5.0, $lt: lng+5.0
        }
    });
}


