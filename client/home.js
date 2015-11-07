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

		marker.addListener('click', function(event){
			$("#yourMarker").modal("show");
		});

      	// google.maps.event.addListener(map.instance, 'click', function(event) {
       //  	Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      	// });

      	var markers = {};

      	Attractions.find().observe({
        	added: function (document) {
        		var location = document.location;
        		var lat = location.substring(0, location.indexOf(", "));
        		var lng = location.substring(location.indexOf(" "));
          		var marker = new google.maps.Marker({
            		//draggable: true,
            		//animation: google.maps.Animation.DROP,
            		position: new google.maps.LatLng(lat,lng),
            		map: map.instance,
            		id: document._id
          		});

	          	// google.maps.event.addListener(marker, 'dragend', function(event) {
	           //  	Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
	          	// });

	          	//click event marker
	          	marker.addListener('click', function(event) {
					Session.set('markerId', marker.id);
					$("#eventMarker").modal("show");
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