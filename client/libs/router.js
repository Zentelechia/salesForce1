Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'	
});
init = function(){
	Session.set("tags",null);
	Session.set("previous",null);
	Session.set("client_id",null);
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
			path: '/client/:id',
			template: 'phrases',
			yieldTemplates: {
				'client': {to: 'sayBefore'},
				'tags' : {to: 'tags'}
			},
			before: function(){
				init();
				Session.set("client_id",this.params.id);
				Session.set("where","Клиент: ");
				
			}
		});
		this.route('client', {
			path: '/client/:id',
			template: 'phrases',
			yieldTemplates: {
				'clientGeneralInfo': {to: 'sayBefore'},
				'tags' : {to: 'tags'}
			},
			before: function(){
				init();
				Session.set("client_id",this.params.id);
				Session.set("where","Клиент: ");
				
			}
		});
		this.route('clientContacts', {
			path: '/client/:id/contacts',
			template: 'phrases',
			yieldTemplates: {
				'clientContacts': {to: 'sayBefore'},
				'tags' : {to: 'tags'}
			},
			before: function(){
				init();
				Session.set("client_id",this.params.id);
				Session.set("where","Клиент: ");
				
			}
		});
		this.route('clients', {
			path: '/clients',
			template: 'clients',
			before : function(){
				init();
				Session.set("where","Список клиентов");
			}
		});
		this.route('contacts', {
			path: '/contacts',
			template: 'contacts',
			before : function(){
				init();
				Session.set("where","Список контактов");
			}
		});
		this.route('contact', {
			path: '/contact/:id',
			template: 'contact',
			before : function(){
				init();
				Session.set("where","Карточка котакта");
				Session.set("contact_id",this.params.id);
			}
		});
		this.route('tasks', {
			path: '/tasks',
			template: 'tasks',
			before : function(){
				init();
				Session.set("where","Список задач");
			}
		});
		this.route('task', {
			path: '/task/:id',
			template: 'task',
			before : function(){
				init();
				Session.set("where","Задача: ");
				Session.set("task_id",this.params.id);
			}
		});
		this.route('global', {
			path: '/global',
			template: 'global',
			before : function(){
				Session.set("where","Сквозной поиск")
			}
			
		});

	});
});