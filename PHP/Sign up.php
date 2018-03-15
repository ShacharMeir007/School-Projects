<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign up page</title>

    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
    <link rel="stylesheet" type="text/css" href="../CSS/nav%20bar.css">
    <link rel="stylesheet" type="text/css" href="../CSS/Sign%20up%20style.css">
    <script src="http://code.jquery.com/jquery-3.2.1.js"></script>
</head>
<body>
<div>
    <div class="index">
    </div>

    <!the body ______________________________________________________________>
    <div id="content_box">
        <div id="content">
            <form id="sign_up_form" action="dbh.inc.php" method="POST">
                <p id="message">Sign up</p>
                <input id="first" type="text" name="first" placeholder="Firstname">
                <input id="last" type="text" name="last" placeholder="Lastname">
                <input id="email" type="text" name="email" placeholder="E-mail">
                <input id="uid" type="text" name="uid" placeholder="Username">
                <input id="pwd" type="password" name="pwd" placeholder="Password">
                <button id="submit" type="submit" name="submit">Sign up</button>



            </form>
        </div>
    </div>
    <!body end ______________________________________________________________>
</div>
</body>
</html>

<script type="text/javascript">
    $(function () {
        $(".index").load("../HTML/menu.html");
    })
</script>