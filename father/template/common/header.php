<div class="header">
	<div class="header-content cf">
		<a class="header-logo fl"><h1>暖爸小宝</h1></a>
		<ul class="navbar fr">
<?php
	if (empty($headerlist)) {
		$headerlist = array('HOME', 'ABOUT', 'TEST');
	}
	$link = '<li><a href="%s">%s</a></li>';
	if ($title === 'HOME') {
		$rel_home = '#introduce';
		$rel_link = 'template/';
	} else {
		$rel_home = '../..';
		$rel_link = '../';
	}
	foreach ($headerlist as $value) {
		$rel = $rel_link. strtolower($value);
		switch ($value) {
			case 'HOME':
				$rel = $rel_home;
				$name = '首页';
				break;
			case 'ABOUT':
				$name = '关于我们';
				break;
			case 'TEST':
				$name = '测试页';
				break;
		}
		echo sprintf($link, $rel, $name);
	}

?>
		</ul>
	</div>
</div>
