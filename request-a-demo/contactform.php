<?php
#include('db.php');
   #if(isset($_POST['sub'])){
                   $fname=$_POST['fname'];
                   $lname=$_POST['lname'];
                    $wemail=$_POST['wemail'];
                    $companyname=$_POST['companyname'];

                    $department=$_POST['department'];
                    $pnumber=$_POST['pnumber'];
                    $contactquestion=$_POST['contactquestion'];
                  
                      # $pnumber = $_POST['pnumber'];
    // $file_name = $_FILES['cv']['name'];
    // $file_tmp = $_FILES['cv']['tmp_name'];
    // move_uploaded_file($file_tmp,"cv/".$file_name);
   # $query = mysqli_query($con,"insert into addform(name, email, subject, phone, message)values('$name','$email','$subject','$phone','$message')");
    
    
    
$to = "einsysindia@gmail.com, ";
$subject = "EInfratech Systems India Request a Demo";

$message = "
<html>
<head>
<title>einsysindia</title>
</head>
<body>

<table width='50%'>
    <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9;'>
    First Name
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $fname
    </td>
    </tr>
     
   
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9;'>
    Last Name
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $lname
    </td>
    </tr>
    
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9'>
    Work Email
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $wemail
    </td>
    </tr>
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9'>
    Company
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $companyname
    </td>
    </tr>
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9'>
    Phone Number
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $pnumber
    </td>
    </tr>
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9'>
    Country
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $countryname
    </td>
    </tr>
     <tr>
    <td style='border:1px solid black; color:white; background:#b44040c9'>
    Contact Us Question
    </td>
    <td style='border:1px solid black; color:white; background:#dc0d2a;'>
    $contactquestion
    </td>
    </tr>
    
   </table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <einsysindia@gmail.com>' . "\r\n";
// $headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);

    header("Location: index.html");
#}
?>