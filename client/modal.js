Template.eventModal.helpers({
    markerInfo: function() {
    	var markerId = Session.get('markerId');
    	return Attractions.findOne(markerId);
    },
    isXola: function(source){
    	console.log(source);
    	return source === "Xola";
    }
});

Template.listModal.helpers({
    eventList: function() {
        var lat = Session.get("lat");
        var lng = Session.get("lng");
        return lat + ", " + lng;
    }
});

(function() {
        var co=document.createElement("script");
        co.type="text/javascript";
        co.async=true;
        co.src="https://xola.com/checkout.js";
        var s=document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(co, s);
    })();