<?php
	$title="WORKS";
	include_once ('../common/head.php');
?>
<head>
</head>
<body>
<?php
	$headerlist = array('HOME', 'SPECIALTY', 'WORKS', 'BLOG');
	include_once ('../common/header.php');	
?>
	<h1>Hello world!</h1>
	<div class="wrapper-content" id="pg-uiguide">
<?php
	$guideNav = array(
		"Uiguide"=>"",
	
	);
	include ('../../component/drawerPanel/drawerPanel.php');
?>		
	</div>
<?php
	include_once ('../common/footer.php');
?>
	<script>
		console.log("hello world");
	</script>
</body>
</html>
