<?php
include "conf.php";
$db_connection = new mysqli(host,user,password,dbname);

$DoctorID=trim($_POST["DoctorID"]);
if(isset($DoctorID)){
$sql="DELETE From tbldoctors where DoctorID=$DoctorID";

$db_connection->query($sql);

$sql="delete from tblOPDHours where DoctorID=".$DoctorID;
  $db_connection->query($sql);

}


 ?>
