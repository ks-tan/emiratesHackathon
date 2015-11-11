Template.checkout.onRendered(
	function() {
		$(".checkoutButton").css('visibility', 'hidden');
		setTimeout(func, 1000);
	},
	
);

func = function() {
	$( ".checkoutButton" ).trigger( "click" );
}


Template.checkout.helpers({
	attractionId: function() {
		return Session.get("attractionId");
	}
});