<?php
	$title="HOME";
	$cssfile = array('header', 'home');
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
		include_once ('component/introduce/introduce.php');	
	?>
	<?php
		include_once ('template/common/footer.php');
	?>
	<script>
		console.log("hello world");
	</script>
	<script src="js/home.js"></script>
	<script src="component/bigFace/bigFace.js"></script>
</body>
</html>
