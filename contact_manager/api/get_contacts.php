<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

include __DIR__ . '/../../config/db.php';


// Retrieve and sanitize the user_id from the GET parameters
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
if ($user_id === 0) {
    echo json_encode(["error" => "Invalid or missing user_id"]);
    exit;
}

$sql = "SELECT * FROM contacts WHERE User_id = $user_id";

// Execute the query
$result = $conn->query($sql);
if (!$result) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);

$conn->close();
?>
