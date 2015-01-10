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
    $credentials = array(
      'email'    => Input::get('email'),
      'password' => Input::get('password')
    );

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
		$user = Sentry::authenticate($credentials, false);
		if ($user->hasAccess('admin'))
		{
			return Redirect::route('admin.webos');
		}
    }
    catch(\Exception $e)
    {
      return Redirect::route('admin.login')->withErrors(array('login' => $e->getMessage()));
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