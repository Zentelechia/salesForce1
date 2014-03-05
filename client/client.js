var say;

Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");
init = function(){
	Session.set("tags",[]);
	Session.set("daySplitter","");
	Session.set("clientID","");
	Session.set("searchMode","");
	Session.set("query","");
}
Meteor.startup(function () {
	init();
});
