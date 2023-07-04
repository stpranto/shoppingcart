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
        const existingCartItem = cart.items.find(item => item.product.id === productId);
        if (existingCartItem) {
          existingCartItem.quantity += quantity;
        } else {
          cart.items.push({ product, quantity });
        }
        cart.totalAmount += product.price * quantity;
      });
      console.log(`Added ${quantities.length} ${product.name}(s) to the cart.`);
      displayCartItems();
    } else {
      console.log(`Product not found for ID ${productId}`);
    }
  };
  
  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (productId) => {
    const cartItem = cart.items.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
      cart.totalAmount += cartItem.product.price;
      displayCartItems();
    }
  };
  
  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (productId) => {
    const cartItem = cart.items.find(item => item.product.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cart.totalAmount -= cartItem.product.price;
      displayCartItems();
    }
  };
  
  // Function to remove an individual item from the cart
  const removeItem = (productId) => {
    const itemIndex = cart.items.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      const cartItem = cart.items[itemIndex];
      cart.totalAmount -= cartItem.product.price * cartItem.quantity;
      cart.items.splice(itemIndex, 1);
      displayCartItems();
    }
  };
  
  // Function to apply a discount to the cart
  const applyDiscount = (percentage) => {
    const discountAmount = (percentage / 100) * cart.totalAmount;
    cart.totalAmount -= discountAmount;
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
  
      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () => {
        increaseQuantity(product.id);
      });
      cartItemElement.appendChild(increaseButton);
  
      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () => {
        decreaseQuantity(product.id);
      });
      cartItemElement.appendChild(decreaseButton);
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeItem(product.id);
      });
      cartItemElement.appendChild(removeButton);
  
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
  
  // Attach event listener to "Apply Discount" button
  const applyDiscountButton = document.getElementById("apply-discount");
  applyDiscountButton.addEventListener("click", () => {
    const discountInput = document.getElementById("discount-percentage");
    const discountPercentage = parseFloat(discountInput.value);
    applyDiscount(discountPercentage);
    discountInput.value = ""; // Clear the discount input field
  });
  