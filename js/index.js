// toggle function for home.html
function toggle(){
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
}