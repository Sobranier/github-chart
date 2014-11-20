<?php

	$file_handle = fopen("hellonuanba", "r");
	$response = array();
	while (!feof($file_handle)) {
	   $line = fgets($file_handle);
	   $response[] = $line;
	}
	fclose($file_handle);

	echo json_encode($response);

?>
