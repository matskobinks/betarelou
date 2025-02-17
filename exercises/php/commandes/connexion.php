<style>
    .connexion-message {
        text-align: center;
        font-size: 24px;
        color: #4CAF50;
        margin-top: 20px;
        font-weight: bold;
    }
    .error-message {
        text-align: center;
        font-size: 24px;
        color: #FF0000;
        margin-top: 20px;
        font-weight: bold;
    }
</style>
<link rel="stylesheet" href="/css/style.css">
<?php
$conn = mysqli_connect("garsrehadmin.mysql.db", "garsrehadmin", "LaChiennete123", "garsrehadmin");

if ($conn) {
    echo '<div class="connexion-message">PARFAIT CONNEXION REUSSI</div>';
} else {
    echo '<div class="error-message">ERREUR: Connexion échouée</div>';
}
?>
