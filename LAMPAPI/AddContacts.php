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
	
	$firstname = $inData["FirstName"];
	$lastname = $inData["LastName"];
	$phone = $inData["Phone"];
	$email = $inData["Email"];
	$userId = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, UserID) VALUES(?,?,?,?,?)"); //should receive userid from frontend to make this work
		$stmt->bind_param("ssssi", $firstname, $lastname, $phone, $email, $userId);
		$stmt->execute();
		$newID = $stmt->insert_id;

		$stmt->close();
		$conn->close();
		returnWithError("");
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

	function returnWithSuccess($id)
	{
		$retValue = '{"error":"","id":' . $id . '}';
		sendResultInfoAsJson($retValue);
		exit;
	}
	
?>