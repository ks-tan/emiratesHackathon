Template.layout.onRendered(function(){
	$("#openMenu").on('click', function(event){
      $('.ui.sidebar').sidebar('toggle');
    });
})

Template.layout.events({
	'click #smap': function() {
		$('.ui.sidebar').sidebar('toggle');
	},
	'click #smap': function() {
		$("#smapModal").modal("show");
	}
})