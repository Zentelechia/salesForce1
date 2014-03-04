var fs = Npm.require('fs');
Phrases=new Meteor.Collection("phrases");
Clients=new Meteor.Collection("clients");
Tags=new Meteor.Collection("tags");
Contacts=new Meteor.Collection("contacts");

Meteor.methods({
   'file-upload': function (fileInfo, fileData) {
      console.log("received file " + fileInfo.name + " data: " + fileData);
      fs.writeFile("uploads\\"+fileInfo.name, fileData);
   },
    applyTag: function(phraseId, tagName){
        return Phrases.update({_id: phraseId}, 
            { $addToSet: {
                tags: tagName
                    }
            });
    },
    removeTag: function(phraseId, tagName){
        return Phrases.update({_id: phraseId}, 
            { $unset: {
                tags: tagName
                    }
            });
    },
    removeTagByName: function(tagName){
    	Tags.remove({name : tagName });
    },
    clearPhrases: function(){
    	$(Phrases.find().fetch()).each(function(e,i){Phrases.remove({_id:this._id})});
    }
});