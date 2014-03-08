var previous;
var q={};

function getHistory(client_id,tags,query){
	q={};
	if (client_id){
		q.clientID=client_id;
	}
	if (tags){
		q.tags={$all : tags};
	}
	if (query&&query.length){
		q.name={$regex : query, $options: 'i'};
	}
	Session.set("q",q);
	console.log(q);
	console.log("-------------------------------------");
	return Phrases.find(q);
}
function getClients(query){
	q={};
	if (query){
		q.workName={$regex : query, $options: 'i'};
	}
	return Clients.find(q,{sort: {workName: 1}});
}
function actionsCount(date){
	return 5;
	//Phrases.find(/*Session.get("q")||{}*/).count()
}
Template.tags.tags=function(){
	return Tags.find();
};
Template.contacts.contact=function(){
	return Contacts.find({client_id : Session.get("clientID")});
};
Template.tags.events({
	'click span': function(event){
		$(event.currentTarget).toggleClass("tagged");
		tags=Session.get("tags")||[]; 
		if ($(event.currentTarget).is(".tagged")){
			tags.push($(event.currentTarget).text());
			console.log("pushed");
		}
		else{
			tags.remove($(event.currentTarget).text());
			console.log("removed");
		}
		Session.set("tags",tags.length?tags:null);
		console.log(Session.get("tags"));
	}, 
	'selectstart span': function(event){
		return false;
	},

	'focusout #addTag' : function(){
		if ($("#addTag").text().replace(/(\.\s)/g,"")){
			Tags.insert({name: $("#addTag").text()});
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
		helper: "clone"
	});

};
Template.phrases.phrase=function(){
	console.log(Session.get("clientID"));
	console.log(Session.get("tags"));
	console.log(Session.get("query"));
	return getHistory(Session.get("clientID"), Session.get("tags"), Session.get("query"));
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

Template.clients.events({
	'click .clients div' : function() {
		cid=$(event.currentTarget)[0].id;
		Router.go('client',{id : cid});

	}
});

Template.client.client=function(){
	c=Contacts.find({client_id : Session.get("clientID"), required: 1}).count();
	if (c==0){
		$(requiredContactPositions).each(function(i,e){
			cc=contactTemplate;
			cc.required=1;
			cc.position=e;
			cc.client_id=Session.get("clientID");
			Contacts.insert(cc);
			cc={};
		});
		return Clients.findOne({_id : Session.get("clientID")});
	}
}


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
		'keyup #say': function(e) {
			say=$(e.currentTarget).val();
			if(e.which == 13) {
				if (Session.equals("enter",1)){
					dt=jsParseDate(say);
					Phrases.insert({name: say.replace("\n\n",""), added: Date.now(), date: dt.date.toLocaleString(), tags : [], clientID: Session.get("clientID")},function(er,id){
						$("#say").val("");
						r=/#(.+?)#/g;
						if (say.replace("\n\n","").match(r)){
							say.replace("\n\n","").match(r).forEach(function(e){
								Meteor.apply("applyTag",[id,e.replace(/#/g,"")]);
								if (Tags.find({name: e.replace(/#/g,"")}).count()==0){
									Tags.insert({name: e.replace(/#/g,"")});
								}
							});
						}

						Session.set("enter",0);
					});

				}
				else{
					Session.set("enter",1);
				}	
			}
			else if (e.which == 32){
				if (Session.equals("space",1)){
					alert ("dd");
				}
				else{
					Session.set("space",1);
				}	
			}
			else if (Session.get("searchMode")){
				Session.set("query",$("#say").val()||null);
				console.log(Session.get("query"));
			}
			else {
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
			$(this).attr("src","bin.png");
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
		cells.push(cell);
		cell=[];
	}
//	console.log(cells);
return cells;
};

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