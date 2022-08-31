/** adding logic for sidebar  */
/** show sidebar **/


var shop_toshow_sidebar = document.querySelector('.shop');
var exit_tohide_sidebar = document.querySelector('.exit');
var side_bar = document.getElementById("sideBar");



/** show sidebar **/ 
shop_toshow_sidebar.addEventListener('click', function(event) {
   
    side_bar.classList.remove("hide");
});


/** hide sidebar **/

exit_tohide_sidebar.addEventListener('click', function(event) {
   
    side_bar.classList.add("hide");
});

/** adding items on cart**/

const addToCart = document.getElementsByClassName('fa-cart-plus');

for(i=0;i<addToCart.length;i++)
{
    button = addToCart[i];
    button.addEventListener('click', addToCartClicked)
}

/* function to get the parent element of add to cart clicked */

function addToCartClicked (event) {
    button = event.target;
    var cartItem = button.parentElement;
    var price=cartItem.getElementsByClassName("item-price")[0].innerText;
    var image= cartItem.getElementsByClassName("item-image")[0].src;
    var title =  cartItem.getElementsByClassName("item-title")[0].innerText;
    addItemToCart(price,image,title);
    calculateItemPrice();
  
}

/* get the products container in sidebar */

var products_container = document.querySelector('.products');

function addItemToCart(price, image, title ){

    /* check if the element exist before on the side bar */
    var Cartimg = side_bar.getElementsByClassName("cart-image");

    for (var i = 0; i < Cartimg.length; i++){
        if (Cartimg[i].src == image){
          alert ('This item has already been added to the cart')
          return;
        }
      }
      
    var product_row= document.createElement('div');
    product_row.classList.add('product');
    /** create product row */
    var cartRowItems = `
    <img src="${image}" alt="" class="cart-image">
    <div class="product-definition">
        <h2 class="title">${title} </h2>
        <span class="price">${price}</span>
        <input type="number" class="input-qtte" placeholder="1" min="1" value="1">
    </div>
    <i class="fa-solid fa-trash delete"></i>
        
      `
      /* adding product on the products container */
       product_row.innerHTML = cartRowItems;
       //product_row.getElementsByClassName('input-qtte')[0].value=1;
       products_container.append(product_row);
       product_row.getElementsByClassName('delete')[0].addEventListener('click', deleteItemFromCart);
       product_row.getElementsByClassName('input-qtte')[0].addEventListener('change', calculateItemPrice);
       
     
       
      }

/** delete item from product list**/

const delete_icon =document.getElementsByClassName('delete');

for(i=0;i<delete_icon.length;i++)
{
    button = delete_icon[i];
    button.addEventListener('click', deleteItemFromCart)
}

function deleteItemFromCart(event){
    btnClicked = event.target
    btnClicked.parentElement.remove();
    calculateItemPrice();
}


/* Calculating Price */

// Update input value

var input_quantity=document.getElementsByClassName("input-qtte");

for(i=0;i<input_quantity.length;i++)
{
    button = input_quantity[i];
    button.addEventListener('change', calculateItemPrice)
}


var product_row = document.getElementsByClassName("product");

function calculateItemPrice(){
   
    var total =0;
    
    for(i=0; i<product_row.length;i++){
        console.log(product_row[i]);
        var price = product_row[i].getElementsByClassName("price")[0].innerText;
        var quantity= product_row[i].getElementsByClassName("input-qtte")[0].value;
        // update the total price
        var parse_price = parseFloat(price.replace('$', ''))
        result=parse_price*quantity
        total+=result
    }
   
   document.getElementsByClassName("total-price")[0].innerText=total;
}



