
	Template.phrases.rendered=function(){
		$("#phrases div").droppable({
			drop: function( event, ui ) {
				if (ui.draggable.parent().is("#tags")){
					Meteor.apply("applyTag",[$(this).attr("id"),$(ui.draggable).text()]);
				}
			}
		});
		$("#phrases div").draggable({
			helper: function() {return $("#target").clone()},
			revert: true,
			cursorAt:  { left: 16, bottom: 16 }
		});

	};
	Template.phrases.phrase=function(){
		return getHistory(Session.get("client_id"),Session.get("contact_id"),Session.get("task_id"), Session.get("tags"), Session.get("query"));
	};
	
	Template.phrases.events({
		'click #phrases div': function(event){
			if (event.shiftKey){
				Meteor.call("toBin",$(event.currentTarget).attr('id'));
			}
		}
	});