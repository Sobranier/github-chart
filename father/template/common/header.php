<div class="header">
	<h1>实战</h1>
	<div>
<?php
	if (empty($headerlist)) {
		$headerlist = array('HOME', 'TEST');
	}
	$link = '<a href="%s">%s</a>';
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
	</div>
</div>
