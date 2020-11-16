<?php
    header('Content-Type: application/json');
	session_start();
    $res = array();

    if( !isset($_POST['functionName']) ) { $res['error'] = 'No function name!'; }

    if( !isset($res['error']) ) {
	
		$servername = '127.0.0.1';
		$username = 'root';
		$password = '';
		$dbname = 'jmfighters';
		$port = NULL;

		$conn = new mysqli($servername, $username, $password, $dbname, $port);
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$res['error'] = 'DB error connection';
		}else{
			switch($_POST['functionName']) {
				case 'addBooking':
				
				   $sql = "INSERT INTO booking (date, hour, name, dni, class)
					VALUES ('". $_POST["date"]."', '". $_POST["hour"] ."', '". $_POST["name"] ."', '". $_POST["dni"] ."', '". $_POST["className"] ."')";

					if ($conn->query($sql) === TRUE) {
						$res['result'] = 'Clase reservada con exito';
					} else {
						$res['error'] = 'Error al hacer la reserva';
					}
				   break;
				case 'getBookings':
				
					$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `class` like '" . $_POST["className"] . "' and `hour` like '" . $_POST["hour"] . "' and `dni` like '" . $_POST["dni"] ."' order by `class`";
					$result = $conn->query($sql);
					if($result->num_rows > 0){
						$res['hasBooking'] = true;
					}else{
						$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `class` like '" . $_POST["className"] . "' and `hour` like '" . $_POST["hour"] . "'";
						$result = $conn->query($sql);
						$res['result'] = $result->num_rows;
					}
					break;
				case 'getBookingsDay':
				
					$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `hour` like '%" . $_POST["hour"] . "%'";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					$res['sql'] = $sql;
					break;
				case 'addClass':
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
								VALUES ('". $_POST["className"]."', '". $_POST["hours"] ."', '". $_POST["days"] ."', '". $_POST["paxes"] ."', '". $targetFilePath ."')";

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
					
					break;
				case 'editClass':
					if(isset($_FILES['logo'])){
						//set url to save image
						$targetDir = "images/uploads/class/";
						$ext = explode(".", $_FILES["logo"]['name']);
						$fileName = $_POST['id'] . "." . $ext[count($ext) - 1];
						$targetFilePath = $targetDir . $fileName;

						// Upload file to server
						if(move_uploaded_file($_FILES["logo"]['tmp_name'], $targetFilePath)){
							// Insert image file name into database
							$sql = "UPDATE class SET
								name = '". $_POST["className"]."', 
								hours = '". $_POST["hours"] ."',
								days = '". $_POST["days"] ."',
								pax = '". $_POST["paxes"] ."',
								logo = '". $targetFilePath ."'
								WHERE id = ". $_POST["id"] .";";

							if ($conn->query($sql) === TRUE) {
								$res['result'] = 'Clase editada con exito';
							} else {
								$res['error'] = 'Error al editar la clase con foto';
							}
						}else{
							$res['error'] = "Sorry, there was an error uploading your file.";
						}
					}else{
						$sql = "UPDATE class SET
							name = '". $_POST["className"]."', 
							hours = '". $_POST["hours"] ."',
							days = '". $_POST["days"] ."',
							pax = ". $_POST["paxes"] ."
							WHERE id = ". $_POST["id"] .";";
							$res['sql'] = $sql;
						if ($conn->query($sql) === TRUE) {
							$res['result'] = 'Clase editada con exito';
						} else {
							$res['error'] = 'Error al editar la clase sin foto';
						}
					}
					
					break;
				case 'getClass':
				
					$sql = "SELECT * FROM class";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					break;
				case 'getUser':
					$sql = "SELECT * FROM users where `user_name` like '" . $_POST["user"]."' and `password` like '" . $_POST["pass"] . "'";
					$result = $conn->query($sql);
					$res['userExist'] = $result->num_rows > 0;

					if($res['userExist']){
						$_SESSION['user'] = $result->fetch_all(MYSQLI_ASSOC);
					}
					$res['user']=$_SESSION['user'];
					$res['userOnSession'] =  isset($_SESSION['user']);
					break;
				case 'getUserSession':
					if(isset($_SESSION['user'])){
						$res['user'] = $_SESSION['user'];
					}else{
						$res['user'] = null;
					}
					break;
				case 'signOut':
					$_SESSION['user'] = null;
					$res['sessionClosed'] = true;
				case 'removeClass':
					$sql = "DELETE FROM class WHERE id=".$_POST['classId'];

					$res['removed'] = $conn->query($sql);

					break;
				case 'getHours':
					$sql = "SELECT `hour` FROM booking group by `hour`";
					$result = $conn->query($sql);
					$res['hours'] = $result->fetch_all(MYSQLI_ASSOC);

					break;
				case 'addFighter':
					//todo insert with picture -- $_POST["picture"]
					$sql = "INSERT INTO fighters (name, nick, age, weight, win, lose, nul, ko)
					VALUES ('". $_POST["name"]."', '". $_POST["nick"] ."', ". $_POST["age"] .",
					". $_POST["weight"] .", ". $_POST["win"] .", ". $_POST["lose"] .", ". $_POST["nul"] .", ". $_POST["ko"] .")";

					$res['sql'] = $sql;

					if ($conn->query($sql) === TRUE) {
						$res['result'] = 'Fighter añadido.';
					} else {
						$res['error'] = 'Error al añadir el combatiente.';
					}
					break;
				case 'getFighters':
					$sql = "SELECT * FROM fighters";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					break;
				default:
				   $res['error'] = 'Not found function '.$_POST['functionName'].'!';
				   break;
			}
		}
		$conn->close();
    }

    echo json_encode($res);

?>

		