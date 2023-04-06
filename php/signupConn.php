<?php
	$inputFName = $_POST['inputFName'];
	$inputAge = $_POST['inputAge'];
	$inputEmail = $_POST['inputEmail'];
	$inputPassword = $_POST['inputPassword'];
	$inputAddress = $_POST['inputAddress'];
	$inputCity = $_POST['inputCity'];
	$inputState = $_POST['inputState'];
	$inputZip = $_POST['inputZip'];
	$inputPhoneNum = $_POST['inputPhoneNum'];


	// Database connection
	$conn = new mysqli('localhost','root','','epiz_33813528_gasdash');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into user_info(FName, Email, AGE, PhoneNumber, pass, Address_Name, City, State, Zipcode) values(?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssiissssi", $inputFName, $inputEmail, $inputAge, $inputPhoneNum, $inputPassword, $inputAddress, $inputCity, $inputState, $inputZip );
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		header('Location: ../login.html');
		$stmt->close();
		$conn->close();
	}
?>