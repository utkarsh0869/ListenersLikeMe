<?php
$connString = "mysql:host=localhost; dbname=ListenersLikeMe";
$user = "root";
$pass = "root";

try {
    $pdo = new PDO($connString, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // ob_start();
    // echo "Connected to DB";
    // ob_end_clean();

} catch (PDOException $e) {
  echo "Error in connection " . $e->getMessage();
}
?>
