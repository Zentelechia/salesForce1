
	Template.contacts.contact=function(){
		return getContacts(Session.get("query"));
	};
	Template.contacts.fields=contactTemplate.fields;
	Template.contacts.events({
		'focusout td' : function(e){
			self=$(e.target);
			data={};
			data.id=self.parent().attr('id');
			data.field=contactTemplate.fields[self.index()-1].sys;
			data.value=self.html()
			Meteor.call("updateContact", data);
			return false;
		}
	});
