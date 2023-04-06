function toggle(resize_content){
    console.log(document.getElementById("sidebar").style.left)
    if(document.getElementById("sidebar").style.left == "-25%"){
        console.log('Working')
        document.getElementById("sidebar").style.left = "0%";
        if(resize_content){
            document.getElementById("page").style.left = "25%";
            document.getElementById("page").style.width = "75%";
        } else {
            document.getElementById("header").style.left = "25%";
            document.getElementById("header").style.width = "75%";
        }
    } else {
        document.getElementById("sidebar").style.left = "-25%";
        if(resize_content){
            document.getElementById("page").style.left = "0%";
            document.getElementById("page").style.width = "100%";
        } else {
            document.getElementById("header").style.left = "0%";
            document.getElementById("header").style.width = "100%";
        }
    }
}
function animate(x) {
    x.classList.toggle("change");
}