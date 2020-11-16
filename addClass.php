<?php
	$servername = '127.0.0.1';
	$username = 'root';
	$password = '';
	$dbname = 'jmfighters';
	$port = NULL;

	$res['a'] = $_FILES['logo']['tmp_name'] .' - '.$_FILES["logo"]['name'];
	$res['b'] = $_POST['name'];
	$res['c'] = $_SERVER["REQUEST_METHOD"];
	$conn = new mysqli($servername, $username, $password, $dbname, $port);
	if(isset($_FILES['logo'])){
		//Get last id
		$sql = "SELECT `id` FROM class order by `id` desc";
		$result = $conn->query($sql);
		$queryResult = $result->fetch_all(MYSQLI_ASSOC);
		$id = $queryResult[0]['id'];

		//set url to save image
		$targetDir = "images/uploads/class/";
		$ext = explode(".", $_FILES["logo"]['name']);
		$arrayId = array($id,1);
		$fileName = array_sum($arrayId) . "." . $ext[count($ext) - 1];
		$targetFilePath = $targetDir . $fileName;

		// Upload file to server
		if(move_uploaded_file($_FILES["logo"]['tmp_name'], $targetFilePath)){
			// Insert image file name into database
			$sql = "INSERT INTO class (name, hours, days, pax, logo)
		VALUES ('". $_POST["name"]."', '". $_POST["hours"] ."', '". $_POST["days"] ."', '". $_POST["paxes"] ."', '". $targetFilePath ."')";

			if ($conn->query($sql) === TRUE) {
				$res['result'] = 'Clase creada con exito';
			} else {
				$res['error'] = 'Error al crear la clase';
			}
		}else{
			$res['error'] = "Sorry, there was an error uploading your file.";
		}

	}else{
		$res['error'] = "Sorry, there was an error uploading your file.";
	}
	
	echo json_encode($res);
?>