<?php
  include "conf.php";
  $db_connection= new mysqli(host,user,password,dbname) or die('unable to connect with database');
  $DoctorID=$_POST['CanceldocId'];
  $PatientMobileNumber=$_POST["PatientMobileNumber"];
  $BookingID=$_POST["CancelBookingId"];
  //echo $BookingID;
  if(isset($_POST["PatientMobileNumber"]))
  {
      $sql="SELECT count(*) as total FROM tblbookingsappointment WHERE PatientMobileNumber='".$PatientMobileNumber."' and BookingID=$BookingID";
      $data=$db_connection->query($sql);
      $db=mysqli_fetch_array($data);

      $check=$db['total'] ;

      if($check==1)
      {
        $sql="DELETE FROM tblbookingsappointment WHERE PatientMobileNumber='".$PatientMobileNumber."' and BookingID=$BookingID";
              $data1=$db_connection->query($sql);
              echo 1;
      }

      else {
        echo 2;
    }

}

  $db_connection->close();
 ?>
