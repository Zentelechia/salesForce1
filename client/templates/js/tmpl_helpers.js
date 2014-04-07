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

		Session.get("searchMode")?"'search'":""
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