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
	moment.lang("ru");
});

