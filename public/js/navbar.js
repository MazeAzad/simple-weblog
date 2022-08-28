
const menue = document.querySelector(".menue-nav");
const hiddenNav = document.querySelector(".hidden-nav");
 menue.addEventListener("click", () => {
  hiddenNav.classList.toggle("menueEffect");
});
const closes=document.querySelectorAll(".close");
 
const closeArray=Array.from(closes);
 
const errors=document.querySelectorAll(".error");
const errorsArray=Array.from(errors);

closeArray.forEach((close)=>{
  close.addEventListener("click",()=>{
   close.parentElement.style.display="none";
  })
})
 