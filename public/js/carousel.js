const slider = document.querySelectorAll(".slider");
count=0;
direction =1;

slider.forEach((slide,index) =>{
    slide.style.left = `${index *100}%`
})
function slidershow(){
    count += direction;
    if(count === slider.length || count<0){
        direction *= -1;
        count += direction;
    }
    slider.forEach((slide)=>{
        slide.style.transform =`translateX(-${count * 100}%)`
    })
}

setInterval(slidershow,3000)

console.log(slider)