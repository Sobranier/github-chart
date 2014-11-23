<?php
	$title = "HOME";
	$cssfile = array('home');
	include_once('template/common/head.php');
?>
<body class="pg-home">
<?php
	$headerlist = array('HOME', 'TEST');
	include_once ('template/common/header.php');
?>

<?php
	include_once ('template/modules/firstface/index.php');
?>	

<?php
	include_once ('template/common/footer.php');
?>

</body>
</html>
