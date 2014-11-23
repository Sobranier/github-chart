<?php
	$link = '<script src="%sactor/%s.js"></script>';
	$rel = ($title ==='HOME') ? '' : '../../';
	if (isset($jsfile)) {
		foreach ($jsfile as $value) {
			echo sprintf($link, $rel, $value);
		}
	}

?>
