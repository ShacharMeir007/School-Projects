<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gallery</title>
</head>
<body>
<form method="Get">

    <input type="text" name="num1">
    <button> submit</button>
</form>

<?php
$fine = $_GET['person'];
$r = array("f","fd");
echo $fine;
echo $r['0'];
if($fine == $r){}

?>

</body>
</html>

