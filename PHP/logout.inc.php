<?php
/**
 * Created by PhpStorm.
 * User: shach
 * Date: 3/25/2018
 * Time: 1:34 AM
 */
if (isset($_POST['submit'])) {
    session_start();
    session_unset();
    session_destroy();
    $_SESSION['url'] = $_SERVER['HTTP_REFERER'];
    header("location: ".$_SESSION['url']);
    session_destroy();
    exit();
}
