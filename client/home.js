Meteor.startup(function() {
    GoogleMaps.load();
});

Template.home.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
    	var latLng = Geolocation.latLng();

    	var marker = new google.maps.Marker({
		   	position: new google.maps.LatLng(latLng.lat, latLng.lng),
		   	animation: google.maps.Animation.DROP,
		   	map: map.instance
		});

      	google.maps.event.addListener(map.instance, 'click', function(event) {
        	Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      	});

      	var markers = {};

      	Markers.find().observe({
        	added: function (document) {
          		var marker = new google.maps.Marker({
            		draggable: true,
            		animation: google.maps.Animation.DROP,
            		position: new google.maps.LatLng(document.lat, document.lng),
            		map: map.instance,
            		id: document._id
          		});

	          	google.maps.event.addListener(marker, 'dragend', function(event) {
	            	Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
	          	});

	          	marker.addListener('click', function(event) {
					console.log("You have clicked on " + marker.id);
					console.log(Markers.findOne(marker.id));
					console.log("Zip code is: ");
				});

          		markers[document._id] = marker;
        	},
        	changed: function (newDocument, oldDocument) {
          		markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        	},
        	removed: function (oldDocument) {
		        markers[oldDocument._id].setMap(null);
		        google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
		        delete markers[oldDocument._id];
        	}
      	});
    });
});

Template.home.helpers({
    mapOptions: function() {
    	var latLng = Geolocation.latLng();
 	    if (GoogleMaps.loaded() && latLng) {
	        return {
        		center: new google.maps.LatLng(latLng.lat, latLng.lng),
	          	zoom: 13
	        };
	    }
    }
});