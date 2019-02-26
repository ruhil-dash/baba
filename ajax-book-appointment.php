<?php
  include "conf.php";
  $db_connection= new mysqli(host,user,password,dbname) or die ('unable to connect with database ');
  $DoctorID=$_POST["BdocId"];
  $BookingTime=$_POST["Bdoctime"];
  $Bookingtimestamp=$_POST["Bdoctimestamp"];
  $PatientName=$_POST["PatientName"];
  $PatientMobileNumber=$_POST["PatientMobileNumber"];

  if(isset($DoctorID)){
  $sql="INSERT into tblbookingsappointment(DoctorID,PatientName,PatientMobileNumber,BookingTime,Bookingtimestamp) values ('".$DoctorID."','".$PatientName."','".$PatientMobileNumber."','".$BookingTime."','".$Bookingtimestamp."')";

  $db_connection->query($sql);
  $last_id=$db_connection->insert_id;
}

$elements=array("PatientName"=>$PatientName,"PatientMobileNumber"=>$PatientMobileNumber,"LastId"=>$last_id);

echo json_encode($elements);
 ?>
