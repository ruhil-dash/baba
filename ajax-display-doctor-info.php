<?php
include "conf.php";
$db_connection= new mysqli(host,user,password,dbname) or die('unable to connect with database');
$DoctorID=$_POST['DoctorID'];

$sql="SELECT tbldoctors.DoctorID,tbldoctors.DoctorName,tbldoctors.Qualification,tbldoctors.Experience,tbldoctors.HospitalName,tbldoctors.ShortDesc,
tbldoctors.Telephone,tbldoctors.Fees,tblopdhours.Days,tblopdhours.MorningFrom,tblopdhours.MorningTo,tblopdhours.EveningFrom,tblopdhours.EveningTo
 FROM tbldoctors INNER JOIN tblopdhours on tbldoctors.DoctorID = tblopdhours.DoctorID
WHERE tbldoctors.DoctorID = $DoctorID ORDER BY tblopdhours.Days desc" ;
//echo $MorningFrom;
$result=array();
$data=$db_connection->query($sql);
while($row=mysqli_fetch_array($data,MYSQLI_ASSOC))
{

    $result[]=$row;
}

echo json_encode($result);
$db_connection->close();
?>
