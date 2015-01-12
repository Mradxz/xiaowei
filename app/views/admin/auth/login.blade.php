<!doctype html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <title>用户登录</title>
<link href="{{asset('statics/css/admin_login.css')}}" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="http://libs.useso.com/js/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="{{asset('statics/js/jq-center.js')}}"></script>
<script type="text/javascript">
$(function(){ 
	$(".signin").center({top:'33%'});
});
</script>
@if ($errors->has('login'))
<link rel="stylesheet" type="text/css" href="http://aui.github.io/artDialog/css/ui-dialog.css">
<script type="text/javascript" src="http://aui.github.io/artDialog/dist/dialog-plus.js"></script>
<script type="text/javascript">
$(function(){ 
	var d = dialog({
	    content: '{{ $errors->first('login', ':message') }}'
	});
	d.show();
	setTimeout(function () {
	    d.close().remove();
	}, 2000);
});
</script>
@endif
</head>
<body>
<div class="signin">
{{ Form::open() }}
    <div class="signin-area">
      <div class="signin-area-bg">
        <div class="padder">

          <div class="sign-input">
            <span class="title account">帐　号：</span>
            <span class="input">
              <input name="email" autocomplete="on" type="text" class="input01" placeholder="Email帐号" >
            </span>
          </div>
          <div class="sign-input">
            <span class="title password">密　码：</span>
            <span class="input">
              <input type="password" name="password" class="input01">
            </span>
          </div>
        </div>
        <div class="middle-padder">
          <div class="logins">
            <a class="signup-btn" tabindex="5" href="javascript:;" target="_blank" title="注册新用户"></a>
            <input type="submit" class="signin-btn" value="" tabindex="6" id="login_button">
          </div>
        </div>
      </div>
    </div>
{{ Form::close() }}
</div>
</body>
</html>