//var fs = Npm.require('fs');
Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");
Tasks=new Meteor.Collection("tasks");
Reminders=new Meteor.Collection("reminders");
Files=new Meteor.Collection("files");
Roles=new Meteor.Collection("roles");
Cases=new Meteor.Collection("cases");
Knowledges=new Meteor.Collection("knowledges");
Objections=new Meteor.Collection("objections");

Meteor.publish("clients",function(){
	if (this.userId){
		return Clients.find({owner: this.userId});
	} else {   
		this.ready();
	}
});
Meteor.publish("tags",function(){
	if (this.userId){
		return Tags.find({$or: [{owner : this.userId}, {owner : null}]});
	} else {   
		this.ready();
	}
	
});

Meteor.publish("phrases",function(){
	if (this.userId){
		return Phrases.find({owner: this.userId});
	} else {   
		this.ready();
	}
});
	
Meteor.publish("contacts",function(){
	if (this.userId){
		return Contacts.find({owner : this.userId});
	} else {   
		this.ready();
	}
});
Meteor.publish("tasks",function(q){
	if (this.userId){
		return Tasks.find({owner : this.userId});
	} else {   
		this.ready();
	}
});
