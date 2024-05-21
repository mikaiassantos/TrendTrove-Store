// Selecionar os elementos da interface do carrinho
let cartIcon = document.querySelector("#cart-icon"); // Ícone do carrinho
let cart = document.querySelector(".cart"); // Área do carrinho
let closeCart = document.querySelector("#close-cart"); // Ícone para fechar o carrinho

// Quando o ícone do carrinho é clicado, mostra o carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// Quando o ícone para fechar o carrinho é clicado, esconde o carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Verifica o estado do documento (carregando ou carregado)
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Função chamada quando o documento está carregado
function ready() {
    // Adiciona event listeners para os botões "Remove" em cada item do carrinho
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Adiciona event listeners para as mudanças na quantidade de itens no carrinho
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Adiciona event listeners para os botões "Add to Cart" em cada produto
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Adiciona um event listener para o botão "Buy" que finaliza o pedido
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
}

// Função chamada quando o botão "Buy" é clicado
function buyButtonClicked() {
    alert('Seu pedido foi feito!');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Função para remover um item do carrinho
function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartBox = buttonClicked.parentElement;
    cartBox.remove();
    updateTotal();
}

// Função chamada quando a quantidade de um item no carrinho é alterada
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Função chamada quando o botão "Add to Cart" é clicado para adicionar um produto ao carrinho
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

// Função para adicionar um produto ao carrinho
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("Você já adicionou este item ao carrinho");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Função para atualizar o total dos itens no carrinho
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = total.toFixed(2);
    document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
}