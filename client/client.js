var say;

Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");
Router.configure({
  layoutTemplate: 'layout'
});
Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    template: 'home'
  });

  /**
   * The route's name is "posts"
   * The route's path is "/posts"
   * The route's template is inferred to be "posts"
   */
  this.route('posts', {
    path: '/posts'
  });

  this.route('post', {
    path: '/posts/:_id',

    load: function () {
      // called on first load
    },

    // before hooks are run before your action
    before: [
      function () {
        this.subscribe('post', this.params._id).wait();
        this.subscribe('posts'); // don't wait
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    action: function () {
      var params = this.params; // including query params
      var hash = this.hash;
      var isFirstRun = this.isFirstRun;

      this.render(); // render all
      this.render('specificTemplate', {to: 'namedYield'});
    },

    unload: function () {
      // before a new route is run
    }
  });
});

Meteor.startup(function () {
	Session.set("tags","");
	Session.set("daySplitter","");
	$("#say").keyup(function(e) {
		say=$("#say").val();
		if(e.which == 13) {
			if (Session.equals("enter",1)){
				dt=jsParseDate(say);
				Phrases.insert({name: say.replace("\n\n",""), added: Date.now(), date: dt.date.toLocaleString(), tags : []},function(er,id){
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
			Session.set("query",$("#say").val());
		}
		else {
			Session.set("enter",0);
			Session.set("space",0);
		}
	});
});
