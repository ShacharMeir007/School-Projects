<?php


include 'menu.html';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home Page</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="http://code.jquery.com/jquery-3.2.1.js"></script>
    <script type="text/javascript">
        $(window).on('scroll', function() {
            if ($(window).scrollTop() ){
                $('nav').addClass('black');
            }
            else {
                $('nav').removeClass('black');
            }
        })
    </script>
</head>
<body>
<div>
    <!--<nav>
        <a href="Home%20Page.html">
            <img src="img/exodus.png" height="80" width="250">
        </a>
        <ul>
            <li><strong><a href="Home%20Page.html">Home Page</a></strong></li>
            <li><strong><a href="Gallery.html">Gallery&#9662</a></strong>
                <ul>
                    <li class="kaka"><strong><a href="#">code examples</a></strong></li>
                    <li class="kaka"><strong><a href="#">decoration</a></strong></li>
                </ul></li>
            <li><strong><a href="#">about</a></strong></li>
        </ul>
        <strong><p class="log" id="username">username:</p></strong>
        <form>

            <input type="text" id="login" class="log">
            <strong><p  class="log" id="password">password:</p></strong>
            <input type="text" id="pass" class="log">
            <button class="log" id="submit">login</button>

        </form>
    </nav>-->
</div>
<p id="par">Devices may be hosts (
    DFP: Downstream-facing port) or peripherals
    (UFP: Upstream-facing port). Some, such as mobile phones, can take
    either role depending on what kind is detected on the other end.
    These types of ports are called Dual-Role-Data (DRD) ports, which was known as USB On-The-Go in previous specification.[12] When two such devices are connected, the roles are randomly assigned but a swap can be commanded from either end, although there are optional path and role detection methods that would allow devices to select a preference for a specific role.
    Furthermore, dual-role devices that implement USB Power Delivery may independently and dynamically swap data and power roles using the Data Role Swap or Power Role Swap processes. This allows for charge-through hub or docking station applications where
    the USB-C device acts as a USB data host while acting as a power consumer rather than a source.[5]

    USB-C devices may optionally provide or consume bus power currents of 1.5 A and 3.0 A (at 5 V) in addition to baseline bus power provision; power sources can either advertise increased USB current through the configuration channel, or they can implement the full USB Power Delivery specification using both BMC-coded configuration line and legacy BFSK-coded V
    Devices may be hosts (
    DFP: Downstream-facing port) or peripherals
    (UFP: Upstream-facing port). Some, such as mobile phones, can take
    either role depending on what kind is detected on the other end.
    These types of ports are called Dual-Role-Data (DRD) ports, which was known as USB On-The-Go in previous specification.[12] When two such devices are connected, the roles are randomly assigned but a swap can be commanded from either end, although there are optional path and role detection methods that would allow devices to select a preference for a specific role.
    Furthermore, dual-role devices that implement USB Power Delivery may independently and dynamically swap data and power roles using the Data Role Swap or Power Role Swap processes. This allows for charge-through hub or docking station applications where
    the USB-C device acts as a USB data host while acting as a power consumer rather than a source.[5]

    USB-C devices may optionally provide or consume bus power currents of 1.5 A and 3.0 A (at 5 V) in addition to baseline bus power provision; power sources can either advertise increased USB current through the configuration channel, or they can implement the full USB Power Delivery specification using both BMC-coded configuration line and legacy BFSK-coded V

</p>

</body>
</html>