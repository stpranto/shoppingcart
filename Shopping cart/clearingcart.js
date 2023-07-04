// Array of product objects
const products = [
    { id: 1, name: "Product 1", price: 10.00 },
    { id: 2, name: "Product 2", price: 15.00 },
    { id: 3, name: "Product 3", price: 20.00 },
    // Add more products as needed
  ];
  
  // Shopping cart object
  const cart = {
    items: [],
    totalAmount: 0.00,
  };
  
  // Function to find a product by ID
  const findProductById = (productId) => {
    return products.find(product => product.id === productId);
  };
  
  // Function to add a product to the shopping cart
  const addToCart = (productId, ...quantities) => {
    const product = findProductById(productId);
    if (product) {
      quantities.forEach(quantity => {
        cart.items.push({ product, quantity });
        cart.totalAmount += product.price * quantity;
      });
      console.log(`Added ${quantities.length} ${product.name}(s) to the cart.`);
      displayCartItems();
    } else {
      console.log(`Product not found for ID ${productId}`);
    }
  };
  
  // Function to clear the shopping cart
  const clearCart = () => {
    cart.items = [];
    cart.totalAmount = 0.00;
    displayCartItems();
  };
  
  // Function to display the cart items
  const displayCartItems = () => {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    
    cart.items.forEach(cartItem => {
      const { product, quantity } = cartItem;
      const itemTotal = product.price * quantity;
      
      const cartItemElement = document.createElement("li");
      cartItemElement.textContent = `${product.name} x ${quantity} - $${itemTotal.toFixed(2)}`;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    const totalAmountElement = document.getElementById("total-amount");
    totalAmountElement.textContent = cart.totalAmount.toFixed(2);
  };
  
  // Attach event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.productId);
      const quantityInput = document.getElementById(`quantity-${productId}`);
      const quantity = parseInt(quantityInput.value);
      addToCart(productId, quantity);
      quantityInput.value = ""; // Clear the quantity input field
    });
  });
  
  // Attach event listener to "Clear Cart" button
  const clearCartButton = document.getElementById("clear-cart");
  clearCartButton.addEventListener("click", () => {
    clearCart();
  });
  