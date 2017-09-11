<?php

/**
 * Created by PhpStorm.
 * User: David
 * Date: 3/22/2017
 * Time: 3:09 PM
 */

    error_reporting(E_ALL);
    ini_set("display_errors", TRUE);




?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cambridge Chess</title>
    <script src="../js/plugins/jquery-3.2.0.min.js"></script>
    <script type ="text/javascript" src="../js/pieces.js"></script>
    <script type ="text/javascript" src="../js/js.js"></script>
    <link rel="icon" href="../img/icon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="../css/main.css">



</head>
<body>

<div id ="board">




</div>



<div id ="info">


    <p id = "error" style="color: red; font-weight: bold;"></p>
    <p id = "message"></p>

    <p>Turn Number: <p id="turn_number" style = "color: blue; font-weight: bolder;"></p></p>
    <p>Player's Turn: <p id="player_turn" style = "font-weight: bolder;"> </p></p>

    <p hidden>You selected square: <p id="selected_square"></p></p>
    <p hidden> You selected piece: <p id="selected_piece"></p></p>



</div>

<div id ="PlayerInfo">


    <div id="WhitePiecesCap">

        <h3 style ="text-decoration: underline;">Black</h3>
        <hr>
        <div id ="whitePiecesTaken"></div>




    </div>

    <div id="BlackPiecesCap">

        <h3 style ="text-decoration: underline;">White</h3>
        <hr>
        <div id ="blackPiecesTaken"></div>




    </div>
</div>





<?php










?>
</body>
</html>





