<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "contact_manager");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if email and password are provided
if (!isset($data["email"], $data["password"])) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

$email = $conn->real_escape_string($data["email"]);
$password = $data["password"];

// Check if user exists
$result = $conn->query("SELECT id, password_hash FROM users WHERE email='$email'");
if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "User not found."]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user["password_hash"])) {
    echo json_encode(["status" => "error", "message" => "Incorrect password."]);
    exit;
}

// Delete the user from the database
$delete = $conn->query("DELETE FROM users WHERE email='$email'");

if ($delete) {
    echo json_encode(["status" => "success", "message" => "User deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete user: " . $conn->error]);
}

$conn->close();
?>
