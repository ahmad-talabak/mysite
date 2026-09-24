let Cart = {
 get(){ return JSON.parse(localStorage.getItem('talabak_cart')||'[]') },
 save(c){ localStorage.setItem('talabak_cart', JSON.stringify(c)); updateCartCount() },
 add(p){ let c=this.get(); let f=c.find(x=>x._id===p._id); if(f)f.qty++; else c.push({...p,qty:1}); this.save(c); alert('تمت الاضافة للسلة ✅') },
 remove(id){ this.save(this.get().filter(x=>x._id!==id)) },
 clear(){ this.save([]) }
};
function updateCartCount(){ let c=Cart.get().reduce((s,x)=>s+x.qty,0); let el=document.getElementById('cartCount'); if(el)el.innerText=c>0?c:'' }
document.addEventListener('DOMContentLoaded',updateCartCount);
