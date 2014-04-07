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
		return getHistory(Session.get("client_id"), Session.get("tags"), Session.get("query"));
	};



	Template.phrases.events({
		'click #phrases div': function(event){
			id=$(event.currentTarget)[0].id;
			$("#say").val(Phrases.findOne({_id : id}).name);
		},
		'click .tag': function(){
			tags=Session.get("tags")||[];
			tags.push($(event.currentTarget).text());
			Session.set("tags",tags.unique());
		}
	});