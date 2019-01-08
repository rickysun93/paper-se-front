/**
 * Created by sunhaoran on 2017/6/22.
 */

var searchType = "";
var searchRegion = "";
var args;

$(function(){
    args = getUrlParam();
    searchType = args['searchtype'];
    querysearch(args['paperid']);
    //makegraph();
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
});

function querysearch(s){
    var result="";
    $('.resultList').html(result);

    $.ajax({
        type: 'GET',
        url: searchPaperidUrl,
        crossDomain: true,
        dataType: "JSON",
        data: {
            'query': s
        },
        success: function (data) {
            result += '<div class="resultItem">'
                + '<div class="itemHead">'
                + '<a href="' + data.paper._source.url +'" class="title">' + data.paper._source.name + '</a>'
                + '<span class="divsion">-</span>'
                + '<span class="fileType">'
                + '<span class="label">会议：</span>'
                + '<span class="value">' + data.paper._source.conf_info.confname + '</span>'
                + '</span>'
                + '<span class="dependValue">'
                + '<span class="label">相关度：</span>'
                + '<span class="value">' + data.paper._score + '</span>'
                + '</span>'
                + '</div>'
                + '<div class="itemBody"><span class="itemHead">摘要： </span>' + data.paper._source.abstract + '</div>'
                + '<div class="itemFoot">'
                + '<span class="info">'
                + '<label>作者：</label>'
                + '<span class="value">' + data.paper._source.authors[0].name;
            for(var j = 1; j < data.paper._source.authors.length; j++){
                result += ', ' + data.paper._source.authors[j].name;
            }
            result += '</span><br/>'
                + '<label>话题：</label>'
            //     + '<span class="value">Topic' + data.topics[0].topic;
            // for(var j = 1; j < data.topics.length; j++){
            //     result += ', Topic' + data.topics[j].topic;
            // }
                + '<span class="value">Information retrieval, Topic model, Database, Machine learning, Algorithm optimization';

            result += '</span></span>'
                + '</div>'
                + '</div>';
            $('.resultList').append(result);

            makegraph(data.topics, data.words);
        }
    });
}

function makegraph(topics, words){
    var myCharttopic = echarts.init(document.getElementById('graphtopic'));
    var topicdata = new Array();
    var topicfake = ['Information retrieval', 'Topic model', 'Database', 'Machine learning', 'Algorithm optimization'];
    for(var i = 0; i<topics.length; i++){
        topicdata.push({
            name: topicfake[i],
            value: topics[i].p.toFixed(2)
        })
    }
    // for(var i = 0; i<topics.length; i++){
    //     topicdata.push({
    //         name: 'Topic' + topics[i].topic,
    //         value: topics[i].p.toFixed(2)
    //     })
    // }
    var wss = new Array();
    var ws = "";
    for(var j = 0; j<words.length; j++){
        ws = "";
        for(var k = 0; k<words[j].length; k++)
            ws += '<br/>' + words[j][k];
        wss.push(ws);
    }
    for(j = 0; j<words.length; j++){
        topicdata[j].tooltip = {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)" + wss[j]
        };
    }
    var option = {
        title : {
            text: '话题分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20
        },
        series : [
            {
                name: '话题',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: topicdata,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myCharttopic.setOption(option);
    myCharttopic.on('click', function (params) {
        window.location = 'topic.html?topic=' + params.name;
    });
}

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