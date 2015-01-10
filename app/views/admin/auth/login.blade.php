<!doctype html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <title>用户登录</title>
<style type="text/css">
body {
margin: 0;
padding: 0;
background: #f6f6f6;
}
.signin {width: 360px;margin: 0 auto;float: none;padding: 0;}
.signin .signin-area {
padding: 1px 17px;
margin: 0 0 0 40px;
}
.signin .signin-area-bg {float: left;width: 296px;}
.signin .signin-area-bg .padder {
margin: 8px 0 0;
}
.signin .signin-area-bg .padder .sign-input {
margin: 14px 0 0 0;
}
.signin .signin-area-bg .padder span.title {
width: 60px;
height: 20px;
margin-right: 5px;
_margin-top: 2px;
text-indent: -999em;
float: left;
background: url("{{asset('statics/images/admin/login_btn.png')}}") no-repeat;
}
.signin .signin-area-bg .padder span.account {
background-position: 0 -36px;
}
.signin .signin-area-bg .padder span.password {
background-position: -60px -36px;
}
.signin .signin-area-bg .padder span.input {
display: block;
}
.signin .signin-area-bg .padder .input01 {
width: 170px;
border: 1px #ccc solid;
color: #868686;
font-size: 16px;
padding: 2px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
-khtml-border-radius: 10px;
-border-radius: 10px;
outline: 0;
}
.middle-padder {
width: 280px;
}
.signin .middle-padder {
float: left;
padding: 15px 0 0 0px;
}
.signin .logins .signup-btn {
background: url("{{asset('statics/images/admin/login_btn.png')}}") no-repeat 0 0;
width: 111px;
height: 36px;
display: block;
border: 0;
text-align: center;
line-height: 20px;
color: #0c4e7c;
cursor: pointer;
outline: 0;
float: left;
}
.signin .logins .signin-btn {
background: url("{{asset('statics/images/admin/login_btn.png')}}") no-repeat -111px 0;
width: 111px;
height: 36px;
border: 0;
text-align: center;
line-height: 20px;
color: #0c4e7c;
cursor: pointer;
margin-left: 14px;
}
</style>
</head>
<body>
<div class="signin">
{{ Form::open() }}
    <div class="signin-area">
      <div class="signin-area-bg">
        <div class="padder">
@if ($errors->has('login'))
<div class="alert alert-error">{{ $errors->first('login', ':message') }}</div>
@endif
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