<?php
	$title="HOME";
	$cssfile = array('header');
	include_once ('template/common/head.php');
?>
<head>
</head>
<body class="pg-home">
	<?php
		$headerlist = array('HOME', 'SPECIALTY', 'WORKS', 'BLOG');
		include_once ('template/common/header.php');	
	?>

	<?php
		include_once ('component/bigFace/bigFace.php');	
	?>
	<?php
		include_once ('template/common/footer.php');
	?>
	<script>
		console.log("hello world");
	</script>
	<script src="js/Animations.js"></script>
	<script>
		YUI().use('node','transition',function(Y){
			var Sou = Y.one('#headerGuide'),
				Tar = Y.one('#headerNav');
			Tar.hide(true);
			Sou.on('mouseout',function(){
				Tar.hide(true);
			});
			Sou.on('mouseover',function(){
				Tar.show(true);
			});
		});
	</script>
</body>
</html>
