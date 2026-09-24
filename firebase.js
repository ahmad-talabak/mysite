import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase, ref, push, set, get, remove, child } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYr7_SMI50nqQiEuAbjsDzXVkPSkB7qqI",
  authDomain: "talabak-9dc1a.firebaseapp.com",
  projectId: "talabak-9dc1a",
  storageBucket: "talabak-9dc1a.firebasestorage.app",
  messagingSenderId: "834566781172",
  appId: "1:834566781172:web:cabde4e4d5ccfbdac146a1",
  measurementId: "G-WTFZKB1Y8H",
  databaseURL: "https://talabak-9dc1a-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.FirebaseDB = {
  async getProducts(){
    try{
      const snap = await get(child(ref(db), 'products'));
      if(!snap.exists()) return [];
      const data = snap.val();
      return Object.keys(data).map(k=>({ _id:k,...data[k] })).reverse();
    }catch(e){ console.error(e); return []; }
  },
  async addProduct(p){
    const newRef = push(ref(db, 'products'));
    await set(newRef, {...p, createdAt: Date.now()});
  },
  async deleteProduct(id){
    await remove(ref(db, 'products/'+id));
  },
  async getStores(){ return [] },
  async addStore(s){}
};
console.log("🔥 Talabak REALTIME DB connected - NO BILLING");
