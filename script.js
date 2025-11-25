const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const cartToggle = document.getElementById("cart-toggle");
const cartItems = document.getElementById("cart-items");
const checkOutBtn = document.querySelector(".check-out")
const cartThings = document.querySelector(".cart-itms")
const cartThing = document.querySelector(".item")
const total = document.querySelector(".total")
const exploreBtn = document.querySelector("#explore-btn")
const addToCartBtn = document.querySelectorAll(".add-to-cart")
const span = document.querySelector("span")


let pros = (JSON.parse(localStorage.getItem("pro"))) || []

document.addEventListener("DOMContentLoaded", loadData)


cartToggle.addEventListener("click", () => {
cartItems.classList.toggle("active")   
});

menuToggle.addEventListener("click", () =>{
nav.classList.toggle("active"); 
});

exploreBtn.addEventListener("click", () =>{
window.scrollBy({
top: 750,
behavior: "smooth"
})
})



let totalPrice = 0;

function calculateTotal(product){
totalPrice += product.price
total.innerText = `Total: $${totalPrice}`
}

addToCartBtn.forEach((btn) =>{
btn.addEventListener("click", ()=>{
let parentElement = btn.parentElement
const product = {
image: parentElement.querySelector("img").src,
icolor: parentElement.querySelector(".color").innerText,
price: parseFloat(parentElement.querySelector(".price").innerText.replace("$", "" ))
}

 addItemToCart(product)

 pros.push(product)
localStorage.setItem("pro", JSON.stringify(pros))
calculateTotal(product)
})
})


function addItemToCart(product){
cartThings.insertAdjacentHTML("afterbegin",
`<div class="item">
    <img src ="${product.image}">
     <h3 class="price-item">$${product.price}</h3>
     <p class="color">${product.icolor}</p>
    <button class="remove-item">❌️</button>
  </div>   
`
)
}


document.addEventListener("click", (e) =>{
if(e.target.classList.contains("remove-item")){
const item = e.target.closest(".item")
const price = parseFloat(item.querySelector(".price-item").innerText.replace("$", "") )
totalPrice -= price;
total.innerText = `Total: $${totalPrice}`;

let index = pros.findIndex(p => p.price === price)
if(index !== -1){
  pros.splice(index,1)
}

localStorage.setItem("pro", JSON.stringify(pros))
item.remove()
}
})


function loadData () {
  if (pros.length > 0){
  pros.forEach( product =>{
    addItemToCart(product)
   calculateTotal(product)
  }) 
  }
}
 


checkOutBtn.addEventListener("click", ()=>{
if(total.innerText === "Total: $0"){
alert("nothing to check!")
}else{
alert("checking....")
setTimeout( ()=>{
alert("Done ✅️")
},1000)
}
cartItems.classList.toggle("active")
localStorage.clear()
location.reload()
})