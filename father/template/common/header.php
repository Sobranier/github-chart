<div class="header">
	<div class="header-content cf">
		<a class="header-logo fl"><h1>暖爸小宝</h1></a>
		<ul class="navbar fr">
<?php
	if (empty($headerlist)) {
		$headerlist = array('HOME', 'TEST');
	}
	$link = '<li><a href="%s">%s</a></li>';
	if ($title === 'HOME') {
		foreach ($headerlist as $value) {
			if ($value === 'HOME') {
				$rel = '#introduce';
			} else {
				$rel = 'template/'. $value;
			}
			echo sprintf($link, $rel, $value);
		}
	} else {
		foreach ($headerlist as $value) {
			if ($value === 'HOME') {
				$rel = '../..'; 
			} else {
				$rel = '../'. strtolower($value);
			}
			echo sprintf($link, $rel, $value);
		}
	}
?>
		</ul>
	</div>
</div>
