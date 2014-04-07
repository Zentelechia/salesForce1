Template.tools.events({

	'click clientsIcon': function(){
		Router.go('clients');
	},
	'click img': function(){
		$("#say").val($(event.currentTarget).attr("text"));
		$("#say").selectRange($(event.currentTarget).attr("selectStart"),$(event.currentTarget).attr("selectEnd"));
	},
	'click #clear' : function(){
		Session.set("tags",null);
		Session.set("searchMode","");

	},
	'click #search': function(){
		Session.set("searchMode","true");
	}
});
Template.tools.rendered=function(){
	$("#bin").droppable({
		over: function( event, ui ) {
			$(this).attr("src","../binOpened.png");
		},
		drop: function (event,ui){
			if (ui.draggable.parent().is("#tags")){
				Meteor.call("removeTagByName",ui.draggable.text())
			};
		},
		deactivate: function( event, ui ) {
			$(this).attr("src","../bin.png");
		}
	});

};