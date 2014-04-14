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
		cell.plan=Math.round(Tasks.find({duedate : cell.date, owner : Meteor.userId()}).count()/10*100); //Math.round((Math.random()*10+5)/15*100);
		cell.fact=Math.round(Tasks.find({done: true, duedate : cell.date, owner : Meteor.userId()}).count()/10*100);
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
	'click .cell' : function(event){
		window.location.hash=$(event.currentTarget).attr('data');
	},
	'dblclick .cell' : function(event){
		Router.go("tasks#"+$(event.currentTarget).attr('data'));
	}
});

