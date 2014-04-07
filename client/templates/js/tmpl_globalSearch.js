Template.global.client=function(q){
	q=Session.get("query");
	if (q){
		return Clients.find({workName : {$regex : q, $options: 'i'}},{sort: {workName: 1}});
	}
	else {
		return [];
	}
}
Template.global.contact=function(){
	q=Session.get("query");
	if (q){
		return Contacts.find({fio : {$regex : q, $options: 'i'}});
	}
	else{
		return [];
	}
}
Template.global.q=function(){
	return Session.get("query")||"";
}
Template.global.phrase=function(){
	q=Session.get("query");
	if (q){
		return Phrases.find({name : {$regex :q, $options: 'i'}});
	}
	else{
		return [];
	}
}