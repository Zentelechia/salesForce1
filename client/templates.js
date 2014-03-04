Template.tags.tags=function(){
	return Tags.find();
};
Template.tags.events({
	'click span': function(event){
		$(event.currentTarget).toggleClass("tagged");
		tags=Session.get("tags")||[]; 
		if ($(event.currentTarget).is(".tagged")){
			tags.push($(event.currentTarget).text());
		}
		else{
			tags.remove($(event.currentTarget).text());
		}
		Session.set("tags",tags.unique());
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
	if (Session.get("tags")&&!Session.get("query")){
		return Phrases.find({tags: {$all : Session.get("tags")||[]}},{sort: {added : -1}});
	}
	else if (Session.get("query")){
		return Phrases.find({name : {$regex : Session.get("query") },tags: {$all : Session.get("tags")||[]}},{sort: {added : -1}});
	}
	else{
		return Phrases.find({},{sort: {added : -1}});
	}
};

Template.clients.rendered=function(){
	$("#clients").autocomplete({source : Clients.find().fetch()});
};
Template.phrases.events({
	'click #phrases div': function(event){
		id=$(event.currentTarget)[0].id;
		$("#say").val(Phrases.findOne({_id : id}).name);
	},
	'click .tag': function(){
		tags=Session.get("tags")||[];
		tags.push($(event.currentTarget).text());
		Session.set("tags",tags.unique());
			//Session.set("tag",event.currentTarget.innerHTML);
		}
	});

Template.clientCard.client=function(){
	return Clients.find({_id: "4t4gzdAFzwSdRpeWR"});
}
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
	'click img': function(){
		$("#say").val($(event.currentTarget).attr("text"));
		$("#say").selectRange($(event.currentTarget).attr("selectStart"),$(event.currentTarget).attr("selectEnd"));
	},
	'click #clear' : function(){
		Session.set("tags","");
		Session.set("searchMode","");

	},
	'click #search': function(){
		Session.set("searchMode","true");
	}
});
Template.tools.rendered=function(){
	$("#bin").droppable({
		over: function( event, ui ) {
			$(this).attr("src","binOpened.png");
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
 var foo = []; for (var i = 1; i <= 35; i++) { foo.push(i); }
 return foo;
};
Handlebars.registerHelper('daySplitter', function(added) {
	addedDate=Date(added).toLocaleString();
	sessionDate=Session.get("daySplitter");
	if (addedDate==sessionDate){
		d="";

	}
	else{
		Session.set("daySplitter",addedDate);
		d=addedDate;
	}
	return new Handlebars.SafeString(
		d
		);
});
Handlebars.registerHelper('selectTags', function(object) {
	return new Handlebars.SafeString(
		object.replace(/#(.+?)#/g,"<span class='inline-tag'>$1</span>")
		);
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