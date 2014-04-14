Template.clients.rendered=function(){
		$("#clients").autocomplete({source : Clients.find().fetch()});
	};


Template.clients.client=function(){
		return  getClients(Session.get("query"));
};
Template.clients.events({
		'click .clients div' : function() {
			cid=$(event.currentTarget)[0].id;
			path=Router.path("client",{id: cid});
			link=Clients.findOne({_id: cid}).workName;
			pushHistory(path,link);
			Router.go('client', {id : cid});

		}
	});
