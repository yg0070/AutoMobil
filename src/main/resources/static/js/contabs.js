//选项卡
$(function () {
	$.ajax({
		   type: "POST",
		   url: "menu.do?method=getmenu",
		   success: function(msg){
			   
			  // var ms=$.parseJSON(msg);
			   var menulist ='';
			 /*  menulist +='<li>';
       		menulist += '<a class="J_menuItem" rel="center1234" href="center.jsp"  data-index="'+new Date().getTime()+'"><i class="menu-icon glyphicon glyphicon-home"></i><span class="menu-text">首页</span></a>';
       		menulist+='</li>'*/
			   $.each(msg, function(i, n) {//$.each 循环
					menulist +='<li>';
	        		menulist += '<a href="#" class="menu-dropdown"><i class="menu-icon fa fa-truck"></i><span class="menu-text">'+n.text+'</span><span class="fa arrow"></span></a>';
	        		if(n.children!=""){
		        		menulist += '<ul  class="submenu">';
		        		$.each(n.children, function(j, o) {
							menulist +='<li>';
				        	if(o.children!=""){
				        		menulist += '<a href="#"  class="menu-dropdown"><i></i><span class="menu-text">'+o.text+'</span><i class="menu-expand"></i></a>';
				        		menulist += '<ul  class="submenu">';
				        		$.each(o.children, function(j, c) {
									menulist +='<li>';
						        	if(c.children!=""){
						        		menulist += '<a href="#" class="menu-dropdown"><i ></i><span class="menu-text">'+c.text+'</span><i class="menu-expand"></i></a>';
						        		menulist += '<ul  class="submenu">';
						        		$.each(c.children, function(j, d) {
											menulist +='<li>';
								        	if(d.children!=""){
								        		menulist += '<a href="#" class="menu-dropdown"><i></i><span class="menu-text">'+d.text+'</span><i class="menu-expand"></i></a>';
								        		menulist += '<ul  class="submenu">';
								        		$.each(d.children, function(j, e) {
													menulist +='<li>';
										        	if(e.children!=""){
										        		menulist += '<a href="#" class="menu-dropdown"><i></i><span class="menu-text">'+e.text+'</span><i class="menu-expand"></i></a>';
										        		menulist += '<ul  class="submenu">';
										        		
									        			menulist +='</ul>'
										        	}else{
										        		menulist +='<li><a class="J_menuItem" rel="'+e.id+'" href="#" dataUrl="'+e.pageurl+'"  data-index="'+i+new Date().getTime()+'">'+e.text+'</a></li>';

										        	}
													menulist += '</li>';

								        		});
							        			menulist +='</ul>'
								        	}else{
								        		menulist +='<li><a class="J_menuItem" rel="'+d.id+'" href="#" dataUrl="'+d.pageurl+'"  data-index="'+i+new Date().getTime()+'">'+d.text+'</a></li>';

								        	}
											menulist += '</li>';

						        		});
					        			menulist +='</ul>'
						        	}else{
						        		menulist +='<li><a class="J_menuItem" rel="'+c.id+'" href="#" dataUrl="'+c.pageurl+'"  data-index="'+i+new Date().getTime()+'">'+c.text+'</a></li>';

						        	}
									menulist += '</li>';
						        });
			        			menulist +='</ul>'
				        	}else{
				        		menulist +='<li><a class="J_menuItem"  rel="'+o.id+'" dataUrl="'+o.pageurl+'" href="#"  data-index="'+i+new Date().getTime()+'">'+o.text+'</a></li>';
				        		//menulist += '<a href="'+o.pageurl+'"><i class="fa fa-home"></i><span class="menu-text">'+o.text+'</span></a></li>';
				        	}
							menulist += '</li>';
				        });
	        			menulist +='</ul>'
	        		}
					menulist += '</li>';
				
			    });
       			
			   $(".sidebar-menumain").after(menulist);
			   console.log(menulist);
			   //$('#side-menu').metisMenu();
			    $('.J_menuItem').click(menuItem);

		   }
	});
    //通过遍历给菜单项加上data-index属性
  /*  $(".J_menuItem").each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });*/
	
    function menuItem() {
        // 获取标识数据
        var dataUrl = $(this).attr('dataUrl'),
        	menu_id = $(this).attr('rel'),
            dataIndex = $(this).data('index'),
            menuName = $.trim($(this).text()),
            flag = true;
        if(dataUrl=="center.jsp"){
        	dataUrl="center.jsp"
        }else if(dataUrl!=null&&typeof(menu_id) != "undefined"){
        	dataUrl=dataUrl+"&menu_id="+menu_id;
        }
        console.log("宝宝来了:"+dataUrl+"   "+dataIndex+"    "+menuName+"    "+menu_id);
        // 选项卡菜单已存在
       /* $('.J_menuTab').each(function () {
            if ($(this).data('id') == dataUrl) {
               if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                    // 显示tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == dataUrl) {
                            //$("#iframe"+dataIndex).attr("src",dataUrl);
                            $(this).show().siblings('.J_iframe').hide();

                        	return false;
                        }
                    });
                }else{
                	$('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == dataUrl) {
                            var loading = layer.load();
                            
                            $("#iframe"+dataIndex).load(function () {
                                //iframe加载完成后隐藏loading提示
                                layer.close(loading);
                            });
                            $("#iframe"+dataIndex).attr("src",dataUrl);
                            
                            $("#iframefirst1").load(function () {
                                //iframe加载完成后隐藏loading提示
                                layer.close(loading);
                            });
                            $("#iframefirst1").attr("src",dataUrl);
                            if(dataUrl=="center.jsp"){
                         	   $('.J_menuTab').text(menuName);
                            }
                            return false;
                        }
                    });
                }
                flag = false;
                return false;
            }
        });*/
        
        // 选项卡菜单不存在
        if (flag&&dataUrl!=null&dataUrl!='') {

/*            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
           
*/            // 添加选项卡对应的iframe
            
/*            var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" id="iframe' + dataIndex + '" style="width: 100%;height:100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '"></iframe>';
*/            //$('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
        	//$('.J_mainContent').find('iframe.J_iframe[data-name]').hide();
/*        	$("[data-name='hui2']").find("i").click();
        	$("[data-name='zhui1']").find("i").click();
        	
*/            
        	$('.page-body').find('iframe.J_iframe').attr("src",dataUrl);//.not("[data-name]")
        	//$(".J_iframe").reload();
            //显示loading提示
          /*  var loading = layer.load();

            $('.page-body iframe:visible').load(function () {
                //iframe加载完成后隐藏loading提示
                layer.close(loading);
            });
                    */     

            // 添加选项卡
            //$('.J_menuTabs .page-tabs-content').append(str);
            //$('.J_menuTab').removeClass('active');
            if(dataUrl=="center.jsp"){
        	   $('.J_menuTab').text(menuName);
           }else{
        	   var arr=new Array();  
            $.ajax({
					   type: "POST",
					   url: "login.do?method=getmenuName",
					   data:{menu_id:menu_id},
					   success: function(msg){
						   var html='';
						   html+="<ul class='breadcrumb'>";
						   html+=" <li> <i class='fa fa-home'></i><a href='#' onclick='tocenter()'>首页</a></li>"
						   arr=msg.split(',');
							for(var i=0;i<arr.length;i++){
								html+="<li class='active'>"+arr[i]+"</li>"
							}
							html+="</ul>";
						   /*<ul class="breadcrumb">
	                        <li>
	                            <i class="fa fa-home"></i>
	                            <a href="#">Home</a>
	                        </li>
	                        <li class="active">Dashboard</li>
	                    </ul>*/
						   $('.page-tabs-content').html(html);
					   }
			});
           }
            // 总宽度
           /* var countWidth = $(".content-tabs").width() - 80;

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
            }*/

        }

        return false;
    }
   

    // 关闭选项卡菜单
    function closeTab() {

        var closeTabId = $(this).parents('.J_menuTab').data('id');
        var currentWidth = $(this).parents('.J_menuTab').width();

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {

            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                console.log((marginLeftVal + currentWidth));
                if (marginLeftVal < 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: (marginLeftVal + currentWidth) + 'px'
                    }, "fast");
                }
                //  移除当前选项卡
                $(this).parents('.J_menuTab #content').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });


            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });
                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

        }

        // 当前元素不处于活动状态
        else {

            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除相应tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
        }

        // 总宽度
        var countWidth = $(".content-tabs").width() - 80;

        // 可视区域宽度
        var visibleWidth = $('.page-tabs-content').width();

        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        // 可视区域的宽度大于总宽度
        if (visibleWidth > countWidth) {

            // 已到左边
            if (marginLeftVal == 0) {
                if (visibleWidth + marginLeftVal > countWidth) {
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (-100) + 'px'
                    }, "fast");
                    console.log(1);
                }
                return
            }

            if (marginLeftVal + 100 > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal - marginLeftVal + 'px'
                }, "fast");
                console.log(2);
                return;
            }

            // 超过左边
            if (marginLeftVal < 0) {
                console.log("3");
                if (visibleWidth > countWidth) {
                    console.log("33")
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (100) + 'px'
                    }, "fast");
                    return
                }

            }

        } else if (visibleWidth < countWidth) {
            console.log("else 1");
            if (marginLeftVal + 100 > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal - marginLeftVal + 'px'
                }, "fast");
                console.log('else' + 2);
                return;
            } else {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal + (100) + 'px'
                }, "fast");
            }
        }

        return false;
    }
    $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

    // 点击选项卡菜单
    function activeTab() {
        if (!$(this).hasClass('active')) {
            var currentId = $(this).data('id');

            // 显示tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == currentId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });
            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
        }
    }
    $('.J_menuTabs').on('click', '.J_menuTab', activeTab);

    //刷新iframe
    function refreshTab() {

        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
        var url = target.attr('src');

        //显示loading提示
        var loading = layer.load();

        target.attr('src', url).load(function () {

            //关闭loading提示
            layer.close(loading);

        });
    }
    $('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

    // 右移按扭
    $('.J_tabRight').on('click', function () {

        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        if (marginLeftVal + 100 >= 0) {
            $('.page-tabs-content').animate({
                marginLeft: marginLeftVal - marginLeftVal + 'px'
            }, "fast");
            return;

        }
        if ((marginLeftVal + 100) < 0) {
            $('.page-tabs-content').animate({
                marginLeft: marginLeftVal + 100 + 'px'
            }, "fast");

        }

    });

    // 左移按扭
    $('.J_tabLeft').on('click', function () {

        // 总宽度
        var countWidth = $(".content-tabs").width() - 80;

        // 可视区域宽度
        var visibleWidth = $('.page-tabs-content').width();

        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        // 可视区域的宽度大于总宽度
        if (visibleWidth > countWidth) {

            // 已到左边
            if (marginLeftVal == 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal + (-100) + 'px'
                }, "fast");
            }

            // 超过左边
            if (marginLeftVal <= 0) {
                if (visibleWidth + marginLeftVal > countWidth)
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (-100) + 'px'
                    }, "fast");
            }

        }
    });
    
  
});
function tocenter(){
	$('.page-body').find('iframe.J_iframe').attr("src","center.jsp");//.not("[data-name]")
	var html='';
	   html+=" <ul class='breadcrumb'><li> <i class='fa fa-home'></i><a href='#' onclick='tocenter()'>首页</a></li></ul>"
	$('.page-tabs-content').html(html);
}