import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYr7_SMI50nqQiEuAbjsDzXVkPSkB7qqI",
  authDomain: "talabak-9dc1a.firebaseapp.com",
  projectId: "talabak-9dc1a",
  storageBucket: "talabak-9dc1a.firebasestorage.app",
  messagingSenderId: "834566781172",
  appId: "1:834566781172:web:cabde4e4d5ccfbdac146a1",
  measurementId: "G-WTFZKB1Y8H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.FirebaseDB = {
  async getProducts(){
    try{
      const q = query(collection(db,"products"), orderBy("createdAt","desc"));
      const snap = await getDocs(q);
      return snap.docs.map(d=>({ _id:d.id, ...d.data() }));
    }catch(e){ console.error(e); return []; }
  },
  async addProduct(p){
    await addDoc(collection(db,"products"), {...p, createdAt: Date.now()});
  },
  async deleteProduct(id){
    await deleteDoc(doc(db,"products",id));
  },
  async getStores(){
    const snap = await getDocs(collection(db,"stores"));
    return snap.docs.map(d=>({ _id:d.id, ...d.data() }));
  },
  async addStore(s){
    await addDoc(collection(db,"stores"), s);
  }
};
console.log("🔥 Talabak REAL Firebase connected");
