async function fetchProducts() {
  try {
    const res = await fetch("https://www.swastikkits.com/api/products");
    const data = await res.json();
    console.log("Keys:", Object.keys(data));
    if (data.products) {
      console.log(`Found ${data.products.length} products`);
      console.log("Sample product:", data.products[0]);
    } else if (Array.isArray(data)) {
      console.log(`Found array of ${data.length} items`);
      console.log("Sample:", data[0]);
    } else {
      console.log("Data:", data);
    }
  } catch (err) {
    console.error("Failed:", err.message);
  }
}
fetchProducts();
