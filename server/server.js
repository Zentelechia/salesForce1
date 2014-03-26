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

Meteor.publish("contacts",function(q){
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
		Tags.remove({name : tagName }); //, owner : this.userId
	},
	init: function(){
		Phrases.remove({});
		Clients.remove({});
		Tags.remove({});
		Contacts.remove({});
		_.each(clientTemplate.projectStages, function(e,i){
			Tags.insert({name:e.name, stage: e.stage,color: e.color});
		})
	},
	addClient: function(workName){
		client={};
		client.workName=workName;
		client.owner=this.userId;
		clientTemplate.fields.forEach(function(e){
				if (e.default){
					client[e.sys]=e.default;
				}
			});
		c_id=Clients.insert(client);
		clientTemplate.requiredPositions.forEach(function(p,i){
			contact={};
			contactTemplate.fields.forEach(function(e){
				contact[e.sys]="";
			});
			contact.required=1;
			contact.position=p;
			contact.client_id=c_id;
			contact.client_name=workName;
			contact.owner=this.userId;
			Contacts.insert(contact); 
		});
	},
	addPhrase: function(text,client_id){
		dt=jsParseDate(text);
		phrase={};
		phrase.owner=this.userId;
		phrase.name=text;
		phrase.added=Date.now();
		phrase.addedText=moment().format('DD.mm.YY');
		phrase.date=dt.date.toLocaleString();
		phrase.tags=[];
		if (client_id!=null){
			phrase.clientID=client_id;
			phrase.client_name =Clients.findOne(client_id).workName;
		}
		Phrases.insert(phrase);
	},
	updateContact:function(data){
		o={};
		o[data.field]=data.value;
		Contacts.update(data.id,{$set : o});
		//Contacts.update({_id:obj.id},{obj.field : obj.value });
	},
	updateClient: function(data){
		o={};
		o[data.field]=data.value;
		Clients.update(data.id,{$set : o});
	}
});