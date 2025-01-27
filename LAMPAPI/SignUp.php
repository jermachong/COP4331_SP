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
	
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$userName = $inData["Username"]; 
	$password = $inData["Password"]; 

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);

	} else {
		$stmt = $conn->prepare("SELECT COUNT(*) as count FROM Users WHERE Login = ?");
		$stmt->bind_param("s", $userName);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		
		if ($row['count'] > 0) {
			returnWithError("username '$userName' is already taken.");
		} else { 
			$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $firstName, $lastName, $userName, $password);
			$stmt->execute();
			
			if ($stmt->affected_rows > 0) {
				returnWithError("");
			} else {
				returnWithError("failed to insert the user");
			}
		}
		$stmt->close();
		$conn->close();
	}

	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>