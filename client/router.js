
Router.configure({
	layoutTemplate: 'layout'
});
Router.map(function ()  	{

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

		data: function(){
			return {where: "Все фразы"}
		},
		 yieldTemplates: {
    	  'client': {to: 'sayBefore'},
    	  'tags' : {to: 'tags'}
	    },
		before : function(){
			init();
			Session.set("clientID",this.params.id);
			Session.set("where","Карточка клиента");
			
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

