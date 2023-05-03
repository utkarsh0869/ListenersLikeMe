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
    $userBio = $_POST['userBio'];

    $stmt = $pdo->prepare("SELECT * FROM userProfile WHERE userId=:userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();

    if ($stmt->rowCount() == 0) { // if the userId is not in the database
        $stmt = $pdo->prepare("INSERT INTO userProfile (userName, userId, userEmail, spotifyURI, spotifyURL, userProfileImageURL, userBio) VALUES (:userName ,:userId, :userEmail, :spotifyURI, :spotifyURL, :userProfileImageURL, :userBio)");
        $stmt->bindParam(':userEmail', $userEmail);
        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':userName', $userName);
        $stmt->bindParam(':spotifyURI', $spotifyURI);
        $stmt->bindParam(':spotifyURL', $spotifyURL);
        $stmt->bindParam(':userProfileImageURL', $userProfileImageURL);
        $stmt->bindParam(':userBio', $userBio);

        if ($stmt->execute()) {
            echo "Data saved successfully";
        } else {
            echo "Error: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Data already exists for this userId";
    }

    $stmt->closeCursor();
    $pdo = null;

?> 