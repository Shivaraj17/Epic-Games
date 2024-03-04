const nav = document.querySelector("nav");
const burger = document.querySelector("#burger");
const navUl = document.querySelector(".logo nav ul");

burger.addEventListener("click", () => {
    navUl.classList.toggle("active");
});