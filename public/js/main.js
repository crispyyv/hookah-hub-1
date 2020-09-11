var openButton = document.querySelector(".openButton");
var content = document.querySelector(".content");
var menujs = document.querySelector(".mobile-menu");

openButton.onclick = function () {
    if (!document.querySelector(".openButton").classList.contains("openDone")) {

        openButton.classList.add("openDone");
        content.classList.toggle("content_active");
        menujs.style.cssText = "top : 50vh ";

    } else {
        openButton.classList.remove("openDone");
        content.classList.remove("content_active");
        menujs.style.cssText = "top : -999px ";
    }
};
