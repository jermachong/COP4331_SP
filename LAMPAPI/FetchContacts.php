<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve the user_id from GET or from JSON payload
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

// Connect to the database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
} else {
    // Prepare the statement to fetch contacts for the given userID
    $stmt = $conn->prepare("SELECT ID, FirstName, LastName, Phone, Email FROM Contacts WHERE UserID = ?");
    if (!$stmt) {
        echo json_encode(["error" => $conn->error]);
        exit;
    }
    
    $stmt->bind_param("i", $userID);
    
    if (!$stmt->execute()) {
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
}
?>
