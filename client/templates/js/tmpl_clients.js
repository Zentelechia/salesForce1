Template.clients.rendered=function(){
		$("#clients").autocomplete({source : Clients.find().fetch()});
	};


Template.clients.client=function(){
		return  getClients(Session.get("query"));
};
Template.clients.events({
		'click .clients div' : function(event) {
				cid=$(event.currentTarget)[0].id;
			if (event.ctrlKey){
				Clients.update(cid, {$set : {hidden : true}});
			}
			else {
				
				path=Router.path("client",{id: cid});
				link=Clients.findOne({_id: cid}).workName;
				pushHistory(path,link);
				Router.go('client', {id : cid});
			}

		}
	});
