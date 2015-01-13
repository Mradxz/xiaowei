<?php namespace api\app\v1;
use Input, User, Sentry, Session;
class UsersController extends \BaseController {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function current()
	{
		$user = Sentry::getUser();
		return result(true, compact('user'));
	}
	/**
	 * 登录
	 * @return [type] [description]
	 */
	public function login()
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
	    // 重置 Session ID
	    Session::setId(null);

		$user = Sentry::authenticate($credentials, false);
		$access_token = Session::getId();
		return result(true, compact('access_token'));
	}
	/**
	 * 注册
	 * @return [type] [description]
	 */
	public function register()
	{
		$user = Sentry::createUser(array(
	        'email'     => Input::get('email',''),
	        'password'  => Input::get('password',''),
	        'activated' => true,
	    ));
	    // Find the group using the group id
	    // id:2 为普通用户组
	    $group = Sentry::findGroupById(1);
	    // Assign the group to the user
	    $user->addGroup($group);
	    return $this->login();
	}
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}
	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}
	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}
}