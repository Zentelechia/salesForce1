  Template.menu.items=function(){
    return menu;
  }
  Template.menu.events({
    'click .menuItem' : function(){
      Router.go($(event.currentTarget).attr("route"));
    },
    'change #bin' : function(){
    	Session.set("bin",$("#bin").prop("checked")?true:null);
    }
  });