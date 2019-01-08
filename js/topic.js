/**
 * Created by sunhaoran on 2017/6/22.
 */

var searchType = "";
var searchRegion = "";
var args;

$(function(){
    args = getUrlParam();
    querysearch();
    makegraphhot();
    makegraphimp();
    makegraphevo();
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

function querysearch(){
    var result="";
    $('.resultList').html(result);

    result += '<div class="resultItem">'
        + '<div class="itemHead">'
        + '<a class="title" style="font-size: 26px">Machine learning</a>'
        + '</div>'
        + '<div class="itemBody" style="font-size: 15px"><span class="itemHead">主要相关单词： </span>learning, label, active, instance, supervised, training, learn, multi-view, example, assumption</div>'
        + '</div>';
    $('.resultList').append(result);

    makegraphword();
}

function makegraphword(){
    var myChartword = echarts.init(document.getElementById('graphword'));
    var option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                show: true,
                data: ['1985', '1990', '1995', '2000', '2005', '2010', '2015']
            },
            title: {
                x:'center'
            },
            xAxis: {
                type: 'value',
                show: false
            },
            yAxis: {
                type: 'category',
                axisTick: {
                    inside: true
                }
                // axisTick: {
                //     inside: true
                // }
            },
            series: [{
                type: 'bar'
            }]
        },
        options: [{
            title: {
                text: '1985年'
            },
            yAxis: {
                data: ['active', 'labeled', 'supervised', 'instance', 'training', 'example', 'unlabeled', 'semi-supervised', 'label', 'learning']
            },
            series: [{
                data: [1, 2, 4, 4, 4, 4, 5, 5, 5, 7]
            }]
        }, {
            title: {
                text: '1990年'
            },
            yAxis: {
                data: ['labeled', 'label', 'passive', 'learn', 'semi-supervised', 'example', 'supervised', 'training', 'active', 'learning']
            },
            series: [{
                data: [1, 2, 4, 4, 4, 4, 5, 5, 5, 7]
            }]
        }, {
            title: {
                text: '1995年'
            },
            yAxis: {
                data: ['instance', 'labeled', 'label', 'supervised', 'example', 'semi-supervised', 'mil', 'unlabeled', 'training', 'learning']
            },
            series: [{
                data: [1, 2, 4, 4, 4, 4, 5, 5, 5, 7]
            }]
        }, {
            title: {
                text: '2000年'
            },
            yAxis: {
                data: ['learn', 'instance', 'mi', 'active', 'labeled', 'label', 'training', 'unlabeled', 'semi-supervised', 'learning']
            },
            series: [{
                data: [1, 2, 4, 4, 4, 4, 5, 5, 5, 7]
            }]
        }, {
            title: {
                text: '2005年'
            },
            yAxis: {
                data: ['semi-supervised', 'job', 'training', 'mf', 'learn', 'labeled', 'label', 'supervised', 'unlabeled', 'learning']
            },
            series: [{
                data: [1, 2, 3, 4, 4, 5, 6, 7, 8, 9]
            }]
        }, {
            title: {
                text: '2010年'
            },
            yAxis: {
                data: ['instance', 'diagnosis', 'example', 'unlabeled', 'assumption', 'active', 'training', 'semi-supervised', 'label', 'learning']
            },
            series: [{
                data: [0.00552, 0.00561, 0.00564, 0.00693, 0.00704, 0.00723, 0.00777, 0.00815, 0.01098, 0.02245]
            }]
        },{
            title: {
                text: '2015年'
            },
            yAxis: {
                data: ['assumption', 'example', 'multi-view', 'learn', 'training', 'supervised', 'instance', 'active', 'label', 'learning']
            },
            series: [{
                data: [0.00580, 0.00662, 0.00695, 0.00821, 0.00891, 0.01009, 0.01424, 0.01455, 0.01842, 0.01873]
            }]
        }]
    };
    myChartword.setOption(option);
}

function makegraphhot(){
    var myCharttopic = echarts.init(document.getElementById('graphhot'));
    // var topicdata = new Array();
    // for(var i = 0; i<topics.length; i++){
    //     topicdata.push({
    //         name: 'Topic' + topics[i].topic,
    //         value: topics[i].p.toFixed(2)
    //     })
    // }
    // var ws = "";
    // for(var j = 0; j<words.length; j++){
    //     ws += '<br/>' + words[j];
    // }
    // topicdata[0].tooltip = {
    //     trigger: 'item',
    //     formatter: "{b} : {c} ({d}%)" + ws
    // };
    // var option = {
    //     title : {
    //         text: '话题热度',
    //         x:'center'
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLabel: {
    //             show: false
    //         },
    //         axisTick: {
    //             inside: true
    //         }
    //     },
    //     series: [{
    //         data: [8,8.5,13.5,13,22,21.5,28.5,30.5,32,33.5,37,45,51.5,52.5,58.5,91.5,89.5,102,162,191,224,247.5,327,342,345,299,325,345.5,409.5,427.5,524.5,631],
    //         type: 'line',
    //         smooth: true
    //     }]
    // };
    var option = {
        title : {
            text: '话题热度',
            x:'center'
        },
        xAxis: {
            type: 'category',
            data: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false
            },
            axisTick: {
                inside: true
            }
        },
        series: [{
            data: [15,15.5,15.5,13.5,15,16,18,21.5,28,65.5,83,111.5,158.5,168,236,311,420,496.5,575,606,631,661,688,640,667,655,634,666.5,600.5,564.5,591,573],
            type: 'line',
            smooth: true
        }]
    };
    myCharttopic.setOption(option);
}

function makegraphimp(){
    var myCharttopic = echarts.init(document.getElementById('graphimp'));
    // var option = {
    //     title : {
    //         text: '话题影响力',
    //         x:'center'
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLabel: {
    //             show: false
    //         },
    //         axisTick: {
    //             inside: true
    //         }
    //     },
    //     series: [{
    //         data: [37.23,42,54.06,61,74.97,83,105,115,120,127,139,171,190,215,228,240,265,287,300,310,321,331,337,342,345,330,325,345.5,340,360,354.5,341],
    //         type: 'line',
    //         smooth: true
    //     }]
    // };
    var option = {
        title : {
            text: '话题影响力',
            x:'center'
        },
        xAxis: {
            type: 'category',
            data: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false
            },
            axisTick: {
                inside: true
            }
        },
        series: [{
            data: [8.5,9.75,9.25,7.75,12,13.5,10,12.25,15.5,55.125,103.5,145.6875,315.1974375,415.07235,519.9975,645.32325,685.23,702.125,718.4,755.4,786.6,845.9,848,843,842.5,842,806.5,776.75,752.25,720.75,720.5,687],
            type: 'line',
            smooth: true
        }]
    };
    myCharttopic.setOption(option);
}

// function makegraphevo(){
//     var myChartevo = echarts.init(document.getElementById('graphevo'));
//     var option = {
//         title : {
//             text: '话题演化',
//             x:'center'
//         },
//         series: {
//             type: 'sankey',
//             label: {
//                 position: 'right'
//             },
//             data: [
//                 {
//                 name: 'Topic4@2015',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@2010',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@2005',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@2000',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@1995',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@1990',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic4@1985',
//                 itemStyle: {
//                     color: '#2f4554'
//                 }
//             }, {
//                 name: 'Topic23@2010',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic23@2005',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic23@2000',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic23@1995',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic23@1990',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic23@1985',
//                 itemStyle: {
//                     color: '#61a0a8'
//                 }
//             }, {
//                 name: 'Topic7@2000',
//                 itemStyle: {
//                     color: '#d48265'
//                 }
//             }, {
//                 name: 'Topic7@1995',
//                 itemStyle: {
//                     color: '#d48265'
//                 }
//             }, {
//                 name: 'Topic9@1995',
//                 itemStyle: {
//                     color: '#91c7ae'
//                 }
//             }, {
//                 name: 'Topic9@1990',
//                 itemStyle: {
//                     color: '#91c7ae'
//                 }
//             }, {
//                 name: 'Topic9@1985',
//                 itemStyle: {
//                     color: '#91c7ae'
//                 }
//             }, {
//                 name: 'Topic30@1990',
//                 itemStyle: {
//                     color: '#bda29a'
//                 }
//             }, {
//                 name: 'Topic30@1985',
//                 itemStyle: {
//                     color: '#bda29a'
//                 }
//             }],
//             links: [
//                 {
//                 source: 'Topic4@2010',
//                 target: 'Topic4@2015',
//                 value: 7
//             }, {
//                 source: 'Topic4@2005',
//                 target: 'Topic4@2010',
//                 value: 4.9
//             }, {
//                 source: 'Topic4@2000',
//                 target: 'Topic4@2005',
//                 value: 6
//             }, {
//                 source: 'Topic4@1995',
//                 target: 'Topic4@2000',
//                 value: 4.5
//             }, {
//                 source: 'Topic4@1990',
//                 target: 'Topic4@1995',
//                 value: 5.5
//             }, {
//                 source: 'Topic4@1985',
//                 target: 'Topic4@1990',
//                 value: 7
//             }, {
//                 source: 'Topic23@2010',
//                 target: 'Topic4@2015',
//                 value: 3
//             }, {
//                 source: 'Topic23@2005',
//                 target: 'Topic4@2010',
//                 value: 5.1
//             }, {
//                 source: 'Topic23@2000',
//                 target: 'Topic4@2005',
//                 value: 4
//             }, {
//                 source: 'Topic9@1995',
//                 target: 'Topic4@2000',
//                 value: 5.5
//             }, {
//                 source: 'Topic23@1990',
//                 target: 'Topic4@1995',
//                 value: 4.5
//             }, {
//                 source: 'Topic9@1985',
//                 target: 'Topic4@1990',
//                 value: 3
//             }, {
//                 source: 'Topic23@2000',
//                 target: 'Topic23@2005',
//                 value: 8
//             }, {
//                 source: 'Topic23@1995',
//                 target: 'Topic23@2000',
//                 value: 7
//             }, {
//                 source: 'Topic23@1990',
//                 target: 'Topic23@1995',
//                 value: 8
//             }, {
//                 source: 'Topic23@1985',
//                 target: 'Topic23@1990',
//                 value: 7
//             }, {
//                 source: 'Topic7@2000',
//                 target: 'Topic23@2005',
//                 value: 2
//             }, {
//                 source: 'Topic7@1995',
//                 target: 'Topic23@2000',
//                 value: 3
//             }, {
//                 source: 'Topic9@1990',
//                 target: 'Topic23@1995',
//                 value: 2
//             }, {
//                 source: 'Topic9@1985',
//                 target: 'Topic23@1990',
//                 value: 3
//             }, {
//                 source: 'Topic9@1990',
//                 target: 'Topic9@1995',
//                 value: 6
//             }, {
//                 source: 'Topic9@1985',
//                 target: 'Topic9@1990',
//                 value: 7
//             }, {
//                 source: 'Topic30@1990',
//                 target: 'Topic9@1995',
//                 value: 4
//             }, {
//                 source: 'Topic30@1985',
//                 target: 'Topic9@1990',
//                 value: 3
//             }]
//         }
//     };
//     myChartevo.setOption(option);
// }

function makegraphevo(){
    var myChartevo = echarts.init(document.getElementById('graphevo'));
    var option = {
        title : {
            text: '话题演化',
            x:'center'
        },
        series: {
            type: 'sankey',
            label: {
                position: 'right'
            },
            data: [
                {
                    name: 'Machine learning\n@1985',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@1990',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@1995',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@2000',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@2005',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@2010',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Machine learning\n@2015',
                    itemStyle: {
                        color: '#2f4554'
                    }
                }, {
                    name: 'Neural network\n@1990',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Neural network\n@1995',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Neural network\n@2000',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Neural network\n@2005',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Neural network\n@2010',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Neural network\n@2015',
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }, {
                    name: 'Classification\n@2000',
                    itemStyle: {
                        color: '#d48265'
                    }
                }, {
                    name: 'Classification\n@2005',
                    itemStyle: {
                        color: '#d48265'
                    }
                }, {
                    name: 'Deep learning\n@2005',
                    itemStyle: {
                        color: '#91c7ae'
                    }
                }, {
                    name: 'Deep learning\n@2010',
                    itemStyle: {
                        color: '#91c7ae'
                    }
                }, {
                    name: 'Deep learning\n@2015',
                    itemStyle: {
                        color: '#91c7ae'
                    }
                }, {
                    name: 'Graph algorithm\n@2010',
                    itemStyle: {
                        color: '#bda29a'
                    }
                }, {
                    name: 'Graph algorithm\n@2015',
                    itemStyle: {
                        color: '#bda29a'
                    }
                }],
            links: [
                {
                    target: 'Machine learning\n@1990',
                    source: 'Machine learning\n@1985',
                    value: 7
                }, {
                    target: 'Machine learning\n@1995',
                    source: 'Machine learning\n@1990',
                    value: 4.9
                }, {
                    target: 'Machine learning\n@2000',
                    source: 'Machine learning\n@1995',
                    value: 6
                }, {
                    target: 'Machine learning\n@2005',
                    source: 'Machine learning\n@2000',
                    value: 4.5
                }, {
                    target: 'Machine learning\n@2010',
                    source: 'Machine learning\n@2005',
                    value: 5.5
                }, {
                    target: 'Machine learning\n@2015',
                    source: 'Machine learning\n@2010',
                    value: 7
                }, {
                    target: 'Neural network\n@1990',
                    source: 'Machine learning\n@1985',
                    value: 3
                }, {
                    target: 'Neural network\n@1995',
                    source: 'Machine learning\n@1990',
                    value: 5.1
                }, {
                    target: 'Neural network\n@2000',
                    source: 'Machine learning\n@1995',
                    value: 4
                }, {
                    target: 'Deep learning\n@2005',
                    source: 'Machine learning\n@2000',
                    value: 5.5
                }, {
                    target: 'Neural network\n@2010',
                    source: 'Machine learning\n@2005',
                    value: 4.5
                }, {
                    target: 'Deep learning\n@2015',
                    source: 'Machine learning\n@2010',
                    value: 3
                }, {
                    target: 'Neural network\n@2000',
                    source: 'Neural network\n@1995',
                    value: 8
                }, {
                    target: 'Neural network\n@2005',
                    source: 'Neural network\n@2000',
                    value: 7
                }, {
                    target: 'Neural network\n@2010',
                    source: 'Neural network\n@2005',
                    value: 8
                }, {
                    target: 'Neural network\n@2015',
                    source: 'Neural network\n@2010',
                    value: 7
                }, {
                    target: 'Classification\n@2000',
                    source: 'Neural network\n@1995',
                    value: 2
                }, {
                    target: 'Classification\n@2005',
                    source: 'Neural network\n@2000',
                    value: 3
                }, {
                    target: 'Deep learning\n@2010',
                    source: 'Neural network\n@2005',
                    value: 2
                }, {
                    target: 'Deep learning\n@2015',
                    source: 'Neural network\n@2010',
                    value: 3
                }, {
                    target: 'Deep learning\n@2010',
                    source: 'Deep learning\n@2005',
                    value: 6
                }, {
                    target: 'Deep learning\n@2015',
                    source: 'Deep learning\n@2010',
                    value: 7
                }, {
                    target: 'Graph algorithm\n@2010',
                    source: 'Deep learning\n@2005',
                    value: 4
                }, {
                    target: 'Graph algorithm\n@2015',
                    source: 'Deep learning\n@2010',
                    value: 3
                }]
        }
    };
    myChartevo.setOption(option);
}

// function makegraphevo(){
//     var myChartevo = echarts.init(document.getElementById('graphevo'));
//     var option = {
//         title : {
//             text: '话题演化',
//             x:'center'
//         },
//         series: {
//             type: 'sankey',
//             label: {
//                 position: 'right'
//             },
//             data: [
//                 {
//                     name: 'Knowledge graph\n@2015',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@2010',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@2005',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@2000',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@1995',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@1990',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Knowledge graph\n@1985',
//                     itemStyle: {
//                         color: '#d48265'
//                     }
//                 }, {
//                     name: 'Semantic network\n@2010',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Semantic network\n@2005',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Semantic network\n@2000',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Semantic network\n@1995',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Semantic network\n@1990',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Semantic network\n@1985',
//                     itemStyle: {
//                         color: '#bda29a'
//                     }
//                 }, {
//                     name: 'Information retrieval\n@1995',
//                     itemStyle: {
//                         color: '#61a0a8'
//                     }
//                 }, {
//                     name: 'Information retrieval\n@1990',
//                     itemStyle: {
//                         color: '#61a0a8'
//                     }
//                 }, {
//                     name: 'Information retrieval\n@1985',
//                     itemStyle: {
//                         color: '#61a0a8'
//                     }
//                 }, {
//                     name: 'NLP\n@1995',
//                     itemStyle: {
//                         color: '#2f4554'
//                     }
//                 }, {
//                     name: 'NLP\n@1985',
//                     itemStyle: {
//                         color: '#2f4554'
//                     }
//                 }],
//             links: [
//                 {
//                     source: 'Knowledge graph\n@2010',
//                     target: 'Knowledge graph\n@2015',
//                     value: 7
//                 }, {
//                     source: 'Knowledge graph\n@2005',
//                     target: 'Knowledge graph\n@2010',
//                     value: 6
//                 }, {
//                     source: 'Knowledge graph\n@2000',
//                     target: 'Knowledge graph\n@2005',
//                     value: 4.5
//                 }, {
//                     source: 'Knowledge graph\n@1995',
//                     target: 'Knowledge graph\n@2000',
//                     value: 7.5
//                 }, {
//                     source: 'Knowledge graph\n@1990',
//                     target: 'Knowledge graph\n@1995',
//                     value: 6.5
//                 }, {
//                     source: 'Knowledge graph\n@1985',
//                     target: 'Knowledge graph\n@1990',
//                     value: 5.5
//                 }, {
//                     source: 'Semantic network\n@2010',
//                     target: 'Knowledge graph\n@2015',
//                     value: 3
//                 }, {
//                     source: 'Semantic network\n@2005',
//                     target: 'Knowledge graph\n@2010',
//                     value: 4
//                 }, {
//                     source: 'Semantic network\n@2000',
//                     target: 'Knowledge graph\n@2005',
//                     value: 5.5
//                 }, {
//                     source: 'NLP\n@1995',
//                     target: 'Knowledge graph\n@2000',
//                     value: 2.5
//                 }, {
//                     source: 'Information retrieval\n@1990',
//                     target: 'Knowledge graph\n@1995',
//                     value: 3.5
//                 }, {
//                     source: 'Semantic network\n@1985',
//                     target: 'Knowledge graph\n@1990',
//                     value: 4.5
//                 }, {
//                     source: 'Semantic network\n@1995',
//                     target: 'Semantic network\n@2000',
//                     value: 7
//                 }, {
//                     source: 'Semantic network\n@1990',
//                     target: 'Semantic network\n@1995',
//                     value: 5
//                 }, {
//                     source: 'Semantic network\n@1985',
//                     target: 'Semantic network\n@1990',
//                     value: 6.5
//                 }, {
//                     source: 'Information retrieval\n@1995',
//                     target: 'Semantic network\n@2000',
//                     value: 3
//                 }, {
//                     source: 'Information retrieval\n@1990',
//                     target: 'Semantic network\n@1995',
//                     value: 5
//                 }, {
//                     source: 'Information retrieval\n@1985',
//                     target: 'Semantic network\n@1990',
//                     value: 3.5
//                 }, {
//                     source: 'Information retrieval\n@1985',
//                     target: 'Information retrieval\n@1990',
//                     value: 8
//                 }, {
//                     source: 'NLP\n@1985',
//                     target: 'Information retrieval\n@1990',
//                     value: 2
//                 }]
//         }
//     };
//     myChartevo.setOption(option);
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