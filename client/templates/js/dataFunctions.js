var previous;
var q={};
actionsCount=function (date){
	return 5;
	//Phrases.find(/*Session.get("q")||{}*/).count()
}

getHistory=function(client_id,contact_id,task_id,tags,query){
	q={};
	if (client_id){
		q.client_id=client_id;
	};
	if (contact_id){
		q.contact_id=contact_id;
	};
	if (task_id){
		q.task_id=task_id;
	};
	if (tags){
		q.tags={$all : tags};
	}
	if (query&&query.length){
		q.name={$regex : query, $options: 'i'};
	}
	Session.set("q",q);
	return Phrases.find(q,{sort: {added : -1}});
}
getClients=function (query){
	q={};
	if (query){
		q.workName={$regex : query, $options: 'i'};
	}
	return Clients.find(q,{sort: {workName: 1}});
}
getClient=function(){
	return Clients.findOne(Session.get("client_id"));
}
getContacts=function(query){
	q={};
	q.fio={$ne : ""};
	if (query){
		q["$or"]=[{fio :{$regex : query, $options: 'i'}}, {comments: {$regex : query, $options: 'i'}}];
	}
	return Contacts.find(q);
}