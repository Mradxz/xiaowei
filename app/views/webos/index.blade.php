<!DOCTYPE html>
<html>
	<head>
		<title>蜂巢云站群</title>
		<meta name="Keywords" content="" />
		<meta name="description" content="" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link href="/webos/css/jquery-ui-1.8.24.custom.css" rel="stylesheet" type="text/css"/>
		<link href="/webos/css/main.css" rel="stylesheet" type="text/css" />
		<link href="/webos/css/themesetting.css" rel="stylesheet"  type="text/css" >
		<link href="/webos/css/powerFloat.css" rel="stylesheet" type="text/css"/>
		<link href="/webos/css/smartMenu.css" rel="stylesheet"  type="text/css" />
        <link href="/webos/css/style.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="/webos/js/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="/webos/js/jquery-powerFloat-min.js"></script>
		<script type="text/javascript" src="/webos/js/jquery-smartMenu-min.js"></script>
		<script type="text/javascript" src="/webos/js/jquery-class.js"></script>
		<script type="text/javascript" src="/webos/js/artDialog.js?skin=black"></script>
		<script type="text/javascript" src="/webos/js/iframeTools.js"></script>
        <script type="text/javascript" src="/webos/js/jquery-ui-1.8.24.custom.min.js"></script>
        <script type="text/javascript" src="/webos/js/interface.js"></script>
		<script type="text/javascript" src="/webos/js/data.js"></script>
		<script>
		/*
			jQuery.ajax({
				url: '/app/data',
				async: false,
				success:function(data){
					var result = data;
					DATA.app=result;
					console.log(result);
				},
				cache:false
			});
		*/
			DATA.app.addapp = {
				appid:'addapp',
				type:'app',
				icon:'addapp.png',
				name:'添加应用',
				url:'/appMain',
				sonMenu:"[]",
			}
		</script>
		<script type="text/javascript" src="/webos/js/bsv1.3-core.js">
		</script>
        <!--[if lt IE 7]>
 			<style type="text/css">
 				div, img{behavior:url(/webos/js/iepngfix.htc) }
 			</style>
		<![endif]-->
		<script>

		</script>
	</head>
	<body>
		<div id="themeSetting_wrap" style="display:none;">
				<div id="themeSetting_head" class="themeSetting_head">
					<div id="themeSetting_tabTheme" class="themeSetting_tab current" style="display: block;">系统主题</div>
				</div>
				<div id="themeSetting_body" class="themeSetting_body">
					<div id="themeSetting_area"  class="themeSetting_area" style="display: block;">
					<a href="###" themeid="theme_blue" class="themeSetting_settingButton" id="themeSetting_theme_blue">
						<div style="background: url(/webos/images/bg/blue.jpg) no-repeat;" class="themeSetting_settingButton_icon"></div>
						<div class="themeSetting_settingButton_text">梦幻光影</div>
					</a>
					</div>
					<div id="themeSetting_wallpaper" class="themeSetting_wallpaper" style="display: none;"></div>
				</div>
		</div>
		<div id="zoomWallpaperGrid" class="zoomWallpaperGrid" style="position: absolute; z-index: -10; left: 0pt; top: 0pt; overflow: hidden; height: 381px; width: 1440px;">
			<img id="zoomWallpaper" class="zoomWallpaper" style="position: absolute; top: 0pt; left: 0pt; height: 381px; width: 1440px;" src="http://9.web.qstatic.com/webqqpic/style/wallpaper/wood2.jpg"><!--http://www.jq-school.com/upload/bg/blue_glow.jpg-->
		</div>
		<div class="taskbar_start_menu_container" id="startMenuContainer" _olddisplay="block" style="display: none;">
			<div class="startMenuImg taskbar_start_menu_body" id="taskbar_start_menu_body">
			<div uin="0" class="taskbar_start_menu_selfinfo" id="startMenuSelfInfo">
				<div class="taskbar_start_menu_nick" id="startMenuSelfNick">请&nbsp;<a href="#">登录</a></div>
				<a title="反馈" href="###" class="startMenuImg startMenuTopControl_support" cmd="support">&nbsp;</a>
				<a title="锁定" href="###" class="startMenuImg startMenuTopControl_lock" cmd="lock">&nbsp;</a>
			</div>
			<ul class="taskbar_start_menu">
				<li cmd="favorite">
					<a title="添加到收藏夹" href="###">添加到收藏夹</a>
				</li>
				<li cmd="shortcut">
				<a title="保存桌面快捷方式" target="_blank" href="###">保存桌面快捷方式</a></li>
				<li cmd="download">
					<a title="下载客户端" href="###">下载客户端</a></li>
					<li title="关于蜂巢云站群" cmd="about" id="taskbar_helpButton">
					<a href="###">关于蜂巢云站群</a>
				</li>
				<li cmd="helper">
					<a title="新手指导" href="###">新手指导</a>
				</li></ul>
				<a class="startMenuImg logout_botton" title="注销当前用户" cmd="logout" href="###"></a>
				</div>
		</div>


<!--打开框-->

<!--文件夹-->
<style>

.perfect_nine_context {
	background: url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) center -35px;
	border: 0;
}

.scrollBar {
	position:absolute;
	right:7px;
	top:0;
	width:7px;
	height:20px;
	-moz-border-radius:6px;
	-khtml-border-radius:6px;
	-webkit-border-radius:6px;
	border-radius:6px;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/scrollbar_bgy.png) repeat-y scroll center center transparent;
	display:none;
	z-index:10
}

.scrollBar_bgc {
	position:absolute;
	right:8px;
	top:0;
	width:5px;
	-moz-border-radius:5px;
	-khtml-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
	height:100%;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/scrollbar_bg.png) repeat-y scroll center center transparent
}

.scrollBar_bg_t {
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/scrollbar_bgy.png) no-repeat scroll center top transparent;
	height:7px;
	overflow:hidden;
	top:-7px;
	width:7px
}
.scrollBar_bg_b {
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/scrollbar_bgy.png) no-repeat scroll center bottom transparent;
	height:7px;
	overflow:hidden;
	bottom:-7px;
	width:7px
}

.perfect_nine_box .appButton_delete {
	display:none;
}

.quick_view_container {
	position:absolute;
	width:335px
}
.quick_view_container_control {
	overflow:hidden
}
.quick_view_container_list {
	margin-top:2px;
	width:100%;
	position:relative;
	overflow:hidden
}
.quick_view_container_list_in {
	width:100%;
	text-align:center;
	color:#fff;
	overflow-y:hidden
}
.quick_view_container_list_in .appButton {
	margin:5px 8px;
	width:60px;
	height:60px
}
.quick_view_container_list_in .appButton_smallIcon {
	margin:8px
}
.quick_view_container_list_in .appButton_appIcon {
	margin:5px auto 1px;
	width:32px;
	height:32px
}
.quick_view_container_list_in .appButton_appIcon_warp {
	background-image:url(http://0.web.qstatic.com/webqqpic/style/images/iconbg_3.png)
}

.quick_view_container_list_in .appButton_appName {
	margin:0;
	padding:0 5px
}

.quick_view_container_open {
	float:right;
	display:block;
	width:40px;
	padding:2px 0 0 22px;
	height:22px;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/open.png) -80px 0 no-repeat;
	color:#fff;
	position:relative
}

.quick_view_container_open:hover {
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/open.png) no-repeat
}

.quick_view_container .perfect_nine_top {
	font-size:0
}
.quick_view_container .perfect_nine_t_l,.quick_view_container .perfect_nine_t_r {
	font-size:0;
	line-height:0;
	overflow:hidden
}
.quick_view_container .perfect_nine_t_l {
	float:left;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) left top
}
.quick_view_container .perfect_nine_t_r {
	float:right;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) right top
}
.quick_view_container .perfect_nine_t_m {
	font-size:0;
	width:100%;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) center top;
	line-height:0;
	overflow:hidden
}

.quick_view_container .perfect_nine_middle {
	overflow:hidden;
	zoom:1
}
.quick_view_container .perfect_nine_m_l {
	position:relative;
	float:left;
	background:0
}
.quick_view_container .perfect_nine_m_r {
	float:right;
	background:0;
	position:relative
}
.quick_view_container .perfect_nine_m_l_t {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) left -35px;
	width:100%
}
.quick_view_container .perfect_nine_m_l_m {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) 0 -14px;
	width:100%
}
.quick_view_container .perfect_nine_m_l_b {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) left -35px;
	width:100%
}
.quick_view_container .perfect_nine_m_r_t {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) right -35px;
	width:100%
}
.quick_view_container .perfect_nine_m_r_m {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) right -14px;
	width:100%
}
.quick_view_container .perfect_nine_m_r_b {
	position:absolute;
	font-size:0;
	line-height:0;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) right -35px;
	width:100%
}


.quick_view_container .perfect_nine_b_m {
	zoom:1
}

.quick_view_container .perfect_nine_b_m_m {
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) center bottom;
	font-size:0;
	line-height:0;
	overflow:hidden
}

.quick_view_container .perfect_nine_b_l,.quick_view_container .perfect_nine_b_r {
	font-size:0;
	font-size:0;
	line-height:0;
	overflow:hidden
}
.quick_view_container .perfect_nine_b_l {
	float:left;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) left bottom
}
.quick_view_container .perfect_nine_b_r {
	float:right;
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) right bottom
}
.quick_view_container .perfect_nine_context {
	background:url(http://8.web.qstatic.com/webqqpic/module/explorer/images/quick_view.png) center -35px;
	border:0
}
</style>

<script>

function dialog(url,id){
	var dialog = art.dialog({
		id : id,
		width:900,
		padding:0,
		/*lock : true,*/
		opacity:0.3
	});
	$.ajax({
		url: url,
		async: false,
		success:function(data) {
			dialog.content(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$.dialog.alert('请求出错！');
		},
		cache:false
	}).done(function(responseText){
		if(responseText.error == true){
			$.dialog.alert(responseText.msg);
			dialog.close();
		}
	});
}

</script>

	</body>
</html>