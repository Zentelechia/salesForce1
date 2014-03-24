var fs = Npm.require('fs');
Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");

Meteor.publish("clients",function(){
	if (this.userId) {
		return Clients.find({owner: this.userId});
	} else {   
		this.ready();
	}
});
Meteor.publish("tags",function(){

	if (this.userId) {
		return Tags.find({$or: [{owner : this.userId}, {owner : null}]});
	} else {   
		this.ready();
	}
	
});

Meteor.publish("phrases",function(){
	if (this.userId) {
		return Phrases.find({owner: this.userId});
	} else {   
		this.ready();
	}


});

Meteor.publish("contacts",function(){
	if (this.userId) {
		return Contacts.find();
	} else {   
		this.ready();
	}
});



Meteor.methods({
	'file-upload': function (fileInfo, fileData) {
		console.log("received file " + fileInfo.name + " data: " + fileData);
		fs.writeFile("uploads\\"+fileInfo.name, fileData);
	},
	applyTag: function(phraseId, tagName){
		return Phrases.update({_id: phraseId}, 
			{ $addToSet: {
				tags: tagName
			}
		});
	},
	removeTag: function(phraseId, tagName){
		return Phrases.update({_id: phraseId}, 
			{ $unset: {
				tags: tagName
			}
		});
	},
	addTag : function(tag){
		Tags.insert({name: tag, owner: this.userId});
	},
	removeTagByName: function(tagName){
		Tags.remove({name : tagName });
	},
	init: function(){
		Phrases.remove({});
		Clients.remove({});
		Tags.remove({});
		Contacts.remove({});
	},
	addClient:function(workName){
		c_id=Clients.insert({workName: workName, owner: this.userId});
		clientTemplate.requiredPositions.forEach(function(p,i){
			contact={};
			contactTemplate.fields.forEach(function(e){
				contact[e.sys]="";
			});
			contact.required=1;
			contact.position=p;
			contact.client_id=c_id;
			contact.owner=this.userId;
			Contacts.insert(contact); 
		});
	},
	updateContact:function(id,field,value){
		o={};
		o[field]=value;
		Contacts.update({_id: id},{$set : o})
		//Contacts.update({_id:obj.id},{obj.field : obj.value });
	}
});