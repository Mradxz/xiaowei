<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	protected function validator(array $rules,array $messages=array()){
		#获取表单的数据
		$data = Input::only(array_keys($rules));
		#验证数据
		$validator = Validator::make($data,$rules,$messages);
		if($validator->fails()) throw new Exception($validator->errors()->first());
	}
}
