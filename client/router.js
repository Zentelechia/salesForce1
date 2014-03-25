Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){
		return [this.subscribe("clients"), this.subscribe("phrases"),this.subscribe("contacts")];

	}
});
init = function(){
	Session.set("tags",null);
	Session.set("previous",null);
	Session.set("clientID",null);
	Session.set("searchMode",null);
	Session.set("query",null);
	Session.set("enter",null);
}

Meteor.startup(function(){
	Router.map(function (){
		this.route('home', {
			path: '/',
			template: 'phrases',
			yieldTemplates: {
				'tags' : {to: 'tags'}
			},
			before : function(){
				init();
				Session.set("where","Все записи");
			}
		});
		this.route('client', {
			path: '/client/:id/:date?',
			template: 'phrases',
			yieldTemplates: {
				'client': {to: 'sayBefore'},
				'tags' : {to: 'tags'}
			},
			before: function(){
				init();
				Session.set("clientID",this.params.id);
				client=Clients.findOne(this.params.id);
				Session.set("where","Клиент: "+client.workName);
				
			}
		});
		this.route('clients', {
			path: '/clients',
			template: 'clients',
			before : function(){
				init();
				Session.set("where","Список клиентов");
			}
		}),
		this.route('contacts', {
			path: '/contacts',
			template: 'contacts',
			before : function(){
				init();
				Session.set("where","Список контактов");
			}
		}),
		this.route('contact', {
			path: '/contact/:id',
			template: 'contact',
			before : function(){
				init();
				contact=Contacts.findOne(this.params.id)
				Session.set("where","Контактное лицо: "+contact.fio);
				Session.set("contactID",this.params.id);
			}
		});
	});
});