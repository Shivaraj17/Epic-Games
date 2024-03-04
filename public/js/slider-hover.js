const hover = document.querySelectorAll(".hover");

function hoverEffect() {
    hover.forEach((slide, index) => {
        setTimeout(() => {
            slide.style.height = `${70}%`;
            slide.style.width = `${32}%`;
            slide.style.backgroundColor = "#717171";
            slide.style.borderRadius = "10px";
        }, index * 3000);
    });
}

function removeHoverEffect() {
    hover.forEach((slide, index) => {
        setTimeout(() => {
            slide.style.height = ``;
            slide.style.width = ``;
            slide.style.backgroundColor = "";
            slide.style.borderRadius = "";
        }, index * 3000);
    });
}

hoverEffect();

// Call removeHoverEffect after a delay to ensure that hoverEffect has finished
setTimeout(removeHoverEffect, 3000);

console.log(hover);






