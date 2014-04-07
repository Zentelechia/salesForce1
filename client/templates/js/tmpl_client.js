
	Template.clientContacts.fields=contactTemplate.fields;
	Template.clientContacts.contact=function(){
		return Contacts.find({client_id : Session.get("client_id")});
	};
	Template.clientContacts.client=function(){
		return Clients.find(Session.get("client_id"));
	};
	
	Template.clientContacts.events({
		'focusout td' : function(e){
			self=$(e.target);
			data={};
			data.id=self.parent().attr('id');
			data.field=contactTemplate.fields[self.index()].sys;
			data.value=self.html()
			Meteor.call("updateContact", data);
			return false;
		}
	});

	
	
	

	Template.clientGeneralInfo.events({
		'click .clients div' : function() {
			cid=$(event.currentTarget)[0].id;
			a=Session.get("history")||[];
			if (a.length=3) {a.shift();}
			a.push(Clients.findOne({_id: cid}).workName);
			Session.set("history",a);

			Router.go('client',{id : cid});

		}
	});


	Template.clientGeneralInfo.client=function(){
		return Clients.find(Session.get("client_id"));
	}
	Template.clientGeneralInfo.fields=clientTemplate.fields;
	Template.clientGeneralInfo.events({
		'focusout span' : function(e){

			self=$(e.target);
			data={};
			data.id=Session.get("client_id");
			data.field=self.attr('sys');
			data.value=self.html()
			console.log(data);
			Meteor.call("updateClient", data);
			return false;
		}
	});