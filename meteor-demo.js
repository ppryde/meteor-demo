Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
        }
    });

    Template.input.events = {
      'click #sendBtn, keydown input#message' : function (event) {
        if (event.which == 13 || event.target.id==="sendBtn") { // 13 is the enter key event
          if (Meteor.user())
            var name = Meteor.user().emails[0].address;
          else
            var name = 'Anonymous';
          var message = document.getElementById('message');
          if (message.value != '') {
            Messages.insert({
              name: name,
              message: message.value,
              time: Date.now(),
            });

            document.getElementById('message').value = '';
            message.value = '';
          }
        }
      }
    }
}





























/*

Template.messages.created = function(){
        this.subscribe("Messages");
    }

if (Meteor.isServer) {
    Meteor.publish("Messages", function(){
        if (this.userId)
            return Messages.find();
        return Messages.find({name:"Anonymous"});
    });

    Messages.allow({
        insert: function(userId, message){
            return true;
        },
        remove: function(userId, message){
            return false;
        }
    });
}
*/