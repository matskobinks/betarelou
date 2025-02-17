<html>
    <head>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    <?php
    // Inclusion du fichier de connexion
    if (!@include("connexion.php")) {
        die("Erreur : Fichier de connexion manquant.");
    }

    // Requête SQL corrigée
    $requete = "SELECT * FROM produits WHERE stock > 10";

    // Exécution de la requête et gestion des erreurs
    $resultat = mysqli_query($conn, $requete);
    if (!$resultat) {
        die("Erreur dans la requête SQL : " . mysqli_error($conn));
    }
    ?>

    <center>
         <table border="1">
            <tr>
                <td>ID Produit</td>
                <td>Prix</td>
                <td>Nom Produit</td>
                <td>Stock</td>
            </tr>
            <?php 
            // Parcours des résultats
            while ($enreg = mysqli_fetch_array($resultat)) { ?>
            <tr>
                <td><?php echo htmlspecialchars($enreg["id_produit"]); ?></td>
                <td><?php echo htmlspecialchars($enreg["prix"]); ?></td>
                <td><?php echo htmlspecialchars($enreg["nom_produit"]); ?></td>
                <td><?php echo htmlspecialchars($enreg["stock"]); ?></td>
            </tr>
            <?php } ?>
         </table>
    </center>
    <br><br>
    <center><a href="index2.html" class="back-button">Retour Accueil</a></center>
    <?php
    // Fermeture de la connexion
    mysqli_close($conn);
    ?>
    </body>
</html>
