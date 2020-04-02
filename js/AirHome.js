


$(document).ready(function(){
  initTable()
  date()
  //cal()

})
//动态添加点位表格
var column,obj
function initTable(){
  column=[];
  obj=[];
  column.push({
    formatter: function(value, row, index) {
        return index + 1;
    },
    "title": "排名",
    valign: "middle",
    align: "center"
  });
  column.push({ "field": "pointName", "title": "点位", valign: "middle", align: "center"});
  column.push({ "field": "AQI", "title": "实时AQI", valign: "middle", align: "center"});
  column.push({ "field": "level", "title": "等级", valign: "middle", align: "center" ,
    cellStyle:function(value,row,index){
      return {css:{"color":"#0f0"}}
    }});
  column.push({ "field": "time", "title": "时间", valign: "middle", align: "center" });
  $.ajax({
    type:'get',
    url:'/static/PointList.json',
    data:'',
    success:function(data){
      //var Obj = JSON.parse(data);
      if(data.length>0){
        console.log(data)
        for(var i=0;i<data.length;i++){
          var JsonData = {};
          JsonData.pointName = data[i].pointName;
          JsonData.AQI = data[i].AQI;
          JsonData.level = data[i].level;
          JsonData.time = data[i].time;
          JsonData.color = data[i].color;
          obj.push(JsonData);
        }
      }
      
    }
  }).then(function() {
    table();
    animatePoint()
  });
}
// 点位表格滚动
function animatePoint(){
  var text=$("tbody:first");//定义第一个tr内容
  var clear;//定义需要清除动画的部分
  text.hover(function(){
    clearInterval(clear);//鼠标悬停，清除动画，停止滚动
  },function(){
      clear=setInterval(function(){
        var field=text.find("tr:first");//获取第一个tr内容
        var high=field.height();//获取需要滚动的高度
        text.animate({ marginTop:-high+"px"},500,function(){//隐藏第一行
          field.css("marginTop",0).appendTo(text);//将该行的margin值置零,然后插入到最后
          text.css("marginTop",0);
        })
      },1000)//滚动间隔时间
    }).trigger("mouseleave");//自动滚动
}
//环境日历
function date(){
  $('#datepicker').dcalendar()
  $.datepicker.setDefaults(
    $.extend(
      $.datepicker.regional['zh-CN']
    )
  );
  //calendar();

}
function cal(){
  $('#cal').datepicker({
    format:"yyyy-mm-dd",
    language: "zh-CN",
    todayHeightlight:true,
  })
}
// 点位下拉选择

//表格配置
function table(){
  var winH = $(window).height(),
  sh = $(".seek").outerHeight(true),
  mth = $("#myTab").outerHeight(true),
  sbh = winH - sh,
  tbheight = winH - sh - mth - 11;
  $("#pointTable1").bootstrapTable('destroy');
  $("#pointTable1").bootstrapTable({
    data: obj,
    striped: true,
    cache: false,
    pagination: false,
    sidePagination: "client",
    pageNumber: 1,
    //dataType:"json",
    pageSize: 24,
    pageList: [6, 12, 24],
    search: false,
    strictSearch: true,
    showColumns: false,
    showRefresh: false,
    showExport: false,
    exportDataType: 'all',
    //icons: { refresh: "glyphicon-repeat", toggle: "glyphicon-list-alt", columns: "glyphicon-list" },
    minimumCountColumns: 2,
    clickToSelect: true,
    height: tbheight,
    showToggle: false,
    //toolbar: '#toolbar',
    cardView: false,
    detailView: false,
    uniqueId: "MonitoringPointUid",
    columns: column,
    idField: "MonitoringPointUid",
    selectItemName: "MonitoringPointUid",
    clickToSelect: true,

  })
}
//日历配置
function calendar(){
  $.datepicker.regional['zh-CN'] = {
    clearText: '清除',
    clearStatus: '清除已选日期',
    closeText: '关闭',
    closeStatus: '不改变当前选择',
    prevText: '<上月',
    prevStatus: '显示上月',
    prevBigText: '<<',
    prevBigStatus: '显示上一年',
    nextText: '下月>',
    nextStatus: '显示下月',
    nextBigText: '>>',
    nextBigStatus: '显示下一年',
    currentText: '今天',
    currentStatus: '显示本月',
    monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一','二','三','四','五','六', '七','八','九','十','十一','十二'],
    monthStatus: '选择月份',
    yearStatus: '选择年份',
    weekHeader: '周',
    weekStatus: '年内周次',
    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
    dayNamesMin: ['日','一','二','三','四','五','六'],
    dayStatus: '设置 DD 为一周起始',
    dateStatus: '选择 m月 d日, DD',
    dateFormat: 'yy-mm-dd',
    firstDay: 1,
    initStatus: '请选择日期',
    showMonthAfterYear:true,//是否把月放在年的后面  
    yearSuffix: '年', //年的后缀  
    isRTL: false
      };
$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
}