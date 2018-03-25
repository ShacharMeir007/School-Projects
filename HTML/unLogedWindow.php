


<?php
session_start();
    $name = $_SESSION['u_uid'];
    if (isset($_SESSION['u_id'])){
        echo '<form class="nav">
    <ul class="form">
        <li><img id="user_profile" class="system" src="../img/user%20profile.png" width="40px" height="40px"></li>
        <li><strong><p class="system" id="user_name">Hello <?php echo $name; ?></p></strong></li>
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

    <button class="log" id="register_button">Register</button>


</form>';
    }
?>

