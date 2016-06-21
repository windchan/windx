$('#test-img').click(function(){
    alert('ok');
});

var bus = BUS('5768a5a655d92bad7d0ea6e3', '33bf8926fea4a2a73221822f519ab2412088220d');

var collection = bus.Collection('sports');
var obj = collection.create_obj({'monday': 'soccer'});
obj.set('tuesday', 'badminton');
obj.save().then(function(result) {
	console.log(obj.get('_id'));
}, function(err) {console.log(err);});