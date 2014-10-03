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
	<h1>Hello world!</h1>
	<?php
		include_once ('template/common/footer.php');
	?>
	<script>
		console.log("hello world");
	</script>
	<script src="js/Animations.js"></script>
	<script>
		YUI({
			module:{
				'AnimationShow':{
					fullpath:'js/Animations.js',
					requires:['node-base']
				}
			}
		}).use('AnimationShow',function(Y){
			Y.AnimationShow.sayHello(Y.one('#headerGuide'));
		});
	</script>
</body>
</html>
