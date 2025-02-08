<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

// Adjust the include path to your actual db.php file location.
include __DIR__ . '/../config/db.php';

// Decode the incoming JSON payload.
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["error" => "Invalid JSON payload."]);
    exit;
}

// Retrieve and sanitize values.
$firstName = isset($input["FirstName"]) ? trim($input["FirstName"]) : "";
$lastName  = isset($input["LastName"])  ? trim($input["LastName"])  : "";
$email     = isset($input["Email"])     ? trim($input["Email"])     : "";
$phone     = isset($input["Phone"])     ? trim($input["Phone"])     : "";
$userID    = isset($input["UserID"])    ? intval($input["UserID"])  : 0;

// Basic validation (you can add more robust validation as needed).
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || $userID === 0) {
    echo json_encode(["error" => "Missing required contact fields."]);
    exit;
}

// Prepare the SQL statement. Adjust the table/column names to match your database.
$stmt = $conn->prepare("INSERT INTO contacts (FirstName, LastName, Email, Phone, User_id) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$stmt->bind_param("ssssi", $firstName, $lastName, $email, $phone, $userID);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Contact added successfully!"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
