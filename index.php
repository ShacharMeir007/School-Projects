<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gallery</title>
</head>
<body>
<form method="Get">

    <input type="text" name="person">
    <button> submit</button>
</form>

<?php
$fine = $_GET['person'];
echo $fine;

?>

</body>
</html>


