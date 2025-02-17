<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <title>Créer un compte</title>
</head>
<body>
    <main>
        <form action="register.php" method="POST">
            <h1>Créer un compte</h1>
            <div>
                <label for="id">Identifiant</label>
                <input type="text" id="id" name="id" class="style1" required>
            </div>

            <div>
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" name="mdp" class="style2" required>
            </div>

            <button type="submit" class="style">S'enregistrer</button>
            <a href="login.php">Déjà inscrit ? Se connecter</a>
        </form>
    </main>

<?php
// register.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? '';
    $mdp = $_POST['mdp'] ?? '';

    // Basic validation
    if (empty($id) || empty($mdp)) {
        echo 'All fields are required.';
        exit;
    }

    // Database connection
    $conn = mysqli_connect("garsrehadmin.mysql.db", "garsrehadmin", "LaChiennete123", "garsrehadmin");

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }
    
    // Prepare and execute insert statement
    $sql = "INSERT INTO login (id, mdp) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ss", $id, $mdp);
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error during registration: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }

    // Close connection
    $conn->close();
}
?>

</body>
</html>