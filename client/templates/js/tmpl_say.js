	Template.searchBox.events({
		'keydown #search': function(e) {
			if(e.which == 9){
				$('#todo').show();
			}
		},
		'keydown #todo': function(e) {
			if(e.which == 9){
		//		$('#todo').after($('#todo').clone());	

			}
		},
		'keyup #search': function(e) {
			say=$(e.currentTarget).val();
		say=say.substr(0,say.length-2); //remove 2 enters
		if(e.which == 13){
			if (Session.equals("enter",1)){
				if (Router.current().route.name=="clients")				{
					Meteor.call('addClient',say);
					$("#search").val("");
				}
				else{
					Meteor.call("addPhrase",say, Session.get("client_id"));
					$("#search").val("");
				}
				Session.set("enter",0);
			}else{
				Session.set("enter",1);
			}	
		}else if (e.which == 32){
			if (Session.equals("space",1)){
			}else{
				Session.set("space",1);
			}	
		}else if (Session.get("searchMode")){
			Session.set("query",$("#search").val()||null);
		}else{
			Session.set("enter",0);
			Session.set("space",0);
		}
	}
});
