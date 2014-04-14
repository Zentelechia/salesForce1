Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");
Tasks=new Meteor.Collection("tasks");
Deps.autorun(function () {
	Meteor.subscribe("phrases");
	Meteor.subscribe("clients");
	Meteor.subscribe("tags");
	Meteor.subscribe("contacts");
	Meteor.subscribe("tasks");
});

Meteor.startup(function () {

	init();
	$(document).on('keyup',function(e){
		//если нажали ESC - сбрасываем фильтры
		if(e.which == 27){
			Session.set("tags",null);
			Session.set("searchMode",null);
			Session.set("query","");
			$("#say").val("");
		}
	})
	$(document).on('keypress',function(e){
			
		if ($(e.target).is('body')){
			q=Session.get("query")||"";
			var unicode=e.charCode? e.charCode : e.keyCode;
			var actualkey=String.fromCharCode(unicode);
			Session.set("query",q+actualkey);
			if (Router.current().template!="global"){
				Router.go('global');
			}
		}
	});
	moment.lang("ru");
});

