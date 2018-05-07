/*document.write("<script src='js/jquery.tabs.extend.js' type='text/javascript'></script>");	
*/$(function(){
		
		
	   
	   
	});
	

function openWind(dataUrl,dataIndex,menuName) {
    // 获取标识数据
   /* var dataUrl = $(this).attr('href'),
    	
        dataIndex = $(this).data('index'),
        menuName = $.trim($(this).text()),*/
    var  flag = true;
    // 选项卡菜单已存在
    $('.J_menuTab').each(function () {
        if ($(this).data('name') == dataIndex) {
           if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                // 显示tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('name') == dataIndex) {
                        $("#iframe"+dataIndex).attr("src",dataUrl);
                        $(this).show().siblings('.J_iframe').hide();
                        /*if ($(this).data('id') != dataUrl) {
                        	var loading = layer.load();
                            $("#iframe"+dataIndex).load(function () {
                                //iframe加载完成后隐藏loading提示
                                layer.close(loading);
                            });
                            $("#iframe"+dataIndex).attr("src",dataUrl);
                            
                            return false;
                        }*/
                    	return false;
                    }
                });
            }else{
            	$('.J_mainContent .J_iframe').each(function () {
            		if ($(this).data('name') == dataIndex) {
                    	var loading = layer.load();
                        $("#iframe"+dataIndex).load(function () {
                            //iframe加载完成后隐藏loading提示
                            layer.close(loading);
                        });
                        $("#iframe"+dataIndex).attr("src",dataUrl);
                        
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });
    // 选项卡菜单不存在
    if (flag&&dataUrl!=null&dataUrl!='') {
        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '"data-name="'+dataIndex+'">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.J_menuTab').removeClass('active');
        // 添加选项卡对应的iframe
        
        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" id="iframe' + dataIndex + '" style="width: 100%;height:100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '"data-name="'+dataIndex+'"></iframe>';
        $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

        //显示loading提示
        var loading = layer.load();

        $('.J_mainContent iframe:visible').load(function () {
            //iframe加载完成后隐藏loading提示
            layer.close(loading);
        });


        // 添加选项卡
        $('.J_menuTabs .page-tabs-content').append(str);

        // 总宽度
        var countWidth = $(".content-tabs").width() - 80;

        // 可视区域宽度
        var visibleWidth = $('.page-tabs-content').width();
        // 可视区域的宽度大于总宽度
        if (visibleWidth > countWidth) {
            // 移动元素的marginLeft值
            var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
            var areaWidth = visibleWidth - countWidth
            $('.page-tabs-content').animate({
                marginLeft: '-' + areaWidth + 'px'
            }, "fast");
        }

    }

    return false;
}

function addTab(title, url){
	if ($('#tabs').tabs('exists', title)){
		$('#tabs').tabs('select', title);
		var currTab = $('#tabs').tabs('getSelected');
			$('#tabs').tabs('updateIframeTab',{
				which:title,
				iframe:{src:url}
			});
			//存放url
			$("#urlId").val(url);
	} else {
		var content = createFrame(url);
		$('#tabs').tabs('addIframeTab',{
			tab:{title:title,closable:true}, 
			iframe:{src:url}
		});
		$("#urlId").val(url);
	}
	tabClose();
}

function createFrame(url)
{
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}
function tabClose() {
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	});
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}
//右键关闭事件
function tabCloseEven() {
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if(url != undefined && currTab.panel('options').title != '欢迎使用') {
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url)
				}
			});
		}
	});
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	});
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			if(t != '欢迎使用') {
				$('#tabs').tabs('close',t);
			}
		});
	});
	$('#mm-tabcloseother').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		var nextall = $('.tabs-selected').nextAll();		
		if(prevall.length>0){
			prevall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != '欢迎使用') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		if(nextall.length>0) {
			nextall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != '欢迎使用') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		return false;
	});
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}