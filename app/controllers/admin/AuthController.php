<?php
namespace App\Controllers\Admin;
use Auth, BaseController, Form, Input, Redirect, Sentry, View;
class AuthController extends BaseController {

  /**
   * 显示登录页面
   * @return View
   */
  public function getLogin()
  {
    return View::make('admin.auth.login');
  }

  /**
   * POST 登录验证
   * @return Redirect
   */
  public function postLogin()
  {
    try
    {
		$this->validator(
			array(
				'email'=>'email|required',
				'password'=>'required'
			),
			array(
				'email'=>'账号是邮箱地址',
				'email.required' => '账号不能为空',
				'password.required' => '密码不能为空'
			)
		);
		$credentials = Input::only('email','password');
		$user = Sentry::authenticate($credentials, false);
		if ($user->hasAccess('admin'))
		{
			return Redirect::route('admin.webos');
		}
    }
    catch(\Exception $e)
    {
    	$info = str2Msg($e->getMessage(),
    			array(
    				"suspended"=>"账号被锁定请过一段时间再试",
    				"not match"=>"账号或者密码错误",
    				"could not be found with a login value"=>"账号或者密码错误",
    			)
    		);
     	return Redirect::route('admin.login')->withErrors(array('login' => $info));
    }
  }

  /**
   * 注销
   * @return Redirect
   */
  public function getLogout()
  {
    Sentry::logout();
    return Redirect::route('admin.login');
  }
}