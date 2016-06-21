$('#test-img').click(function(){
    alert('ok');
});

var bus = BUS('5768a5a655d92bad7d0ea6e3', '33bf8926fea4a2a73221822f519ab2412088220d');
var items = bus.Collection('example-items');

var nav_li = "<div class=\"nav-li\" data-id=\"$_ID\">$ITEMNAME<i class=\"icon24 delete-item\"></i></div>";

//init page
$('.add-item-info').show();
//get items
var get_items = function(){
    items.create_query().exec().then(function(objs){
        var html = objs.map(function(obj){
            return nav_li.replace(/\$_ID/, obj.get('_id')).replace(/\$ITEMNAME/, obj.get('name'));
        }).join("");
        $('.nav-content').html(html);
    });
}
get_items();

//delete item
$('.holy-grail-nav').delegate('.delete-item', 'click', function(){
    var obj_id = $(this).closest('.nav-li').data('id');
    items.create_query().destroy_by_id(obj_id).then(function(){
        $('.holy-grail-nav')
        get_items();
    });
});

//get one item
$('.holy-grail-nav').delegate('.nav-li', 'click', function(){
    var obj_id = $(this).data('id');
    items.create_query().find_by_id(obj_id).then(function(obj){
        $('.add-item-info').hide();
        $('.update-item-info').show();
        $('.update-item-info .item-name').val(obj.get('name'));
        $('.update-item-info .item-des').val(obj.get('des'));
        $('.update-item-info').data('id', obj_id);
    });
});

//add item button
$('.create-item').click(function(){
    $('.update-item-info').hide();
    $('.add-item-info').show();
    $('.item-name').val('');
    $('.item-des').val('');
    $('.item-info').data('id',null);
});


//confirm
$('.add-item-info .confirm-button').click(function(){
    var item_name = $('.add-item-info .item-name').val();
    var item_des = $('.add-item-info .item-des').val();
    var new_obj = items.create_obj({
        name: item_name,
        des: item_des,
    });
    new_obj.save().then(function(){
        get_items();
        alert('add ok');
    });
});


//update
$('.update-item-info .confirm-button').click(function(){
    var item_name = $('.update-item-info .item-name').val();
    var item_des = $('.update-item-info .item-des').val();
    var item_id = $('.update-item-info').data('id');
    var obj = items.create_obj({
        name: item_name,
        des: item_des,
        _id: item_id
    });
    obj.save().then(function(){
        get_items();
        alert('update ok')
    });
});

