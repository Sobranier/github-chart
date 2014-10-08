<div class="header">
	<a class="header-logo fl" href="http://www.sobra.im/">严伟庆</a>
	<div class="header-guide fr" id="headerGuide">
		<div class="header-guide-info fr">遊牧與漂流</div>
		<div class="header-guide-nav fl" id="headerNav">
	<?php
		if (empty($headerlist)) {
			$headerlist = array('HOME', 'SPECIALTY', 'WORKS', 'BLOG');
		}
		if ($title === 'HOME') {
			echo '<a href="#introduce">首页<span>HOME</span></a>';
			echo '<a href="template/specialty">特質<span>SPECIALTY</span></a>';
			echo '<a href="template/works">作品<span>WORKS</span></a>';
			echo '<a href="template/BLOG">博客<span>BLOG</span></a>';
		} else {
			foreach ($headerlist as $value) {
				if ($value === 'HOME') {
					echo '<a href="../../">', $value, '</a>';
				} elseif ($value ===$title) {
					echo '<a class="selected" href="../', strtolower($value), '">', $value, '</a>';
				} else {
					echo '<a href="../', strtolower($value), '">', $value, '</a>';
				}
			}
		}
	?>
		</div>
	</div>
</div>
