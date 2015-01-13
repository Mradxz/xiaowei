<?php

App::error(function(Exception $exception, $code)
{
	Log::error($exception);
	if(Request::isJson() || strpos(Input::header('accept'), 'json') || true)
	{
    	$info = str2Msg($exception->getMessage(),
			array(
				"suspended"=>"账号被锁定请过一段时间再试",
				"not match"=>"账号或者密码错误",
				"could not be found with a login value"=>"账号或者密码错误",
			)
		);
		return result(false, $info, $code);
	}
});

App::missing(function($exception)
{
    // return Response::view('errors.missing', array(), 404);
});