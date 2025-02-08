<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../config/db.php';

$userID = 0;
if (isset($_GET['user_id'])) {
    $userID = intval($_GET['user_id']);
} else {
    $inData = json_decode(file_get_contents('php://input'), true);
    if (isset($inData['user_id'])) {
        $userID = intval($inData['user_id']);
    }
}

if ($userID === 0) {
    echo json_encode(["error" => "Invalid or missing user_id"]);
    exit;
}

$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Phone, Email FROM Contacts WHERE UserID = ?");
$stmt->bind_param("i", $userID);

if (!$stmt->execute()) {
    // If the statement fails, return the error
    echo json_encode(["error" => $stmt->error]);
    exit;
}

$result = $stmt->get_result();
$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);

$stmt->close();
$conn->close();
?>
