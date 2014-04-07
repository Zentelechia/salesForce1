Template.say.searchMode=function(){
	return Session.get("searchMode");
}
Template.say.events({
	'keydown #say': function(e) {
		if(e.which == 9){
			$('#todo').show();
		}
	},
	'keydown #todo': function(e) {
		if(e.which == 9){
			$('#todo').clone();
			$('#todo').show();	
		}
	},
	'keyup #say': function(e) {
		say=$(e.currentTarget).val();
						say=say.substr(0,say.length-2); //remove 2 enters
						if(e.which == 13){
							if (Session.equals("enter",1)){
								if (Router.current().route.name=="clients")				{
									Meteor.call('addClient',say);
									$("#say").val("");
								}
								else{
									Meteor.call("addPhrase",say, Session.get("client_id"));
									$("#say").val("");
				/*					
									function(er,id){
										$("#say").val("");
										r=/#(.+?)#/g;
										if (say.replace("\n\n","").match(r)){
											say.replace("\n\n","").match(r).forEach(function(e){
												Meteor.apply("applyTag",[id,e.replace(/#/g,"")]);
												if (Tags.find({name: e.replace(/#/g,"")}).count()==0){
													Meteor.call("addTag", e.replace(/#/g,""));
												}
											});
										}
									});
*/					
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
	Session.set("query",$("#say").val()||null);
}else{
	Session.set("enter",0);
	Session.set("space",0);
}
}
});