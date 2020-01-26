<?php
if(isset($_POST['sub']))
{ 

$to = "ecelladgitm@gmail.com";

$subject = "ICIST Query";

$message = "
<html>
<head>
</head>
<body>
<table class='table table-bordered'>
	<tr>
		<td><strong>Name : </strong></td>
		<td>".$_POST['nameForm']."</td>
	</tr>
	<tr>
		<td><strong>Email :</strong></td>
		<td>".$_POST['emailForm']."</td>
	</tr>
	<tr>
		<td><strong>Subject :</strong></td>
		<td>".$_POST['subjectForm']."</td>
	</tr>
	<tr>
		<td><strong>Message :</strong></td>
		<td>".$_POST['msgForm']."</td>
	</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <noreply@ecelladgitm.in>' . "\r\n";


$sendmail = mail($to,$subject,$message,$headers);
if($sendmail)
{
header("Location:http://www.ecelladgitm.in");
}
else
{
header("Location:http://www.ecelladgitm.in");
}
}
