<?php
  $inData = getRequestInfo();
  $userID = $inData["userID"];

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

  $stmt = $conn->prepare("SELECT firstName, lastName, email, phone, login FROM Users WHERE ID = ?");
  $stmt->bind_param("i", $userID);
  $stmt->execute();
  $result = $stmt->get_result();

  if($row = $result->fetch_assoc())
  {
    $retVal = [
      "firstName" => $row["firstName"],
      "lastName"  => $row["lastName"],
      "email"     => $row["email"],
      "phone"     => $row["phone"],
      "username"  => $row["login"],
      "error"     => ""
    ];
    sendResultInfoAsJson($retVal);
  }
  else
  {
    returnWithError("No user found.");
  }
  $stmt->close();
  $conn->close();

  function getRequestInfo() { /* Your existing code */ }
  function sendResultInfoAsJson($obj) { /* Your existing code */ }
  function returnWithError($err) { /* Your existing code */ }
?>
