function login(){
    var id = document.getElementById("identification").value;
    var pwd = document.getElementById("password").value;
    if(id == "admin" && pwd == "admin")
    {
        window.location.href="oui.html";
    }
    else {
        alert("identification impossible");
        window.location.href="non.html"

    }
}