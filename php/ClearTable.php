<?php
	// Connect to the database
	require_once("config.php");

	// Truncate table1
	$stmt1 = $pdo->prepare("DELETE FROM userProfile");
	$stmt1->execute();

	if ($stmt1->execute()) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $stmt1->errorInfo()[2];
    }

	// Truncate table2
	$stmt2 = $pdo->prepare("DELETE FROM followedArtists");
	$stmt2->execute();

	if ($stmt2->execute()) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $stmt2->errorInfo()[2];
    }

	// Truncate table3
	$stmt3 = $pdo->prepare("DELETE FROM topTracks");
	$stmt3->execute();

	if ($stmt3->execute()) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $stmt3->errorInfo()[2];
    }
	// Return a success message
	echo "Tables cleared successfully!";
?>
