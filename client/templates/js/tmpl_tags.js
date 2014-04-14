Template.tags.tags=function(){
	return Tags.find({},{sort: {stage : 1}});
};
Template.tags.events({
	'click span': function(event){
		tagClicked(event.currentTarget);
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
