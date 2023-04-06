<?php
   $username = $_POST['username'];
   $password = $_POST['password'];
  
   // Database Connection part
   $con = new mysqli('localhost','root','','epiz_33813528_gasdash');
   if($con -> connect_error){
     die("Failed to connect: ".$con-> connect_error);
   }else {
    $stmt = $con -> prepare("select * from USER_Info where Email = ?");
	  $stmt -> bind_param("s", $username);
	  $stmt -> execute();
	  $stmt_result = $stmt->get_result();
	     //check to see if email exist in database. 
	  if($stmt_result->num_rows > 0){
           $data = $stmt_result -> fetch_assoc(); 
		  // check if passwordd is the correct password (stored in DB) for the Email. 
		   if( $data['Pass'] == $password){
			echo "<h2> Login Sucessful </h2>";
			header('Location: ../order.html');
		   }else {
			  echo"<h2> Invalid Email or password </h2>";
		   }
	  }else {
		echo "<h3> Invalid Email or password</h3>";
        
	  }
      $stmt->close();
      $con->close();
   }
?>