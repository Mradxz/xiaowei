/**
* 仿WebQQ整合苹果系统导航菜单界面 周宗桥
* @2012.11.22 
*/

var thisPage = 1;//初始化当前页面
var count = 0;
$(function() {
	init_event();//初始化事件
	Body.init();
	Desktop.init();
	Deskpanel.init(ops).refresh();
	Sidebar.init({
		location:'left',//初始化sidebar的位置为左侧
		Icon:leftMenu
	});
	Navbar.init();//初始化导航条
	Arrows.init();//初始化分页箭头
	BottomBar.init();//初始化下部栏
	Filelist.init();//初始化底部文件夹
	ElsePanel.init();//初始化其他面板
	SlideTheMouse.init();//初始化鼠标滑动切换桌面
	AppRight.init();//app和文件夹的右键
});
//初始化事件
init_event = function(){
	document.oncontextmenu=function(){//屏蔽浏览器右键事件
		return false;
	};
	var isIE = navigator.appName;
	  //判断是否是IE浏览器
	if(isIE=="Microsoft Internet Explorer"){
		//添加IE右击事件
		$("body").bind("mousedown",function (event){
			if(event.which==3){
				 var md = Desktop.MenuData();
				 $("body").smartMenu(md, {
					name: "image"
				});
			}
		});
	}
	$(document).bind('mousemove',function(e){
		var area = $(window).width()-50;
		if(e.pageX>area){
			e.pageX = area;
		}
	});
	
}
//工具类
Util = {
	formatmodel : function (str, model) {
		for (var k in model) {
			var re = new RegExp("{" + k + "}", "g");
			str = str.replace(re, model[k])
		}
		return str
	}
}

//面板类
Panel=function(){
	return me={
		hitTest:function(panel,x,y){//碰撞检测，检测坐标[x,y]是否落在panel里面
			var pl,pt;
			return !(
				  x<(pl=panel.offset().left)
				||y<(pt=panel.offset().top)
				||x>pl+panel.width()
				||y>pt+panel.height()
			);
		},
		getIdx:function(panel){//获取节点在panel是第几个儿子节点
			var ci=0;
			while(panel=panel.prev()){
				ci++;
			}
			return ci;
		},
		unSelecte:function(){//清除选中
			return window.getSelection?function(){window.getSelection().removeAllRanges();}:function(){document.selection.empty();};
		}()
	};
}();

//BODY
Body=function(me){

	return me={
		init:function(){
			me.create();
			me.bindEvent();
		},
		create:function(){
			me.box=$('body');
			me.setStyle();
		},
		bindEvent:function(){//清除选中
			function move(evt){
				window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
			}
			function up(evt){
				$(document).unbind('mousemove',move).unbind('mouseup',up);
			}
			$(document).bind('mousedown',function(){
				$(document).bind('mousemove',move).bind('mouseup',up);
			});
		},
		addPanel:function(panel){
			me.box.append(panel);
		},
		setStyle:function(){
			me.box.css({
					backgroud:"none repeat scroll 0 0 transparent",					
					display: "block",
					height:"500px"
			});
			
		}
		
	};
}();

//创建桌面最外层类
Desktop=function(me){
	return me={	
		init:function(){
			me.create();
			me.setMenu();//绑定右键
			return me;
		}, 
		create:function(){
			me.box=$("<div id='desktop' style='position: static;'></div>");
			Body.addPanel(me.box);
		},
		addPanel:function(panel){
			me.box.append(panel);
		},
		show:function(){
			me.box.show();
		},
		hide:function(){
			me.box.hide();
		},
		MenuData:function (){
			var MenuData = [
			[{
				text: "显示桌面",
				func: function() {
					Windows.showWindowDesk();
				}
			},{
				text: "关闭所有",
				func: function() {
					Windows.closeAllWindow();
				}
			}, {
				text: "锁屏",
				func: function() {
								
				}
			}],[{
				text: "系统设置",
				func: function() {
						 
				}
			},{
				text: "主题设置",
				func: function() {Windows.openSys({
								id :'themSetting',
								title :'设置主题',
								width :650,
								height:500,
							 	content :document.getElementById("themeSetting_wrap")
							 });
							}
						},
						{
							text: "图标设置",
							data: [[{
								text: "大图标",
								func: function() {
									Deskpanel.desktopsContainer.removeClass("desktopSmallIcon");
								}
							}, {
								text: "小图标",
								func: function() {
									Deskpanel.desktopsContainer.addClass("desktopSmallIcon");
								}
							}]]
						}],
						[{
							text:"注销",
							func:function(){
							
							}
						}]
					];
			return MenuData;
		},
		setMenu:function(){
			var MenuData = me.MenuData();
			me.box.smartMenu(MenuData, {
				name: "image"    
			});
		}
	};
}();

//桌面内部面板
Deskpanel = function(me){
	
	var desktopWrapper = "<div id='desktopWrapper'></div>";//最外层容器
	var desktopsContainer = "<div id='desktopsContainer' class='desktopsContainer'	>";
	var desktopContainer = "<div class='desktopContainer' index='{index}' >";
	var desktopAppListener = "<div class='appListContainer' customacceptdrop='{index}' index='{index}' _olddisplay='block' >";//内部监听容器
	var defaultIndex = 0,
		defaultNum = DATA.menu.length,
		defautlSpace ={//默认尺寸
			left:0,
			top:0,
			right:0,
			bottom:120
		}
		
	return me ={
		init:function(ops){
			me.create();
			me.addIcons(ops);
			me.space(defautlSpace);
			me.refresh();
			me.bindEvent();
			me.addCurrnet(defaultIndex);
			return me;
		},		
		create:function(){
			me.box=$(desktopWrapper);//桌面外层面板			
			me.desktopsContainer = $(desktopsContainer);
			me.createDesktopsContainer(defaultNum);	//创建桌面外层容器
			me.box.append(me.desktopsContainer);
			me.box.css({"left": "95px","right": "0px","top":"18px"});
			me.desktopsContainer.css("left",73);
			Desktop.addPanel(me.box);
			me.Icon=[];
		},
		bindEvent:function(){
			//桌面图标拖拽
			me.desktopsContainer.find(".appListContainer").each(function(){
				var desk = $(this);
				var index = desk.attr("index");
				desk.sortable({
					items:".appButton",
					connectWith :".dock_middle",					
					opacity :"0.6",
					start:function(event,ui){
						
					},
					stop: function(event, ui) {							
						var p = ui.item.parent();	
						if(p.hasClass("dock_middle"))ui.item.removeAttr("style");//落在侧边栏																		
						Deskpanel.switchCurrent(index);
						Deskpanel.refreshIcon();	
					}
				}).disableSelection();		
			});
			//浏览器改变刷新
			$(window).resize(me.refresh);
		},			
		createDesktopsContainer:function(n){//桌面外层容器 n创建几层桌面
			if(n&&n!=0){
				for(var i =1;i<=n;i++){			
					me.desktopsContainer.append(me.addContainer(i))//填充容器
				}
			}
		},
		addContainer:function(i){		//添加容器
			var c = me.createDesktopContainer(i);	
			var a = me.createDesktopAppListener(i);
			c.append(a);	
			return c ;
		},	
		createDesktopContainer:function(n){		//容器项
		    return  $(Util.formatmodel(desktopContainer,{"index":n-1}));			
		},
		createDesktopAppListener:function(n){//容器监听项
			return  $(Util.formatmodel(desktopAppListener,{"index":n-1}));
		},		
		addIcons:function(ops){//添加应用
			for(var i in ops){
				var key = i.replace("Icon","");
				me.addIcon(ops[i],key);
			}		
		},	
		addIcon:function(icon,idx){//添加应用 idx 第几桌面
			if(icon){
				if($.isArray(icon)){//传入是数组
					$.each(icon,function(){						
						me.addIcon(this.valueOf(),idx);//添加应用程序
					});
					return me ;
				}
				var Icon = typeof icon=='string'?appIcon_t1(icon):icon;//传入的是ID还是图标对象	
				me.Icon.push(Icon);
				me.box.find("div[customacceptdrop='"+parseInt(idx-1)+"']").append(Icon.box);
			}		
		},
		addCurrnet:function(n){//根据index设置当前桌面样式
			me.desktopsContainer.find(".desktopContainer[index='"+n+"']").addClass("desktop_current");		
		},
		removeCurrent:function(n){//根据index移除当前桌面样式
			me.desktopsContainer.find(".desktopContainer[index='"+n+"']").removeClass("desktop_current");	
		},	
		switchCurrent:function(n){//切换index桌面样式
			var dc = me.desktopsContainer;
			dc.find(".desktopContainer[index='"+n+"']")
			  .addClass("desktop_current")
			  .siblings().removeClass("desktop_current");
		},
		space:function(ops){//设置桌面各面板尺寸位置			
			('top' in ops)&&(typeof ops.top=='string'?me.spaceTop+=ops.top:me.spaceTop=+ops.top||0);
			('left' in ops)&&(typeof ops.left=='string'?me.spaceLeft+=ops.top:me.spaceLeft=+ops.left||0);
			('right' in ops)&&(typeof ops.right=='string'?me.spaceRight+=ops.top:me.spaceRight=+ops.right||0);
			('bottom' in ops)&&(typeof ops.bottom=='string'?me.spaceBottom+=ops.top:me.spaceBottom=+ops.bottom||0);
			return me;			
		},
		refresh:function(){//刷新桌面				
			var ww = $(window).width(),//浏览器宽
				wh = $(window).height();//浏览器高				
			me.width = ww-me.spaceRight -me.spaceLeft;//容器宽
			me.height =wh-me.spaceTop - me.spaceBottom;//容器高 
			var desktopContainer = me.desktopsContainer.find(".desktopContainer");
			var appContainer = desktopContainer.find(".appListContainer");
			
			$(desktopContainer).each(function(i){//容器宽高
				$(this).css({
					left:me.width*i,
					height:me.height-me.spaceBottom
				});
			})
			var a =""
			$("#zoomWallpaperGrid,#zoomWallpaper").width(ww).height(wh);//背景图片div
			
			var r = me.row = ~~(me.height/112);//行数
			
			me.desktopsContainer.css({//设置应用容器样式和位置
				left:me.spaceLeft,
				top:me.spaceTop,
				width:me.width,
				height:me.height		
			});
			
			appContainer.each(function(){
				$(this).css({
					width:me.width,
					height:me.height,
					"margin-left": 28,
					"margin-top": 46,
					display: "block"
				});	
			});
			me.refreshIcon();
		},
		refreshIcon:function(){//刷新应用			
			var r = ~~(me.height/112);
			me.desktopsContainer.find(".appListContainer").each(function(){					
				var icon = $(this).children();
				for(var j= 0 ;j<icon.length;j++){
					var leftI=~~(j/r),
						topI=j%r;				
					$(icon[j]).css({
						left:leftI*142,
						top:topI*112
					});				
				};
			});
		
		},
		moveIconTo:function(icon,idx2){//目标位置
			var ids=(Panel.getIdx(icon.box));
			if(idx>idx2){//往前移
				me.box.children(".appListContainer[index='1']").append(icon.box,idx2);
			}else if(idx<idx2){//往后移
				me.box.children(".appListContainer[index='1']").append(icon.box,idx2+1);
			}
			me.Icon.splice(idx,1);
			me.Icon.splice(idx2,0,icon);
			me.refresh();
		
		},
		removeIcon:function(icon){
			var idx = (Panel.getIdx(icon.box));
			me.Icon.splice(idx,1);
			icon.box.remove();
			me.refresh();
		},
		getIdx:function(ex,ey){
			ex-=me.spaceLeft+me.spaceRight;
			ey-=me.spaceTop+me.spaceBottom;
			return (~~(ex/142))*me.row+(~~(ey/112));
		}
	};
	
	
}();

//侧边栏
Sidebar=function(me){
	
	var tool_list = "<div class='dock_tool_list' id='dockToolList' >";
	var tool_item = "<div class='dock_tool_item'></div>";
	var tool_a ="<a title='{title}' cmd='{cmd}'	class='dock_tool_icon dock_tool_{key}' href='javascript:void(0)'></a>";
	
	//装载容器类
	var SideBox = $.Class({
		init :function(ops){
			this.create(ops.location);
		},
		create:function(location){
			this.box =$("<div id='"+location+"Bar'></div>");	
			Desktop.addPanel(this.box);	
		},
		addPanel:function(sidebar){			
			this.box.append(sidebar.pbox);
		}
	});
	return me ={
		 init : function(ops){
			me.create(ops.location);
			me.addIcon(ops.Icon);
			me.addToolList();
			me.initDrag();

		 },
		 create:function(location){//创建
			//创建上左右 侧边栏容器
			me.leftPanel = SideBox({location:'left'});
			me.rightPanel = SideBox({location:'right'});
			me.topPanel = SideBox({location:'top'});
			
			me.box  = $('<div class="dock_middle"></div>');
			me.pbox = $('<div id="dockContainer" class="dock_container " style="z-index: 10;"> </div>');			
			//创建父边栏容器
			me[location+'Panel'].addPanel(me.pbox);
			me.location = location;
			me.Icon = [];		
			me.pbox.addClass("dock_pos_"+location);
			me.pbox.append(me.box);
			me.leftPanel.box.append(me.pbox);			
			Desktop.addPanel(me.leftPanel.box);
			Desktop.addPanel(me.rightPanel.box);
			Desktop.addPanel(me.topPanel.box);
			me.createStartTool();
			me.createPinyinTool();
			me.createSoundTool();
			me.createSettingTool();
			me.createThemeTool();
		 },
		 addToolList:function(){//添加工具栏
			  var docklist = $(tool_list);
			  var dockItem = $(tool_item);
			  var dockItem2 = $(tool_item);
			  var dockItem3 = $(tool_item);
			  dockItem.append(me.pinyin).append(me.sound);
			  dockItem2.append(me.settingtool).append(me.theme);
			  dockItem3.append(me.start);
			  docklist.append(dockItem).append(dockItem2).append(dockItem3);
			  me.box.append(docklist);		
		 },		 
		 createStartTool:function(){//开始设置
			me.start = $("<a title='点击这里开始' class='dock_tool_icon dock_tool_start'	href='#'></a>");
			
			me.start.click(function(){
				var _this = $(this);
				var position="";
				var offsets = {};
				var p =me.pbox.parent();
				var pid = p.attr("id");
				var key = pid.substring(0,pid.length-3);
				if(key=="left"){
					position = "3-4";
					offsets  = {x:20,y:5};
				}else if(key=="top"){
					position = "3-2";
					offsets  = {x:10,y:20};
				}else{
					position = "4-3";
					offsets  = {x:25,y:2};
				}
				_this.powerFloat({
					width: 185,
					eventType:"click",
					offsets:offsets,
					position:position,
					target: $("#startMenuContainer"), 	 		
					showCall: function(){
					}
			   });
			});
		
		 
		 },
		 createPinyinTool :function(){//输入法
			me.pinyin =$(Util.formatmodel(tool_a,{
				"cmd":"Pinyin",
				"title":"输入法",
				"key":"pinyin"
			}));
		 }, 
		 createSoundTool:function(){//声音设置
			var sound = me.sound= $(Util.formatmodel(tool_a,{
				"cmd":"Sound",
				"title":"静音",
				"key":"sound"
			}));
			sound.toggle(function(){
				$(this).addClass("dock_tool_sound_mute").attr("title","取消静音");	
			
			},function(){
				$(this).removeClass("dock_tool_sound_mute").attr("titile","静音");
			});
		 },
		 createSettingTool:function(){//系统设置
			me.settingtool = $(Util.formatmodel(tool_a,{
				"cmd":"Setting",
				"title":"系统设置",
				"key":"setting"
			}));
		 },
		 createThemeTool:function(){//主题设置				
			 var theme = me.theme= $(Util.formatmodel(tool_a,{
				"cmd":"Theme",
				"title":"主题设置",
				"key":"theme"
			  }));
			  me.bindTheme();
		 },	 
		 bindTheme:function(){
			 var themsSetting = $("#themeSetting_wrap");
			 me.theme.click(function(){
					Windows.openSys({
						id :'themSetting',
						title :'设置主题',
						width :650,
						height:500,
						content :document.getElementById("themeSetting_wrap")
					});
			 });
			 $("a",themsSetting).click(function(){
					var a  = $(this);
					var themeid = a.attr("themeid");
					var src = themeid.substring(themeid.indexOf("_")+1,themeid.length);
					var h = $(window).height();
					var w = $(window).width();
					$("#zoomWallpaper").attr("src","/webos/images/bg/"+src+".jpg").width(w).height(h);
					$("#zoomWallpaperGrid").width(w).height(h);
					$("a",themsSetting).removeClass("themeSetting_selected");
					a.addClass("themeSetting_selected");
			 });
		 
		 }, 
		 addIcon:function(icon,idx){
			if(icon){
				if($.isArray(icon)){//传入的是数组
					$.each(icon,function(){
						me.addIcon(this.valueOf());
					});
					return me;
				}
				if(me.Icon.length==6){
					var last=me.Icon[5];
					me.Icon.length=6;
					$(last.box).remove();
					return;
				}
				
				var Icon=typeof icon=='string'?appIcon_t2(icon):icon;//传入的是程序的fid还是Icon对象
				if(idx!=undefined){
					me.Icon.splice(idx,0,Icon);
					me.box.append(Icon.box,idx);				
				}else{
					me.Icon.push(Icon);
					me.box.append(Icon.box);
				}
			
			
			}
		 },
		 removeIcon:function(icon){
			var idx = (Panel.getIdx(icon.box));
			me.Icon.splice(idx,1);
			$(icon.box).remove();		 
		 },
		 getIdx:function(ex,ey){//获得位置		
			var off =me.pbox.offset();
			switch(me.location){
				case 'top':
					return~~((ex-off.left)/142);
				case 'left':
				case 'right':
					return~~((ey-off.top)/112);
			}
		 },
		 addStyle:function(){//添加拖拽后的样式
			me.pbox.removeClass().addClass("dock_container dock_pos_"+me.location);
			switch(me.location){
				case "top":					
					me.topPanel.box.css({"width":"100%","height":"73px"}).show();
					me.leftPanel.box.css({"width":"0","height":"0"}).hide();
					me.rightPanel.box.css({"width":"0%","height":"0"}).hide();
					Deskpanel.box.css({"left":0,"right": 0});
					Deskpanel.desktopsContainer.css("top",73);
					break;
				case "left":
					me.leftPanel.box.css({"width": "73px","height":"100%"}).show();
					me.topPanel.box.css({"width":"0","height":"0"}).hide();					
					me.rightPanel.box.css({"width":"0%","height":"0"}).hide();
					Deskpanel.box.css({"left": "73px","right": "0px"});
					Deskpanel.desktopsContainer.css("left",73);
					break;					
				case "right":
					me.rightPanel.box.css({"width": "73px","height":"100%"}).show();	
					me.leftPanel.box.css({"width": "0","height":"0"}).hide();
					me.topPanel.box.css({"width":"0","height":"0"}).hide();	
					Deskpanel.box.css({"left":0,"right":73});
					Deskpanel.desktopsContainer.css("top",0);
				break;
			}
		 
		 },
		 initDrag:function(){//绑定元素拖拽
			var  desk =Deskpanel.desktopsContainer.find(".appListContainer");
			
			me.box.sortable({
				connectWith: desk,
				items:".appButton",
				opacity :"0.6",	
				scroll :true,
				start:function(event,ui){
					
				},
				stop:function(event,ui){
					
					var item = ui.item;
					var p = item.parent();
					if(p.hasClass("appListContainer")){
						item.css("position","absolute");
					}
					Deskpanel.refreshIcon();
					
				}
				
			}).disableSelection();
		 }
		 	
	}

}();

//初始化菜单
function init_dock(){
	$('#dock').Fisheye({
		maxWidth: 80,
		items: 'a',
		itemsText: 'span',
		container: '.dock-container',
		itemWidth: 40,
		proximity: 90,
		halign : 'center'
	})
}

//导航栏
Navbar =function(me){
	var data = DATA.menu;
	var menu ="";
	for(var i = 0;i<data.length; i++){
		menu+="<a class=\"dock-item\" href=\"#\" id=\"desk_"+(i+1)+"\" name=\"desk_"+(i+1)+"\">"+
			"<img src=\""+data[i].icon+"\" /><span>"+data[i].name+"</span></a>";
	}
	var _box = "<div id='dock' class='dock'><div class='dock-container'>"+ menu +"</div></div>";
	
	return me = {
		init :function(){
			me.create();			
			me.bindEvent();//绑定导航按钮单击事件  
			me.setPosition();
			me.changeStyle();//初始化选中的桌面样式
		},
		bindEvent:function(){
			$("#dock a").click(function (){
				var page = $(this).attr("name");
				var _this = $(this);
				var index = parseInt(page.replace("desk_",""));
				me.bindSwitchDesktopAnimate(index,thisPage);//切换桌面
				NavbarStyle(_this);//切换样式
			});
		},
		bindSwitchDesktopAnimate:function(t,c){//切换动画事件 t 目标桌面  c当前桌面
			if(t==c){//目标页数与当前页数相同时返回
				return;
			}
			var left = 0;
			var c = parseInt(c-1);
			if(t<c){//往左移动
				left = -2000;
			}else{//往右移动
				left = 2000;
			}			
			var cdesk=Deskpanel.desktopsContainer.find(".desktopContainer[index="+(thisPage-1)+"]");
				cdesk.removeClass("desktop_current");
				cdesk.stop().animate({
					left: left
				}, 'normal', function(){
					
				});	
			var idesk =Deskpanel.desktopsContainer.find(".desktopContainer[index="+(t-1)+"]");
			idesk.removeClass("desktop_current").addClass("desktop_current");
			idesk.stop().animate({
					left:0
				 }, 'normal', function(){
					
				});
			thisPage = t;
		},
		create:function(){//创建导航
			me.box = $(_box);
			Desktop.addPanel(me.box);
			init_dock();
		},
		setPosition :function(){//设置位置
			var ww = $(window).width();
			var mw = me.box.width();
			me.box.css("left",parseInt(ww/2)-parseInt(mw/2));
		},
		changeStyle:function(){//初始化选中的桌面样式
			var img = $("#desk_"+thisPage).children("img").attr("src");
			var png = img.substring(img.length-4,img.length);
			img = img.substring(0,img.length-4);
			img = img +"_thisMenu"+ png;
			$("#desk_"+thisPage).children("img").attr("src",img);
		}
	}
}();
//其他面板
ElsePanel = function(me){
	var mome ='<div id="mome"><div class="infotitl"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="164px" height="164px" name="" id="bd_swf_clock"><param name="movie" value="http://sc.xvna.com/UploadFiles/sc/2009/5/17/swf/200905171036219710.swf"><param name="FlashVars" value=""><param name="menu" value="false"><param name="wmode" value="opaque"><param name="allowfullscreen" value="false"><param name="allowscriptaccess" value="always"><embed id="bd_swf_clock_ff" flashvars="" src="http://sc.xvna.com/UploadFiles/sc/2009/5/17/swf/200905171036219710.swf" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="164px" height="164px" menu="false" allowfullscreen="false" allowscriptaccess="always" name="flashResult" wmode="transparent"></object></div></div>';
	var inform="<div id=\"inform\"><div class=\"infotitl\">通知</div></div>";
	var _msgBox = "<div id=\"msg\"><div id=\"msg_close\"><a href=\"#\">关闭</a></div></div>";
	return ep = {
		init:function(){
			ep.create();
			ep.bindEvent();
		},
		create:function(){
			Desktop.addPanel(mome);
			//注释了通知框Desktop.addPanel(inform);
			//右下角弹出消息框
			Desktop.addPanel(_msgBox);
		},
		bindEvent:function(){
			$("#mome").draggable({containment:"#desktop",start:function(){
				var zindex = $("#inform").css("z-index");
				var z = parseInt(zindex)+1;
				$("#mome").css({"z-index":z});
			}});
			$("#inform").draggable({containment:"#desktop",start:function(){
				var zindex = $("#mome").css("z-index");
				var z = parseInt(zindex)+1;
				$("#inform").css({"z-index":z});
			}});
			$("#mome").click(function (){
				var zindex = $("#inform").css("z-index");
				var z = parseInt(zindex)+1;
				$("#mome").css({"z-index":z});
			});
			$("#inform").click(function (){
				var zindex = $("#mome").css("z-index");
				var z = parseInt(zindex)+1;
				$("#inform").css({"z-index":z});
			});
			$("#msg_close a").click(function(){
				$("#msg").slideUp();
			});
		}
	}
}();

//初始化分页箭头
Arrows = function(){
	var arrows_l = "<div id='arrows_l' class='arrows'><img src='/webos/images/arrows_l_3.png' /></div>";
	var arrows_r = "<div id='arrows_r' class='arrows'><img src='/webos/images/arrows_r_1.png' /></div>";
	return arrows = {
		init:function(){
			arrows.create();
			arrows.setPosition();
			arrows.bindEvent();
		},
		bindEvent:function(){
			mouseStyle();
			$("#arrows_l").click(function (){
				if(thisPage==1){
					return;
				}else{
					var t = parseInt(thisPage)-1;
					arrows.changeStyle(t,thisPage);
					arrows.bindSwitchDesktopAnimate(t,thisPage);
				}
			});
			$("#arrows_r").click(function (){
				if(thisPage==DATA.menu.length){
					return;
				}else{
					var t = parseInt(thisPage)+1;
					arrows.changeStyle(t,thisPage);
					arrows.bindSwitchDesktopAnimate(t,thisPage);
				}
			});
		},
		bindSwitchDesktopAnimate:function(t,c){
			var left = 0;
			var c = parseInt(c-1);
			if(t<c){//往左移动
				left = -2000;
			}else{//往右移动
				left = 2000;
			}			
			var cdesk=Deskpanel.desktopsContainer.find(".desktopContainer[index="+(thisPage-1)+"]");
				cdesk.removeClass("desktop_current");
				cdesk.stop().animate({
					left: left
				}, 'slow', function(){
							
				});	
			var idesk =Deskpanel.desktopsContainer.find(".desktopContainer[index="+(t-1)+"]");
			idesk.removeClass("desktop_current").addClass("desktop_current");
			idesk.stop().animate({
					left:0
				 }, 'slow', function(){
					
			});
			thisPage = t;
		},
		create : function (){
			Desktop.addPanel(arrows_l);
			Desktop.addPanel(arrows_r);
		},
		setPosition:function (){
			var wh = $(window).height();
			var ah = 112/2;
			$("#arrows_l").css({"top":((wh*0.382)-ah)+"px","left":"80px"});
			$("#arrows_r").css({"top":((wh*0.382)-ah)+"px","right":"80px"});
		},
		changeStyle:function(t,c){
			//还原原来的icon
			var img = $("#desk_"+c).children("img").attr("src");
			img = img.replace("_thisMenu","");
			$("#desk_"+c).children("img").attr("src",img);
			//切换后的icon
			var this_img = $("#desk_"+t).children("img").attr("src");
			var png = this_img.substring(this_img.length-4,this_img.length);
			this_img = this_img.substring(0,this_img.length-4);
			this_img = this_img +"_thisMenu"+ png;
			$("#desk_"+t).children("img").attr("src",this_img);
			if(t>1 && t<DATA.menu.length){
				$("#arrows_l img").attr("src","/webos/images/arrows_l_1.png");
				$("#arrows_r img").attr("src","/webos/images/arrows_r_1.png");
			}
			if(t==1){
				$("#arrows_l img").attr("src","/webos/images/arrows_l_3.png");
				$("#arrows_r img").attr("src","/webos/images/arrows_r_1.png");
			}
			if(t==DATA.menu.length){
				$("#arrows_l img").attr("src","/webos/images/arrows_l_1.png");
				$("#arrows_r img").attr("src","/webos/images/arrows_r_3.png");
			}
		}
	}
}();

//拖拽效果容器
dockEffectBox = function(me){
	var _tbox ="<div id='docktop' class='dock_drap_effect dock_drap_effect_top ' style='display: none;' _olddisplay='block'></div>";
	var _lbox ="<div id='dockleft' class='dock_drap_effect dock_drap_effect_left' style='display: none;'></div>";
	var _rbox ="<div id='dockright' class='dock_drap_effect dock_drap_effect_right' style='display: none;'></div>";
	var	_proxybox ="<div class='dock_drap_proxy' style='display: none; left: -79px; top: -260px;'></div>";
	var	_maskbox="<div id='dockmask' class='dock_drap_mask' style='display: none;'>"+
					"<div class='dock_drop_region_top' cmd='region'name='top'></div>"+
					"<div class='dock_drop_region_left' cmd='region' name='left'></div>"+
					"<div class='dock_drop_region_right' cmd='region' name='right'></div>"+
				"</div>";
	return me = {		 
		 init : function(){
			me.create();
		 },
		 create :function(){		
		 	me.tbox = $(_tbox);
			me.lbox = $(_lbox);
			me.rbox = $(_rbox);
			me.proxybox = $(_proxybox);
			me.maskbox = $(_maskbox);
			me.addDesktop();
		 },
		 addDesktop :function(){
			Desktop.addPanel(me.tbox);
			Desktop.addPanel(me.lbox);
			Desktop.addPanel(me.rbox);
			Desktop.addPanel(me.proxybox);
			Desktop.addPanel(me.maskbox);
		 },
		 show:function(){
			me.tbox.show();
			me.lbox.show();
			me.rbox.show();
			me.maskbox.show();
		 },
		 hide:function(){
			me.tbox.hide();
			me.lbox.hide();
			me.rbox.hide();
			me.maskbox.hide();
		 }
	
	}
}();
//底部文件夹菜单
Filelist = function(){
	var _folder = "<div id=\"folder\"><a href=\"#\">"+
   		"<div id=\"folder_content\">"+
			"<div id=\"min_icon_folder\">"+
            	"<img width=\"32\" height=\"32\" border=\"0\" src=\"/webos/icon/min/folder_o.png\" />"+
        	"</div>"+
      		"<div id=\"min_font_folder\">文件夹</div>"+
    	"</div>"+
    "</a></div>";
	
	var _sonfolder = "<div id=\"filelist\" class=\"filelist\"></div>";
	
	return file = {
		init:function(){
			file.create();
			file.bindStyle();
			file.bindEvent();
		},
		create:function(){
			Desktop.addPanel(_folder);
			Desktop.addPanel(_sonfolder);
		},
		bindEvent:function(){//加载事件
			$("#folder a").powerFloat({//初始化
				width:112,
				eventType:"click",
				targetMode:null,
				target: $("#filelist"),
				showCall:function(){
					
				}
			});
		},
		bindStyle:function(){
			$("#folder").mouseenter(function(){
				$("#folder").css({"background-image": "url(/webos/images/bg_task_group_t_over.png)"});
			});
			$("#folder").mouseleave(function(){
				$("#folder").css({"background-image": "url(/webos/images/bg_task_group_t_msg.png)"});
			});
			
		}
	}
}();


//底部栏容器类
BottomBar = function(me){
	
	var _box = "<div id='bottomBar' class='bottomBar' style='z-index: 12;'></div>";	
	var _NextBox = "<div id='taskNextBox' class='taskNextBox' _olddisplay='' style='display: none;'><a id='taskNext' class='taskNext' hidefocus='true' href='#'></a></div>";
	var _PreBox = "<div id='taskPreBox' class='taskPreBox' _olddisplay='' style='display: none;'><a id='taskPre' class='taskPre' hidefocus='true' href='#'></a></div>";
	var _taskContainner = "<div id='taskContainer' class='taskContainer' style=''></div>";
	var bottonbarbg = "<div class='bottomBarBg'></div>";
	var bottomBarBgTask = "<div class='bottomBarBgTask'></div>";
	
	return me  = {
		init:function(){
			me.create();
			Desktop.addPanel(me.box);
			Desktop.addPanel(bottonbarbg);
			Desktop.addPanel(bottomBarBgTask);			
		},
		create:function(){
			var box =me.box = $(_box);
			me.innerbox = $("<div id='taskContainerInner' class='taskContainerInner' style=''></div>");
			me.taskContainner = $(_taskContainner);
			me.taskContainner.append(me.innerbox);
			box.append(_NextBox);
			box.append(me.taskContainner);
			box.append(_PreBox);			
		},
		addItem:function(item){//像底部任务栏添加任务项
			me.innerbox.append(item);
			var len = me.innerbox.children().length;
			var id = item.attr("id");
			var w = item.width()*len+20;
			me.taskContainner.width(w);
			me.innerbox.css({"margin-right": 0,"width":(w)});	
			me.setCurrent(id);
		},
		getItem:function(id){//根据ID查询底部任务栏
			return me.innerbox.find("a[tid='"+id+"']");
		},
		getItemNum:function(){//得到当前任务数
			return me.innerbox.children().size();
		},
		setCurrent:function(id){			
			me.addCurrent(id);
			me.removeItemSibling(id);		
		},		
		addCurrent:function(id){//设置当前任务栏样式			
			me.innerbox
			.find("#"+id)
			.addClass("taskCurrent");				
		},
		removeItemSibling:function(id){//移除当前任务同类样式
			me.innerbox
			.find("#"+id)
			.siblings()
			.removeClass("taskCurrent");		
		},
		getALLItemID :function(){//得到当前任务栏所有任务ID
			var items = me.innerbox.children();
			var idArray =[];
			items.each(function(){
				var id =$(this).attr("id");
				id  =id.substring(id.lastIndexOf("_")+1,id.length);			
				idArray.push(id);
			})
			return idArray ; 
		}
		
	}

}();

//任务类
Task = $.Class({
	init :function(op){
		this.create(op);
		this.rightMenu();
	},
	create:function(op)	{
		var task =$("<div>", {
		  "class": "taskGroup taskGroupAnaWidth",
		  id: "taskGroup_"+op.id+"_"+op.id
		});
		var taskItemIcon = $("<div>",{
			"class":"taskItemIcon"
		});
		$("<img src='"+op.icon+"' width='32' height='32' /><div class='taskItemIconState'></div>").appendTo(taskItemIcon);//图片路径---------------------------------
		var taskItemTxt  = $("<div>",{
			"class":"taskItemTxt",
			text : op.title
		});
		var taskItemBox  = $("<div>",{
			"class":"taskItemBox"
		});			
		var taskA =$("<a>",{
			"class":"taskItem fistTaskItem",
			"href" :"#",
			id: "taskItem_"+op.id,
			"title" :op.title,
			"tid" :op.id,
			"appid":op.id+"_"+op.id
		});
		taskA.append(taskItemIcon).append(taskItemTxt);
		taskItemBox.append(taskA);
		task.append(taskItemBox);
		this.box = task ;
	},
	rightMenu:function(){
		var taskmenu = [
			 [{
				text:"显示桌面",
				func:function(){
					Windows.showWindowDesk();
				}
			}],
			 [{
				text:"关闭全部",
				func:function(){
					Windows.closeAllWindow();
				}
			}],
			[{
				text:"关闭其他",
				func:function(){
					var id = $(this).attr("id");
					wid  =id.substring(id.lastIndexOf("_")+1,id.length);
					Windows.closeElseWindow(wid);
				}
			 }],
			[{
				text:"关闭",
				func:function(){
					var id = $(this).attr("id");
					wid  =id.substring(id.lastIndexOf("_")+1,id.length);		
					art.dialog.list[wid].close();
					$("#"+id).remove();
				}
			}]
		]
		this.box.smartMenu(taskmenu, {
			name: "taskmenu"  