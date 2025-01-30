<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    error_reporting(-1);
    ini_set("display_errors", "1");
    ini_set("log_errors", 1);
    ini_set("error_log", "/tmp/php-error.log");

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $userName = $inData["login"];
    $password = $inData["password"];
    $email = $inData["email"];
    $phone = $inData["phone"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        // Check if username already exists
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM Users WHERE Login = ?");
        $stmt->bind_param("s", $userName);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row['count'] > 0) {
            returnWithError("Username '$userName' is already taken.");
        } else {
            // Insert new user with email and phone number
            $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password, Email, Phone) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $firstName, $lastName, $userName, $password, $email, $phone);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                sendResultInfoAsJson('{"success":"User registered successfully."}');
            } else {
                returnWithError("Failed to insert the user.");
            }
        }
        $stmt->close();
        $conn->close();
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
?>