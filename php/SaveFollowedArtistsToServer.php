<?php
    //connecting to the database with PDO
    require_once("config.php");

    // PHP code
    $artistImageURL = $_POST['artistImageURL'];
    $artistName = $_POST['artistName'];
    $artistId = $_POST['artistId'];

    $stmt = $pdo->prepare("SELECT * FROM followedArtists WHERE artistId=:artistId");
    $stmt->bindParam(':artistId', $artistId);
    $stmt->execute();

    if ($stmt->rowCount() == 0) { 
        $stmt = $pdo->prepare("INSERT INTO followedArtists (artistImageURL, artistName, artistId) VALUES (:artistImageURL, :artistName, :artistId)");
        $stmt->bindParam(':artistImageURL', $artistImageURL);
        $stmt->bindParam(':artistName', $artistName);
        $stmt->bindParam(':artistId', $artistId);


        if ($stmt->execute()) {
            echo "Data saved successfully";
        } else {
            echo "Error: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Data already exists for this artistId";
    }

    $stmt->closeCursor();
    $pdo = null;

?> 