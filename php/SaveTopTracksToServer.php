<?php
    //connecting to the database with PDO
    require_once("config.php");

    // PHP code
    $trackName = $_POST['trackName'];
    $trackImageURL = $_POST['trackImageURL'];
    $trackId = $_POST['trackId'];
    $trackPreviewURL = $_POST['trackPreviewURL'];

    $stmt = $pdo->prepare("SELECT * FROM topTracks WHERE trackId=:trackId");
    $stmt->bindParam(':trackId', $trackId);
    $stmt->execute();

    if ($stmt->rowCount() == 0) { 
        $stmt = $pdo->prepare("INSERT INTO topTracks (trackName, trackImageURL, trackId, trackPreviewURL) VALUES (:trackName, :trackImageURL, :trackId, :trackPreviewURL)");
        $stmt->bindParam(':trackName', $trackName);
        $stmt->bindParam(':trackImageURL', $trackImageURL);
        $stmt->bindParam(':trackId', $trackId);
        $stmt->bindParam(':trackPreviewURL', $trackPreviewURL);


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