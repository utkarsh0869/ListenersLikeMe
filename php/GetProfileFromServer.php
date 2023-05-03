<?php
    //connecting to the database with PDO
    require_once("config.php");

    $userId = $_GET['userId'];

    $stmt = $pdo->prepare("SELECT * FROM userProfile WHERE userId = :userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $json_data = json_encode($result);

    echo $json_data;

    $stmt->closeCursor();
    $pdo = null;
?>
