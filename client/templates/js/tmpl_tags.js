Template.tags.tags=function(){
	return Tags.find({},{sort: {stage : 1}});
};
Template.tags.events({
	'click span': function(event){
		$(event.currentTarget).toggleClass("tagged");
		tags=Session.get("tags")||[]; 
		if ($(event.currentTarget).is(".tagged")){
			tags.push($(event.currentTarget).text());
			//console.log("pushed");
		}else{
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
