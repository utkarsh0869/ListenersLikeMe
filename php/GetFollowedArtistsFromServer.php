<?php
    //connecting to the database with PDO
    require_once("config.php");

    $artistId = $_GET['artistId'];

    $stmt = $pdo->prepare("SELECT * FROM followedArtists WHERE artistId = :artistId");
    $stmt->bindParam(':artistId', $artistId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $json_data = json_encode($result);

    echo $json_data;

    $stmt->closeCursor();
    $pdo = null;
?>
