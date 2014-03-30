var previous;
var q={};
function getHistory(client_id,tags,query){
	q={};
	if (client_id){
		q.client_id=client_id;
	}
	if (tags){
		q.tags={$all : tags};
	}
	if (query&&query.length){
		q.name={$regex : query, $options: 'i'};
	}
	Session.set("q",q);
	return Phrases.find(q,{sort: {added : -1}});
}
function getClients(query){
	q={};
	if (query){
		q.workName={$regex : query, $options: 'i'};
	}
	return Clients.find(q,{sort: {workName: 1}});
}
function getClient(){
	return Clients.findOne(Session.get("client_id"));
}
function getContacts(query){
	q={};
	q.fio={$ne : ""};
	if (query){
		q["$or"]=[{fio :{$regex : query, $options: 'i'}}, {comments: {$regex : query, $options: 'i'}}];
	}
	return Contacts.find(q);
}
function actionsCount(date){
	return 5;
	//Phrases.find(/*Session.get("q")||{}*/).count()
}

function searchClients(q){
	return 
}
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
	Template.tags.tags=function(){
		return Tags.find({},{sort: {stage : 1}});
	};

	Template.contacts.contact=function(){
		return getContacts(Session.get("query"));
	};
	Template.contacts.fields=contactTemplate.fields;
	Template.contacts.events({
		'focusout td' : function(e){
			self=$(e.target);
			data={};
			data.id=self.parent().attr('id');
			data.field=contactTemplate.fields[self.index()-1].sys;
			data.value=self.html()
			Meteor.call("updateContact", data);
			return false;
		}
	});

	Template.clientContacts.fields=contactTemplate.fields;
	Template.clientContacts.contact=function(){
		return Contacts.find({client_id : Session.get("client_id")});
	};
	Template.clientContacts.client=function(){
		return Clients.find(Session.get("client_id"));
	};
	Template.clientContacts.events({
		'focusout td' : function(e){
			self=$(e.target);
			data={};
			data.id=self.parent().attr('id');
			data.field=contactTemplate.fields[self.index()].sys;
			data.value=self.html()
			Meteor.call("updateContact", data);
			return false;
		}
	});
	Template.tags.events({
		'click span': function(event){
			$(event.currentTarget).toggleClass("tagged");
			tags=Session.get("tags")||[]; 
			if ($(event.currentTarget).is(".tagged")){
				tags.push($(event.currentTarget).text());
			//console.log("pushed");
		}
		else{
			tags.remove($(event.currentTarget).text());
			//console.log("removed");
		}
		Session.set("tags",tags.length?tags:null);
		//console.log(Session.get("tags"));
	}, 
	'selectstart span': function(event){
	//	return false;
},

'focusout #addTag' : function(){
	if ($("#addTag").text().replace(/(\.\s)/g,"")){
		Meteor.call("addTag",$("#addTag").text());
		$("#addTag").text("");
	}
}
});
	Template.tags.rendered=function(){
		$("#tags span").draggable({ 
			helper: "clone"
		});
	};

	Template.phrases.rendered=function(){
		$("#phrases div").droppable({
			drop: function( event, ui ) {
				if (ui.draggable.parent().is("#tags")){
					Meteor.apply("applyTag",[$(this).attr("id"),$(ui.draggable).text()]);
				}
			}
		});
		$("#phrases div").draggable({
			helper: function() {return $("#target").clone()},
			revert: true,
			cursorAt:  { left: 16, bottom: 16 }
		});

	};
	Template.phrases.phrase=function(){
		return getHistory(Session.get("client_id"), Session.get("tags"), Session.get("query"));
	};
	Template.header.where=function(){
		return Session.get("where");
	}
	Template.clients.rendered=function(){
		$("#clients").autocomplete({source : Clients.find().fetch()});
	};


	Template.clients.client=function(){
		return  getClients(Session.get("query"));
	};
	Template.history.list=function(){
		return  Session.get("history");
	};

	Template.clients.events({
		'click .clients div' : function() {
			cid=$(event.currentTarget)[0].id;
			a=Session.get("history")||[];
			if (a.length=3) {a.shift();}
			a.push(Clients.findOne({_id: cid}).workName);
			Session.set("history",a);

			Router.go('client',{id : cid});

		}
	});


	Template.client.client=function(){
		return Clients.find(Session.get("client_id"));
	}

	Template.client.fields=clientTemplate.fields;
	Template.client.events({
		'focusout span' : function(e){

			self=$(e.target);
			data={};
			data.id=Session.get("client_id");
			data.field=self.attr('sys');
			data.value=self.html()
			console.log(data);
			Meteor.call("updateClient", data);
			return false;
		}
	});
	Template.phrases.events({
		'click #phrases div': function(event){
			id=$(event.currentTarget)[0].id;
			$("#say").val(Phrases.findOne({_id : id}).name);
		},
		'click .tag': function(){
			tags=Session.get("tags")||[];
			tags.push($(event.currentTarget).text());
			Session.set("tags",tags.unique());
		}
	});

	Template.say.events({
		'keydown #say': function(e) {
			if(e.which == 9){
				$('#todo').show();
			}
		},
		'keydown #todo': function(e) {
			if(e.which == 9){
				$('#todo').clone();
				$('#todo').show();	
			}
		},
		'keyup #say': function(e) {
			say=$(e.currentTarget).val();
		say=say.substr(0,say.length-2); //remove 2 enters
		if(e.which == 13){
			if (Session.equals("enter",1)){
				if (Router.current().route.name=="clients")				{
					Meteor.call('addClient',say);
					$("#say").val("");
				}
				else{
					Meteor.call("addPhrase",say, Session.get("client_id"));
					$("#say").val("");
/*					
					function(er,id){
						$("#say").val("");
						r=/#(.+?)#/g;
						if (say.replace("\n\n","").match(r)){
							say.replace("\n\n","").match(r).forEach(function(e){
								Meteor.apply("applyTag",[id,e.replace(/#/g,"")]);
								if (Tags.find({name: e.replace(/#/g,"")}).count()==0){
									Meteor.call("addTag", e.replace(/#/g,""));
								}
							});
						}
					});
	*/					
}
Session.set("enter",0);
}else{
	Session.set("enter",1);
}	
}else if (e.which == 32){
	if (Session.equals("space",1)){
	}else{
		Session.set("space",1);
	}	
}else if (Session.get("searchMode")){
	Session.set("query",$("#say").val()||null);
}else{
	Session.set("enter",0);
	Session.set("space",0);
}
}
});
Template.fileUpload.events({
	"change .file-upload-input": function(event, template){
		var func = this;
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload = function(fileLoadEvent) {
			Meteor.call('file-upload', file, reader.result);
		};
		reader.readAsBinaryString(file);
	}
});

Template.sessions.info=function(){
	info="";	
	for (k in Session.keys) {info+=k+":"+Session.get(k)+";"}
		return info;

};

Template.tools.events({

	'click clientsIcon': function(){
		Router.go('clients');
	},
	'click img': function(){
		$("#say").val($(event.currentTarget).attr("text"));
		$("#say").selectRange($(event.currentTarget).attr("selectStart"),$(event.currentTarget).attr("selectEnd"));
	},
	'click #clear' : function(){
		Session.set("tags",null);
		Session.set("searchMode","");

	},
	'click #search': function(){
		Session.set("searchMode","true");
	}
});
Template.tools.rendered=function(){
	$("#bin").droppable({
		over: function( event, ui ) {
			$(this).attr("src","../binOpened.png");
		},
		drop: function (event,ui){
			if (ui.draggable.parent().is("#tags")){
				Meteor.call("removeTagByName",ui.draggable.text())
			};
		},
		deactivate: function( event, ui ) {
			$(this).attr("src","../bin.png");
		}
	});

};
Template.calendar.cells=function(){
	monthStart=moment().startOf('month');
	var cd=monthStart.subtract('days',monthStart.day());
	var cell={};
	var cells = [];
	for (var i = 1; i <= 42; i++) { 
		cd.add('days',1);
		cell.day=cd.date();
		cell.date=cd.format("DD.MM.YY");
		cell.month=cd.month()==moment().month()?"current":cd.month()>moment().month()?"next":"previous";
		cell.c=actionsCount();
		cell.plan=Math.round((Math.random()*10+5)/15*100);
		cell.fact=cd<moment()?Math.round((Math.random()*10)/15*100):0;
		cell.result=0.5+cell.fact/cell.plan/2;
		cells.push(cell);
		cell=[];
	}
//	console.log(cells);
return cells;
}
Template.calendar.rendered=function(){
	$(".cell").droppable({
		drop: function( event, ui ) {
			if (ui.draggable.parent().is("#phrases")){
				console.log($(this).attr('data'));
			}
		}
	});

}
Template.calendar.events({
	'click span' : function(event){
		now=Router.current();
		params=now.params;
		params.hash=$(event.currentTarget).attr('data');
		console.log(params);
		console.log(now.where);

		Router.go(now.where,params);
//		Session.set("date",)
}
});

Handlebars.registerHelper('daySplitter', function(added) {
	now=moment(added).format("dddd DD MMMM YYYY");
	if (now==previous){
		previous=now;
		return  "";
	}
	else
	{
		previous=now;
		return "<strong>"+now+"</strong><hr>";
	}
});

Handlebars.registerHelper('getKey', function(obj,key) {
	return obj[key];
});


Handlebars.registerHelper('selectTags', function(object) {
	if (object){
		return new Handlebars.SafeString(
			object.replace(/#(.+?)#/g,"<span class='inline-tag'>$1</span>")
			);
	}
	else {
		return "";
	}
});
Handlebars.registerHelper('toDate', function(object) {
	return new Handlebars.SafeString(
		Date(object).toLocaleString()
		);
});

Handlebars.registerHelper('isTagSelected', function(tagName) {
	return new Handlebars.SafeString(
		$.inArray(tagName, Session.get("tags"))>=0?"class='tagged'":""
		);
});
Handlebars.registerHelper('searchMode', function() {
	return new Handlebars.SafeString(

		Session.get("searchMode")?"class='search'":""
		);
});


Handlebars.registerHelper('getFirstObjectPropertyValue', function(obj) {
	return new Handlebars.SafeString(
		obj[Object.keys(obj)[0]]
		);
});	

Handlebars.registerHelper('clientProperty', function(client, sys){
	if (client[sys]){
		return new Handlebars.SafeString(
			client[sys]
			);
	}
	else {
		return "";
	}
});
Handlebars.registerHelper('myPathFor', function(path,e){
		return new Handlebars.SafeString(
			Router.path(path,{id: e._id})
			);
});
