<?php
session_start();
    if (isset($_SESSION['u_id'])){
        $name = $_SESSION['u_uid'];
        echo '<form class="nav" action="../PHP/logout.inc.php" class="nav" method="post">
    <ul class="form">
        <li><img id="user_profile" class="system" src="../img/user%20profile.png" width="40px" height="40px"></li>
        <li><strong><p class="system" id="user_name">Hello dave </p></strong></li>
        <button class="log" id="login_button" name="submit" type="submit">logout</button>
    </ul>
</form>';
    }
    else{
        echo '<form action="../PHP/login.inc.php" class="nav" method="post">

    <strong><p class="log" id="username">username:</p></strong>

    <input type="text" class="log" name="uid" id="login">

    <strong><p  class="log"  id="password">password:</p></strong>

    <input type="password" name="pwd" class="log" id="pass">

    <button class="log" id="login_button" name="submit" type="submit">login</button>

    <a href="../PHP/Sign%20up.php"><button class="log" id="register_button">Register</button></a>


</form>';
    }
?>

