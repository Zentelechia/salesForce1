
Router.configure({
	layoutTemplate: 'layout'
});
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
			before : function(){

				this.subscribe('clientCard', this.params.id).wait();
				console.log(this.params.id);
				init();
				Session.set("clientID",this.params.id);
				client=Clients.findOne().wait();
				Session.set("where",client.workName);
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
	});
});