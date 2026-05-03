import { collection, addDoc, getDocs, query, where, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import realProducts from "../data/realProducts.json";

const PRODUCTS_COLLECTION = "products";

export const seedProducts = async (initialProducts, force = false) => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    
    if (force && !querySnapshot.empty) {
      console.log("Clearing existing products...");
      const deleteBatches = [];
      let dBatch = writeBatch(db);
      let dCount = 0;
      
      for (const document of querySnapshot.docs) {
        dBatch.delete(doc(db, PRODUCTS_COLLECTION, document.id));
        dCount++;
        if (dCount === 500) {
          deleteBatches.push(dBatch.commit());
          dBatch = writeBatch(db);
          dCount = 0;
        }
      }
      if (dCount > 0) deleteBatches.push(dBatch.commit());
      await Promise.all(deleteBatches);
    }

    if (querySnapshot.empty || force) {
      console.log(`Seeding ${initialProducts.length} products with Batch Write...`);
      const writeBatches = [];
      let wBatch = writeBatch(db);
      let wCount = 0;
      
      for (const product of initialProducts) {
        const docRef = doc(collection(db, PRODUCTS_COLLECTION));
        wBatch.set(docRef, {
          ...product,
          createdAt: new Date()
        });
        wCount++;
        if (wCount === 500) {
          writeBatches.push(wBatch.commit());
          wBatch = writeBatch(db);
          wCount = 0;
        }
      }
      if (wCount > 0) writeBatches.push(wBatch.commit());
      
      await Promise.all(writeBatches);
      console.log("Batch seeding complete!");
      return true;
    }
    return false;
  } catch (err) {
    console.error("Firebase seeding blocked (likely due to rules/permissions). Working offline.");
    throw err;
  }
};

export const forceSeedOnce = async (initialProducts) => {
  if (!localStorage.getItem('hasSeededV3')) {
    console.log("Running one-time force batch seed...");
    try {
      await seedProducts(initialProducts, true);
      localStorage.setItem('hasSeededV3', 'true');
    } catch(err) {
      console.error("Force seed failed (login required/permissions).");
    }
  }
};

export const getProducts = async (category = null) => {
  try {
    let q = collection(db, PRODUCTS_COLLECTION);
    if (category && category !== 'All') {
      q = query(q, where("category", "==", category));
    }
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (err) {
    console.error("Firebase fetch blocked, using local JSON fallback...");
  }
  
  // FALLBACK
  if (category && category !== 'All') {
    return realProducts.filter(p => p.category === category);
  }
  return realProducts;
};

export const getProductById = async (id) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, PRODUCTS_COLLECTION), where("id", "==", id)));
    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    }
  } catch (err) {
    console.error("Firebase fetch blocked, using local JSON fallback...");
  }
  
  // FALLBACK
  return realProducts.find(p => p.id === id) || null;
};

export const createOrder = async (orderData) => {
  return await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "Pending",
    createdAt: new Date(),
    trackingId: `SK-${Date.now()}`
  });
};
