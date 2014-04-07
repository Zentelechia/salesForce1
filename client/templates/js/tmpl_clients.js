Template.clients.rendered=function(){
		$("#clients").autocomplete({source : Clients.find().fetch()});
	};


Template.clients.client=function(){
		return  getClients(Session.get("query"));
};