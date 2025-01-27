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

    $userID = $inData["userID"];
    $contactFirstName = $inData["contactFirstName"];
    $contactLastName = $inData["contactLastName"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName=? AND LastName=? AND UserID=?");
		$stmt->bind_param("ssi", $contactFirstName, $contactLastName, $userID);
		$stmt->execute();
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


?>