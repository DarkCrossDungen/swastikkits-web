import fs from 'fs';

async function fetchAndSave() {
  try {
    console.log("Fetching live catalog...");
    const res = await fetch("https://www.swastikkits.com/api/products");
    const data = await res.json();
    
    if (!data.products) {
      throw new Error("No products array found in response");
    }

    const products = data.products.map((p, index) => {
      const price = p.offer_price || p.price;
      const originalPrice = p.price;
      const discount = (originalPrice > price) ? Math.round((1 - price / originalPrice) * 100) : 0;
      
      return {
        id: (index + 1).toString(), // Using string ID for consistency
        code: p.product_code || `SKU-${index}`,
        name: p.name,
        category: p.category || 'Components',
        price: price,
        originalPrice: originalPrice,
        discount: discount > 0 ? `${discount}%` : null,
        description: `High quality ${p.name} for all your electronic, DIY, and robotic projects. Tested for quality and reliability.`,
        image: p.image || null,
        specifications: {
          "Model Code": p.product_code || "N/A",
          "Category": p.category || "Components",
          "Quality": "Tested and Verified",
          "Warranty": "Not Applicable",
          "Return Policy": "7 Days Replacement"
        }
      };
    });

    console.log(`Successfully mapped ${products.length} products.`);
    fs.writeFileSync('./src/data/realProducts.json', JSON.stringify(products, null, 2));
    console.log("Saved to src/data/realProducts.json");
    
  } catch (err) {
    console.error("Failed:", err.message);
  }
}
fetchAndSave();
