//cloud code
var test = require('./test');
BUS.Cloud.define('test', function(request, response){
    /*request.is_kuser_login().then(
        function(user_data){response.success(user_data._id);},
        function(err){response.error(err);});*/
});

BUS.Cloud.define('test1', function(request, response){
    var obj = BUS.Collection('test').create_obj({test:1});
    obj.save().then(function(){
        response.success(obj);
    },function(err){
        response.error(err);
    });
});


BUS.Cloud.before_query('test1', function(request, response){
    response.pass();
});


//BUS.Cloud.define_task('test-crontab', '0 2 * * *', 'test1');

//BUS.Cloud.define_task('test-url', '* * * * *', 'http://10.10.126.140:3000/1.0/apps/55c2e24c7abb07581c09d927/env/dev/funcs/test');
