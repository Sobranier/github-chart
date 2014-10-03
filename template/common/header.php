<div class="header">
	<div><?php
		if (empty($headerlist)) {
			$headerlist = array('HOME', 'SPECIALTY', 'WORKS', 'BLOG');
		}
		if ($title === 'HOME') {
			foreach ($headerlist as $value) {
				if ($value === $title) {
					echo '<a href="./">', $value, '</a>';
				} else {
					echo '<a href="template/', strtolower($value), '">', $value, '</a>';
				}
			}
		} else {
			foreach ($headerlist as $value) {
				if ($value === 'HOME') {
					echo '<a href="../../">', $value, '</a>';
				} else {
					echo '<a href="../', strtolower($value), '">', $value, '</a>';
				}
			}
		}
	?>
	</div>
	<h2>This is Head</h2>
</div>
