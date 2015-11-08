Meteor.startup(function() {
    GoogleMaps.load();
});

Template.home.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      globalMap = map;
    	var latLng = Geolocation.latLng();
      Session.set('my_lat', latLng.lat);
      Session.set('my_lng', latLng.lng);
      var image = {
        url: "images/bluepin.png",
        scaledSize: new google.maps.Size(35,35),
        origin: new google.maps.Point(0,0)
      };
    	var marker = new google.maps.Marker({
		   	position: new google.maps.LatLng(latLng.lat, latLng.lng),
		   	animation: google.maps.Animation.DROP,
		   	map: map.instance,
        icon: image,
        zIndex: 1000
		  });

    $(".yourMood").on('click', function(event){
      $("#yourMarker").modal("show");
    });


      	google.maps.event.addListener(map.instance, 'click', function(event) {
      		showListModal(event);
      	});

        map.instance.setOptions({ minZoom: 4, maxZoom: 15 });

      	var markers = {};

      	Attractions.find().observe({
        	added: function (document) {
            var randomNum = Math.floor((Math.random() * 3) + 1);
            var mood;
            var image;
            if (randomNum == 1) {
              mood = "fun";
              image = "http://www.google.com/mapfiles/ms/micons/ylw-pushpin.png"
            } else if (randomNum == 2) {
              mood = "romantic";
              image = "http://www.google.com/mapfiles/ms/micons/pink-pushpin.png"
            } else if (randomNum == 3){
              mood = "adventure";
              image = "http://www.google.com/mapfiles/ms/micons/blue-pushpin.png"
            }
        		var lat = document.latitude;
        		var lng = document.longitude;

        		var image = {
  				    url: 'images/'+mood+'.png',
  				    scaledSize: new google.maps.Size(45, 45),
  				    origin: new google.maps.Point(0, 0),
				    };


          		var marker = new google.maps.Marker({
            		//draggable: true,
            		//animation: google.maps.Animation.DROP,
            		position: new google.maps.LatLng(lat,lng),
            		map: map.instance,
            		icon: image,
            		opacity: 0.3,
            		id: document._id
          		});

	          	//click event marker
	         //  	marker.addListener('click', function(event) {
					     //   Session.set('markerId', marker.id);
					     //   $("#eventMarker").modal("show");
				      // });

            marker.addListener('click', function(event) {
               showListModal(event);
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
        		center: new google.maps.LatLng(39.97712, -97.910156),
	          zoom: 4,
            disableDefaultUI: true
	        };
	    }
    }
});

showListModal = function(event){
  console.log(event);
    var lat =  event.latLng.lat();
    var lng =  event.latLng.lng();
    Session.set("lat", lat);
    Session.set("lng", lng);
    $("#listModal").modal("show");
}