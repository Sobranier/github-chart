<!DOCTYPE html>
<html>
<head lang="en">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="keywords" content="yanweiqing,html,php,js">

	<title><?php
		if (isset($fullTitle)) {
			echo $fullTitle;
		} else if (isset($title)) {
			echo 'Sobranie | ', $title;
		} else {
			echo 'Sobranie | 严伟庆';
		}
	?></title>
<?php
//判断是否有css文件，一般情况下默认加载base
	if ($title === "HOME") {
		echo '<link rel="shortcut icon" href="./style/img/bitbug_favicon.ico" type="image/x-icon">';
		echo '<link rel="stylesheet" href="./style/css/base.css">';
		if (isset($cssfile)) {
			foreach ($cssfile as $value) {
				echo '<link rel="stylesheet" href="./style/css/partials/', $value, '.css">';
			}
		}
	} else {
		echo '<link rel="shortcut icon" href="../../style/img/bitbug_favicon.ico" type="image/x-icon">';
		echo '<link rel="stylesheet" href="../../style/css/base.css">';
		if (isset($cssfile)) {
			foreach ($cssfile as $value) {
				echo '<link rel="stylesheet" href="../../style/css/partials/', $value, '.css">';
			}
		}
	}		
?>
	<script src="http://yui.yahooapis.com/3.18.0/build/yui/yui-min.js"></script>
