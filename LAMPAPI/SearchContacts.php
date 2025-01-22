<?php
	$inData = getRequestInfo();

	header('Access-Control-Allow-Origin: *');
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization');

	error_reporting(-1); // reports all errors
	ini_set("display_errors", "1"); // shows all errors
	ini_set("log_errors", 1);
	ini_set("error_log", "/tmp/php-error.log");

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		header("HTTP/1.1 200 OK");
		exit(0);
	}
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE (FirstName like ? OR LastName like?) AND UserID=?");
		$searchName = "%" . $inData["Search"] . "%";
		$stmt->bind_param("sss", $searchName, $searchName, $inData["UserID"]);
		$stmt->execute();

		$result = $stmt->get_result()

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"FirstName" : "' . $row["FirstName"]. '", "LastName" : "' . $row["LastName"]. '", "PhoneNumber" : "' . $row["PhoneNumber"]. '", "EmailAddress" : "' . $row["EmailAddress"]. '", "UserID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
		}

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>