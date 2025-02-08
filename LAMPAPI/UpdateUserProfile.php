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

    $userID    = $inData["userID"];
    $firstName = $inData["firstName"];
    $lastName  = $inData["lastName"];
    $email     = $inData["email"];
    $phone     = $inData["phone"];
    $username  = $inData["username"];
    $password  = $inData["password"]; 

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("UPDATE Users 
                                SET firstName = ?, 
                                    lastName  = ?, 
                                    email     = ?, 
                                    phone     = ?, 
                                    login     = ?, 
                                    password  = ?
                                WHERE ID = ?");

        $stmt->bind_param("ssssssi", 
            $firstName, 
            $lastName, 
            $email, 
            $phone, 
            $username, 
            $password, 
            $userID
        );
        
        $stmt->execute();

        if ($stmt->error)
        {
            returnWithError($stmt->error);
        }
        else
        {

            http_response_code(200);
            returnWithSuccess();
        }

        $stmt->close();
        $conn->close();
    }
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        if ($err !== "")
        {
            http_response_code(500);
        }
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithSuccess()
    {
        $retValue = '{"error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
