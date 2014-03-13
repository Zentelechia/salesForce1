Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");

requiredContactPositions=["учредитель","гендир","секретарь","механик","диспетчер","бухгалтер"]; 
contactTemplate = {position: "", fio:"",address:"", phones:"", email:"", comments:"", zone: "", birthday: ""};
init = function(){
	Session.set("tagрыs",null);
	Session.set("previous",null);
	Session.set("clientID",null);
	Session.set("searchMode",null);
	Session.set("query",null);
	Session.set("enter",null);
}

Meteor.startup(function () {
	init();
	moment.lang("ru");
	$(document).on("keypress",function(event){
		console.log(event);
		if(!$(event.target).is("#say")){
			alert("s");
	}
	});
});

