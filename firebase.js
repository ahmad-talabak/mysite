import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase, ref, push, set, get, remove, child } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAYr7_SMI50nqQiEuAbjsDzXVkPSkB7qqI",
  authDomain: "talabak-9dc1a.firebaseapp.com",
  databaseURL: "https://talabak-9dc1a-default-rtdb.firebaseio.com",
  projectId: "talabak-9dc1a",
  storageBucket: "talabak-9dc1a.firebasestorage.app",
  messagingSenderId: "834566781172",
  appId: "1:834566781172:web:6ee803c7d8491e3ac146a1",
  measurementId: "G-H7WQL6Q3ZD"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
window.FirebaseDB = {
  async getProducts(){
    try{
      const snap = await get(child(ref(db), 'products'));
      if(!snap.exists()) return [];
      const val = snap.val();
      return Object.keys(val).map(k=>({_id:k,...val[k]})).reverse();
    }catch(e){console.log("DB not ready, using local",e); let p=localStorage.getItem('talabak_products'); return p?JSON.parse(p):[]}
  },
  async addProduct(prod){
    try{
      const r = push(ref(db,'products'));
      await set(r,{...prod,createdAt:Date.now()});
      console.log("✅ Saved to cloud");
    }catch(e){
      console.log("Cloud fail, saving local",e);
      let arr=JSON.parse(localStorage.getItem('talabak_products')||'[]');
      arr.unshift({_id:Date.now().toString(),...prod});
      localStorage.setItem('talabak_products',JSON.stringify(arr));
    }
  },
  async deleteProduct(id){
    try{ await remove(ref(db,'products/'+id)); }catch(e){
      let arr=JSON.parse(localStorage.getItem('talabak_products')||'[]');
      arr=arr.filter(x=>x._id!=id);
      localStorage.setItem('talabak_products',JSON.stringify(arr));
    }
  },
  async getStores(){return []}, async addStore(){}
};
