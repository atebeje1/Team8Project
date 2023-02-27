function CollapseMenu() {
    document.getElementById("page").style.left = "0%";
    document.getElementById("menu").style.left = "-25%";
}
function ExpandMenu() {
    document.getElementById("page").style.left = "25%";
    document.getElementById("menu").style.left = "0%";
}
function myFunction(x) {
    x.classList.toggle("change");
}
function authenticate(){
    var authorised;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == "admin" && password == "admin"){
    authorised = true;
    }else{
    authorised = false;
    alert("Sorry, password is incorrect.");
    }
    return authorised;
}

