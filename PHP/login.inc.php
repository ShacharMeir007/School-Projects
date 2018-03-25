<?php
/**
 * Created by PhpStorm.
 * User: shach
 * Date: 3/25/2018
 * Time: 12:08 AM
 */
session_start();
if (isset($_POST['submit'])){
    include 'dbh.inc.php';


    $uid = mysqli_real_escape_string($conn, $_POST['uid']);
    $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);

    if (empty($uid)|| empty($pwd)){
        header("location: ../PHP/Sign%20up.html?login=empty");
        exit();
    }
    else{
        $sql = "SELECT * FROM users where user_uid ='$uid';";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);

        if ($resultCheck<1){
            header("location: ../PHP/Sign%20up.html?login=error2");
            exit();
        }
        else{
            if ($row = mysqli_fetch_assoc($result)){
                $hashedPwdCheck = password_verify($pwd, $row['user_pwd']);
                if ($hashedPwdCheck == false){
                    header("location: ../PHP/Sign%20up.html?login=error3");
                    exit();
                }
                elseif ($hashedPwdCheck == true){
                    $_SESSION['u_id'] = $row['user_id'];
                    $_SESSION['u_first'] = $row['user_first'];
                    $_SESSION['u_last'] = $row['user_last'];
                    $_SESSION['u_email'] = $row['user_email'];
                    $_SESSION['u_uid'] = $row['user_uid'];
                    header("location: ../PHP/Sign%20up.html?login=success");
                    exit();
                }
            }
        }
    }


}


else{
    header("location: ../PHP/Sign%20up.html?login=error1");
    exit();
}
