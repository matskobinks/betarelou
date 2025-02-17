<html>
    <head>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    <?php
    @include("connexion.php");       
    $requete="select * from produits";
    $resultat=mysqli_query($conn,$requete);
    ?>

    <center>
         <table border="1">
    <tr>
        <td>ID Produit </td>
        <td>Nom Produit </td>
        <td>Prix </td>
        <td>Stock </td>
</tr>
    <?php while($enreg=mysqli_fetch_array($resultat))
    {?>
    <tr>
        <td><?php echo $enreg["id_produit"];?></td>
        <td><?php echo $enreg["nom_produit"];?></td>
        <td><?php echo $enreg["prix"];?></td>
        <td><?php echo $enreg["stock"];?></td>
    </tr>
    <?php }?>
    </table></center>
    <br><br>
    <center><a href="index2.html" class="back-button">Retour Accueil</a></center>
<?php
    mysqli_close($conn);?>
    </body>
</html>