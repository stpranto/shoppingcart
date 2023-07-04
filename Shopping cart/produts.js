// Array of product objects
const products = [
    { id: 1, name: "Product 1", price: 10.00 },
    { id: 2, name: "Product 2", price: 15.00 },
    { id: 3, name: "Product 3", price: 20.00 },
    // Add more products as needed
  ];
  
  // Function to find a product by ID
  const findProductById = (productId) => {
    return products.find(product => product.id === productId);
  };
  
  // Example usage
  const productId = 2;
  const product = findProductById(productId);
  if (product) {
    console.log(`Product found: ${product.name} - $${product.price}`);
  } else {
    console.log(`Product not found for ID ${productId}`);
  }
  