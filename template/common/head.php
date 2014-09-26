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
		View::addCssFiles(array('base','base'));
		if (isset($cssfile)) {
			View::addCssFiles($cssfile);
		}
	?>
