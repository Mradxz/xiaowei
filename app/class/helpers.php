<?php

/**
 * api 返回统一接口数据
 * @param  [type]  $result     boolean
 * @param  [type]  $content    result:true 自定义的数据结构 result:false 错误消息内容
 * @param  integer $error_code 错误码 默认 1000 按需设置
 * @return [type]              返回数据
 */
function result($result, $content=null, $error_code=1000)
{
	$result = !!$result;
	if($result){
		if(!is_array($content))
			$content = ['data'=>$content];
		return array_merge([
				'result' => $result,
			], array_except($content, ['result']));
	}
	return [
		'result' => $result,
		'message' => $content,
		'error_code' => $error_code,
	];
}