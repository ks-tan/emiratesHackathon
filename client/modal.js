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

(function() {
        var co=document.createElement("script");
        co.type="text/javascript";
        co.async=true;
        co.src="https://xola.com/checkout.js";
        var s=document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(co, s);
    })();