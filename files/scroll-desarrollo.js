window.onscroll = function() {
    let scrollHeight = document.body.scrollHeight;
    let totalHeight = window.scrollY + window.innerHeight;

    if(totalHeight >= scrollHeight) {
        document.getElementById("icono-mouse").classList.toggle("d-none")
           document.getElementById("scrolldown").classList.toggle("d-none");
           document.getElementById("scrollup").classList.toggle("d-none");
    } else if (document.getElementById("scrolldown").classList.contains("d-none")) {
        document.getElementById("icono-mouse").classList.toggle("d-none")
           document.getElementById("scrolldown").classList.toggle("d-none");
           document.getElementById("scrollup").classList.toggle("d-none");
    }
}
document.getElementById("scrolldown").addEventListener("click", () => {
    window.scrollTo(0, window.scrollY + 300);
});
document.getElementById("scrollup").addEventListener("click", () => {
    document.body.scrollIntoView();
});