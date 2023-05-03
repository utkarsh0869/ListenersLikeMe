<?php
    //connecting to the database with PDO
    require_once("config.php");

    // PHP code
    $userEmail = $_POST['userEmail'];
    $userId = $_POST['userId'];
    $userName = $_POST['userName'];
    $spotifyURI = $_POST['spotifyURI'];
    $spotifyURL = $_POST['spotifyURL'];
    $userProfileImageURL = $_POST['userProfileImageURL'];


    $stmt = $pdo->prepare("INSERT INTO userProfile (userName, userId, userEmail, spotifyURI, 
    spotifyURL, userProfileImageURL) VALUES (:userName ,:userId, :userEmail, :spotifyURI, :spotifyURL, :userProfileImageURL)");
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':spotifyURI', $spotifyURI);
    $stmt->bindParam(':spotifyURL', $spotifyURL);
    $stmt->bindParam(':userProfileImageURL', $userProfileImageURL);

    if ($stmt->execute()) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $stmt->errorInfo()[2];
    }

    $stmt->closeCursor();
    $pdo = null;
?> 