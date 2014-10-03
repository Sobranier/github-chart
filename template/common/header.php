<div class="header">
	<a class="header-logo fl" href="http://www.sobra.im/">严伟庆</a>
	<div class="header-guide fr" id="headerGuide">
		<div class="header-guide-info fr">遊牧與漂流</div>
		<div class="header-guide-nav fl">
	<?php
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
	</div>
	<h2>This is Head</h2>
</div>
