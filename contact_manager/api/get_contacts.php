<?php
include '../config/db.php';

header("Content-Type: application/json");

$user_id = $_GET['user_id'];
$sql = "SELECT * FROM contacts WHERE user_id = $user_id";
$result = $conn->query($sql);

$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);
$conn->close();
?>
