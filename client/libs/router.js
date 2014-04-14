Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	before:     function () {
       Session.set("date",this.params.hash);
      }
});
init = function(){
	Session.set("date",null);
	Session.set("tags",null);
	Session.set("previous",null);
	Session.set("client_id",null);
	Session.set("searchMode",null);
	Session.set("query",null);
	Session.set("enter",null);
	Session.set("bin",null);
}
Meteor.startup(function(){
	Router.map(function (){
		this.route('home', {
			path: '/',
			template: 'phrases',
			before : function(){
				init();
				Session.set("where","Все записи");
			}
		});
		this.route('client', {
			path: '/client/:id',
			template: 'phrases',
			yieldTemplates: {
				'client': {to: 'objectDetailes'}
			},
			before: function(){
				init();
				Session.set("client_id",this.params.id);
				Session.set("where","Клиент:");
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
			path: 'tasks',
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
		this.route('bin', {
			path: '/bin',
			template: 'phrases',
			before : function(){
				Session.set("bin",true);
			}
			
		});
		this.route('taks', {
			path: '/tasks',
			template: 'tasks',
			before : function(){
			}
			
		});

	});
});