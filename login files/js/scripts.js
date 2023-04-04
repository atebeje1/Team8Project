function toggle(page){
    if(page == "home"){
        if(document.getElementById("menu").style.left == "-25%"){
            document.getElementById("menu").style.left = "0%";
            document.getElementById("page").style.left = "25%";
            document.getElementById("header").style.left = "25%";
            document.getElementById("toggle-wrapper").style.left = "25%";
            document.getElementById("name").style.left = "30%";
            document.getElementById("page").style.width = "75%";
        } else {
            document.getElementById("menu").style.left = "-25%";
            document.getElementById("page").style.left = "0%";
            document.getElementById("header").style.left = "0%";
            document.getElementById("toggle-wrapper").style.left = "0%";
            document.getElementById("name").style.left = "5%";
            document.getElementById("page").style.width = "100%";
        }
    } else if(page == "login"){
        if(document.getElementById("menu").style.left == "-25%"){
            document.getElementById("menu").style.left = "0%";
            document.getElementById("page").style.left = "25%";
            document.getElementById("header").style.left = "25%";
            document.getElementById("page").style.width = "75%";
            document.getElementById("container").style.left = "25%";
        } else {
            document.getElementById("menu").style.left = "-25%";
            document.getElementById("page").style.left = "0%";
            document.getElementById("header").style.left = "0%";
            document.getElementById("page").style.width = "100%";
            document.getElementById("container").style.left = "0%";
        }
    }
    
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

