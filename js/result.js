/**
 * Created by sunhaoran on 2017/6/22.
 */

var searchType = "";
var searchRegion = "";
var args;

$(function(){
    var his = "";
    var h = $.cookie('history');
    h = h.substr(0, h.length-1);
    var history = h.split(",");
    for(var i=0;i<history.length;i++){
        his += '<li>' + history[i] + '  </li>';
    }
    $('.historyList').append(his);

    args = getUrlParam();
    searchType = args['searchtype'];
    if(args['region'] != null){
        searchRegion = args['region'];
    }

    $('.searchInput').val(args['query']);
    $('.searchList .searchItem').removeClass('current');
    $('#'+searchType).addClass('current');

    querysearch(args['query']);
});

$('.searchButton').click(function(){
    var history = $.cookie('history');
    history += $('.searchInput').val()+',';
    $.cookie('history', history);
    window.location = 'result.html?searchtype=' + searchType + '&query=' + $('.searchInput').val();
});

$('.searchList').on('click', '.searchItem', function(){
    $('.searchList .searchItem').removeClass('current');
    $(this).addClass('current');
    searchType=$(this).attr('id');

    querysearch(args['query']);
});

function querysearch(s){
    var result="";
    $('.resultList').html(result);

    var postdata = new Object();
    postdata.query = new Object();
    postdata.query.query_string = new Object();
    var qs = s.split(" ");
    postdata.query.query_string.query = qs[0];
    for(var i=1; i < qs.length; i++){
        postdata.query.query_string.query += " And " + qs[i];
    }
    if(searchRegion != ""){
        postdata.query.query_string.fields=searchRegion.split(",");
    }

    $.ajax({
        type: 'GET',
        url: searchAllUrl,
        crossDomain: true,
        dataType: "JSON",
        data: {
            'query': postdata.query.query_string.query,
            'region': postdata.query.query_string.fields,
            'searchtype': 'paper'
        },
        success: function (data) {
            $('.totalResult').html(data.hits.total);
            for(var i = 0; i < data.hits.hits.length; i++){
                result += '<div class="resultItem">'
                    + '<div class="itemHead">'
                    + '<a href="detail.html?paperid=' + data.hits.hits[i]._source.paperid + '&searchtype=' + searchType + '" class="title">' + data.hits.hits[i]._source.name + '</a>'
                    + '<span class="divsion">-</span>'
                    + '<span class="fileType">'
                    + '<span class="label">会议：</span>'
                    + '<span class="value">' + data.hits.hits[i]._source.conf_info.confname + '</span>'
                    + '</span>'
                    + '<span class="dependValue">'
                    + '<span class="label">相关度：</span>'
                    + '<span class="value">' + data.hits.hits[i]._score + '</span>'
                    + '</span>'
                    + '</div>'
                    + '<div class="itemBody"><span class="itemHead">摘要： </span>' + data.hits.hits[i]._source.abstract.substr(0,300) + '...</div>'
                    + '<div class="itemFoot">'
                    + '<span class="info">'
                    + '<label>作者：</label>'
                    + '<span class="value">' + data.hits.hits[i]._source.authors[0].name;
                for(var j = 1; j < data.hits.hits[i]._source.authors.length; j++){
                    result += ', ' + data.hits.hits[i]._source.authors[j].name;
                }
                result += '</span></span>'
                    + '</div>'
                    + '</div>';
            }
            $('.resultList').append(result);
        }
    });
}

$.each($('.subfieldContext'), function(i, item){
    //$(this).find('li:gt(2)').hide().end().find('li:last').show();
});

$('.subfieldContext .name').click(function(){
    searchRegion = $(this).attr('id');
    querysearch(args['query']);
});

$('.sideBarShowHide a').click(function(e) {
    if($('#main').hasClass('sideBarHide')){
        $('#main').removeClass('sideBarHide');
        $('#container').removeClass('sideBarHide');
    }else{
        $('#main').addClass('sideBarHide');
        $('#container').addClass('sideBarHide');
    }

});

// //分页
// $(".pagination").pagination(500, {
//     current_page :0, //当前页码
//     items_per_page :9,
//     display_msg :true,
//     callback :pageselectCallback
// });
// function pageselectCallback(page_id, jq) {
//     alert("当前页id(由0开始)：" + page_id + "，\n每页显示：" + this.items_per_page + "条数据");
// }

setHeight();
$(window).resize(function(){
    setHeight();
});

function setHeight(){
    if($('#container').outerHeight() < $(window).height()){
        $('#container').height($(window).height()-33);
    }
}

//获取url参数
function getUrlParam() {
    var args = new Object();
    var query = decodeURI(location.search.substring(1));//获取查询串

    var pairs = query.split("&");//在逗号处断开

    for (var i = 0; i < pairs.length; i++) {

        var pos = pairs[i].indexOf('=');//查找name=value

        if (pos == -1)   continue;//如果没有找到就跳过

        var argname = pairs[i].substring(0, pos);//提取name

        var value = pairs[i].substring(pos + 1);//提取value

        args[argname] = unescape(value);//存为属性

    }

    return args;
}