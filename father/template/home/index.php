<?php
	$title = "HOME";
	$cssfile = array('home');
	include_once ('template/common/head.php');
?>
<body class="pg-home">
<?php
	$headerlist = array('HOME', 'ABOUT', 'TEST');
	include_once ('template/common/header.php');
	include_once ('template/modules/firstface/index.php');
	include_once ('template/common/footer.php');
	$jsfile = array('base');
	include_once ('template/common/foot.php');
?>

</body>
</html>
