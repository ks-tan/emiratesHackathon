Template.layout.onRendered(function(){
	$("#openMenu").on('click', function(event){
      $('.ui.sidebar').sidebar('toggle');
    });
})

Template.layout.events({
	'click #sidebarButton': function() {
		$('.ui.sidebar').sidebar('toggle');
	}
})