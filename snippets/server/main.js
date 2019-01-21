import { Meteor } from 'meteor/meteor';

var Snippets;

Meteor.startup(() => {
  // code to run on server at startup
  Snippets = new Mongo.Collection('snippets');
  return Snippets;
});

Meteor.publish("snippets", function(){
  return Snippets.find({owner: this.userId});
});

Meteor.publish("snippets-admin", function(){
  return Snippets.find({});
});

Snippets.allow({
  insert: function(userId, fields) {
    return(userId);
  },
  update: function(userId, fiel) {
    return(userId);
  }
})