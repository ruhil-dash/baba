  <?
  include "conf.php";
  $db_connection= new mysqli(host,user,password,dbname) or die('unable to connect with database');
  $DoctorID=$_POST['DoctorID'];
  $timestamp = strtotime('today midnight')*1000;

  if(!empty($_POST['DoctorID'])){
  $sql="SELECT Bookingtimestamp,DoctorID,PatientName,PatientMobileNumber,BookingID from tblbookingsappointment where DoctorID=$DoctorID and Bookingtimestamp>=$timestamp";

  $result=array();
  $data=$db_connection->query($sql);
  while($row=mysqli_fetch_array($data,MYSQLI_ASSOC))
  {
    $result[]=$row;
  }
  }
  echo json_encode($result);
  $db_connection->close();
  ?>
