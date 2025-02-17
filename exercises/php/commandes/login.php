<html>
    <head>
        <link rel="stylesheet" href="/css/style.css">
    </head>
<body>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

    @include("connexion.php");
    $a=$_POST["id"];
    $b=$_POST["mdp"];

    $requete= "SELECT * from logindb where id= '$a' and mdp= '$b' ";
    $resultat=mysqli_query($conn, $requete);

    $ligne=mysqli_num_rows($resultat);
    if ($ligne==1)
        header("location:index2.html");
    else
        header("location:index2.html");
?>
</body>
</html>
