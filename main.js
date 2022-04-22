let carts = document.querySelectorAll('.add-cart');

let products = [ 
    //01
    {
        name: "pizza um",
        tag: "pizzaum",
        price: 10,
        inCart: 0
    },
    //02
    {
        name: "pizza dois",
        tag: "pizzadois",
        price: 15,
        inCart: 0
    },
    //03
    {
        name: "pizza tres",
        tag: "pizzatres",
        price: 20,
        inCart: 0
    },
    //04
    {
        name: "pizza quatro",
        tag: "pizzaquatro",
        price: 25,
        inCart: 0
    },
    //05
    {
        name: "pizza cinco",
        tag: "pizzacinco",
        price: 35,
        inCart: 0
    },
    //06
    {
        name: "pizza seis",
        tag: "pizzaseis",
        price: 45,
        inCart: 0
    },
    //07
    {
        name: "batata frita um",
        tag: "batatafritaum",
        price: 45,
        inCart: 0
    },
    //08
    {
        name: "batata frita pepper",
        tag: "batatafritapepper",
        price: 45,
        inCart: 0
    },
    //09
    {
        name: "batata frita tres",
        tag: "batatafritatres",
        price: 45,
        inCart: 0
    },
    //10
    {
        name: "batata frita quatro",
        tag: "batatafritaquatro",
        price: 45,
        inCart: 0
    },
    //11
    {
        name: "coca-cola",
        tag: "coca-cola",
        price: 5,
        inCart: 0
    },
    //12
    {
        name: "Agua",
        tag: "agua",
        price: 2,
        inCart: 0
    },
    //13
    {
        name: "Suco",
        tag: "suco",
        price: 45,
        inCart: 0
    },
    //14
    {
        name: "fanta",
        tag: "fanta",
        price: 45,
        inCart: 0
    },
    //15
    {
        name: "resfreco",
        tag: "resfreco",
        price: 45,
        inCart: 0
    },
    //16
    {
        name: "HdoisO",
        tag: "hdoiso",
        price: 45,
        inCart: 0
    },
    //17
    {
        name: "",
        tag: "",
        price: 45,
        inCart: 0
    },
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCost')
    
    //console.log(cartItems)
    if(cartItems && productContainer){
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
        <div class="org-cart">
            <div class="product">
                <img src="icones/trash-black.png" class="trash-cart">
                <div class="d-flex flex-column">
                    <img src="./imagens/${item.tag}.jpg" class="img-in-cart">
                    <span class="name-org-cart"> ${item.name}</span>
                </div>
            </div>
            <div class="price">R$ ${item.price},00</div>
            <div class="quantity">
            <img src="icones/icon-plus-black.png" class="count count-plus increase">
            <span> ${item.inCart} </span>
            <img src="icones/minus-.png" class="count count-minus decrease">
            </div>
       
            <div class="total text-center">
                R$ ${item.inCart * item.price},00
            </div>
        </div>
            `
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle text-center">
                    Valor total:
                </h4>
                <h4 class="basketTotal text-center">
                    R$ ${cartCost},00
                </h4>
            </div>
        `
    }
    deleteButtons()
    manageQuantity();
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            manageQuantity();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product .trash-cart');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

//Fazendo o pedido com txt no whatsapp

// function pedidowhats(){

//    }



console.log(products)

onLoadCartNumbers();
displayCart();