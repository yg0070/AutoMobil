$.fn.dataTable.ext.errMode="";
$.extend($.fn.dataTable.defaults, {
		"processing": true,
        "serverSide": true,
        "pagingType":"full_numbers",
        "searching": false,
	    "autoWidth" : true,
         "scrollX" : true,
        "dom": "t"+"<'dt-toolbar-footer'<'col-sm-1 col-xs-12 hidden-xs'l>r<'col-sm-5 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "select" : {
			style : 'multi',
		},
		"dom": "t"+"<'dt-toolbar-footer'<'col-sm-2 col-xs-12 hidden-xs'l>r<'col-sm-4 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
		"columnDefs": [{
		      "targets": [0],
		      "orderable": false,
		      "title" : '<label class="no-margin"><input type="checkbox" name="checkbox style-0 " class="checkbox style-0 checkAll" id="checkAll"><span></span></label>',
				"render" : "[]",
				"className" : 'select-checkbox',
				"width":'20px'
		 } ],
		"order": [[1, 'asc']],	  
		"language" : {
			"processing" : "玩命加载中...",
			"lengthMenu" : "显示 _MENU_ 项结果",
			"zeroRecords" : "没有匹配结果",
			"emptyTable":"没有查询到数据,亲!",
			"info" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			"infoEmpty" : "显示第 0 至 0 项结果，共 0 项",
			"infoFiltered" : "(由 _MAX_ 项结果过滤)",
			"infoPostFix" : "",
			"url" : "",
			"paginate" : {
				"first" : "首页",
				"previous" : "上一页",
				"next" : "下一页",
				"last" : "末页"
			},
			"select": {
	            rows: {
	                _: "选择  %d 行",
	                1: "选择 1 行"
	            }
	        }
		}

} );
 
 /*
  * 标题的checkbook。全选不全选
  */
function checkAll() {
	var checked = $("#checkAll")[0].checked;
	var table = $(".dataTable").DataTable();
	if (checked) {
		table.rows({page : 'current'}).select();
	} else {
		table.rows({page : 'current'}).deselect();
	}
}
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

/*
 * 页面的全选不全选
 */
window.onload = function() {
	$("#checkAll").click(function(){   
	    checkAll();
	});
	var t = $(".dataTable").DataTable();
	var checkeds = $("#checkAll")[0];
	t.on('select', function(e, dt, type, indexes) {
		var selectLength = t.rows({selected : true,}).data().length;
		var pagelength = t.rows().data().length;
		if (pagelength != selectLength) {
			checkeds.checked = false;
		} else {
			checkeds.checked = true;
		}
	});
	t.on('deselect', function(e, dt, type, indexes) {
		var selectLength = t.rows({selected : true,}).data().length;
		var pagelength = t.rows().data().length;
		if (pagelength!= selectLength) {
			checkeds.checked = false;
		} else {
			checkeds.checked = true;
		}
	});
	t.on('draw.dt', function() {
		checkeds.checked = false;
	});
}
/*Date.prototype.format=function (format) {      
    var it=new Date();      
    var it=this;      
    var M=it.getMonth()+1,H=it.getHours(),m=it.getMinutes(),d=it.getDate(),s=it.getSeconds();      
    var n={ 'yyyy': it.getFullYear()      
            ,'MM': M.pad2(),'M': M      
            ,'dd': d.pad2(),'d': d      
            ,'HH': H.pad2(),'H': H      
            ,'mm': m.pad2(),'m': m      
            ,'ss': s.pad2(),'s': s      
    };      
    return format.replace(/([a-zA-Z]+)/g,function (s,$1) { return n[$1]; });      
}
*/
 