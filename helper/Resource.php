<?php
class Resource {



	/*
	 * 拼接css链接
	 * */
	public static function addCssFiles($list) {
		
	}

	/*
	 * 生成css资源标签
	 * */
	public static function tagCss($irl) {
		return '	<link rel="stylesheet" type="text/css" href="' . $url . '" />' . "\n";
	}

}
?>
