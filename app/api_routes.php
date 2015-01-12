<?php

// 非验证方法
Route::api(['version' => 'v1', 'before' => 'api.logs', "prefix" => "api/app", 'namespace'=>'api\app\v1'], function () 
{
	// 不验证方法
	Route::group([], function ()
	{
        Route::post('users/login', 'UsersController@login');
        Route::post('users/register', 'UsersController@register');
    });
	// 验证方法
	Route::group(['before'=>'auth.app'], function ()
	{
        Route::post('users/current', 'UsersController@current');
    });
});
