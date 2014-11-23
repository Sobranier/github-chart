<!DOCTYPE html>
<html>
<head lang="en">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="keywords" content="nuanba,暖爸,yanweiqing">

	<title>
<?php
	if (isset($fullTitle)) {
		echo $fullTitle;
	} else if (isset($title)) {
		echo '暖爸 | ', $title;
	} else {
		echo '暖爸小宝';
	}
?>
	</title>
<?php
	$link = '<link rel="stylesheet" href="%sstyle/css/partials/%s.css">';
	$rel = ($title === 'HOME') ? '' : '../../';
	echo sprintf($link, $rel, 'base');
	if (isset($cssfile)) {
		foreach ($cssfile as $value) {
			echo sprintf($link, $rel, $value);
		}
	}
?>
	<script src="http://yui.yahooapis.com/3.18.0/build/yui/yui-min.js"></script>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
