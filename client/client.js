Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");

Deps.autorun(function () {
	Meteor.subscribe("phrases");
	Meteor.subscribe("clients");
	Meteor.subscribe("tags");
	Meteor.subscribe("contacts");
});

Meteor.startup(function () {
	
	init();
	$(document).on('keyup',function(e){
		if(e.which == 27){
			Session.set("tags",null);
			Session.set("searchMode",null);
			Session.set("query","");
			$("#say").val("");
		}
	})
	$(document).on('keypress',function(e){
		
		if ($(e.target).is('body')){
			console.log(e);
			q=Session.get("query")||"";
			var unicode=e.charCode? e.charCode : e.keyCode;
			var actualkey=String.fromCharCode(unicode);
			Session.set("query",q+actualkey);
			if (Router.current().template!="global"){
				Router.go('global');
			}
		}
	})
	moment.lang("ru");
});

