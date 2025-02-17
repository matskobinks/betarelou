<html>
    <head>
    <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    <?php
    @include("connexion.php");       
    $requete="select id_commande, date_commande from commandes";
    $resultat=mysqli_query($conn,$requete);
    ?>

    <center>
         <table border="1">
    <tr>
        <td>ID Commande</td>
        <td>Date Commande </td>
</tr>
    <?php while($enreg=mysqli_fetch_array($resultat))
    {?>
    <tr>
        <td><?php echo $enreg["id_commande"];?></td>
        <td><?php echo $enreg["date_commande"];?></td>
    </tr>
    <?php }?>
    </table></center>
    <br><br>
    <center><a href="index2.html" class="back-button">Retour Accueil</a></center>
<?php
    mysqli_close($conn);?>
    </body>
</html>