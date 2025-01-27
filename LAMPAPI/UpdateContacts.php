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

	$contactPhone = $inData["contactPhone"];
	$contactEmail = $inData["contactEmail"];
	$contactFirstName = $inData["contactFirstName"];
	$contactLastName = $inData["contactLastName"];
	$contactID = $inData["contactID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
		if ($conn->connect_error)
		{
			returnWithError( $conn->connect_error );
		}
		else
		{
			$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName=?, Phone= ?, Email= ? WHERE ID= ?");
			$stmt->bind_param("ssssi", $contactFirstName, $contactLastName, $contactPhone, $contactEmail, $contactID);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			http_response_code(200);
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
    if ($err !== "") {
        http_response_code(500);
    }
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}


?>