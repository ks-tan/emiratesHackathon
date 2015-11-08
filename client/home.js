Meteor.startup(function() {
    GoogleMaps.load();
});

Template.home.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
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

      var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(45.97712, -97.910156),
        animation: google.maps.Animation.DROP,
        map: map.instance,
        zIndex: 1000
      });

      var infowindow1 = new google.maps.InfoWindow({
        content: 
          "<h1>Dakota</h1>" + 
          "<p><i class='send icon'></i>Adventure: 60%</p>" +
          "<p><i class='child icon'></i>Fun: 30%</p>" + 
          "<p><i class='heart icon'></i>Romantic: 10%</p>"
           
      });
      infowindow1.open(map,marker1);

      var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(30, -96),
        animation: google.maps.Animation.DROP,
        map: map.instance,
        zIndex: 1000
      });

      var infowindow2 = new google.maps.InfoWindow({
        content: 
          "<h1>Texas</h1>" + 
          "<p><i class='send icon'></i>Adventure: 70%</p>" +
          "<p><i class='child icon'></i>Fun: 20%</p>" + 
          "<p><i class='heart icon'></i>Romantic: 10%</p>"  
      });
      infowindow2.open(map,marker2);

      var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(39.97712, -75.910156),
        animation: google.maps.Animation.DROP,
        map: map.instance,
        zIndex: 1000
      });

      var infowindow3 = new google.maps.InfoWindow({
        content: 
          "<h1>New York</h1>" + 
          "<p><i class='child icon'></i>Fun: 50%</p>" + 
          "<p><i class='heart icon'></i>Romantic: 40%</p>" +
          "<p><i class='send icon'></i>Adventure: 10%</p>"  
      });
      infowindow3.open(map,marker3);

      var marker4 = new google.maps.Marker({
        position: new google.maps.LatLng(39.97712, -120.910156),
        animation: google.maps.Animation.DROP,
        map: map.instance,
        zIndex: 1000
      });

      var infowindow4 = new google.maps.InfoWindow({
        content: 
          "<h1>San Francisco</h1>" + 
          "<p id='adventureValue'><i class='send icon'></i>Adventure: 40%</p>" +
          "<p id='romanceValue'><i class='heart icon'></i>Romantic: 40%</p>" +
          "<p><i class='child icon'></i>Fun: 20%</p>"
           
      });
      infowindow4.open(map,marker4);

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
  				    scaledSize: new google.maps.Size(40, 40),
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
        		center: new google.maps.LatLng(39.97712, -97.910156),
	          zoom: 4,
            disableDefaultUI: true
	        };
	    }
    }
});

function showListModal(event){
	var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    Session.set("lat", lat);
    Session.set("lng", lng);
    $("#listModal").modal("show");
}