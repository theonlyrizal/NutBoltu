<?php
// filepath: /D:/WebDev/NutBoltu/auth.php
<?php
$servername = "localhost";
$username = "your-username";
$password = "your-password";
$dbname = "your-database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$postData = file_get_contents("php://input");
$request = json_decode($postData, true);
$username = $request['username'];
$password = $request['password'];
$action = $request['action'];

if ($action === 'login') {
    // Handle login
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

    $stmt->close();
} elseif ($action === 'signup') {
    // Handle sign-up
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

    $stmt->close();
}

$conn->close();
?>