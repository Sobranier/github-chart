<?php
$con = mysql_connect("localhost", "prter", "abc123");
if (!$con) {
	die('Could not connect:' . mysql_error());
}
mysql_select_db("my_db", $con);

$sql = "INSERT INTO Persons (FirstName, LastName, Age)
	VALUES
	('$_POST[firstname]', '$_POST[lastname]', '$_POST[age]')";

if (!mysql_query($sql, $con)) {
	die ('Error:' . mysql_error());
}
echo "1 recode added";

mysql_close($con);

?>
