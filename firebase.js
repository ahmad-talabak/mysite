const API = "https://talabak-9dc1a-54707-default-rtdb.firebaseio.com";

async function getAll(path){
  let r = await fetch(`${API}/${path}.json`);
  let data = await r.json();
  if(!data) return [];
  return Object.keys(data).map(k=> ({...data[k], _id: k, id: k }));
}
async function create(path, obj){
  let r = await fetch(`${API}/${path}.json`, {
    method: "POST",
    body: JSON.stringify(obj)
  });
  let d = await r.json();
  return {...obj, _id: d.name, id: d.name};
}
async function update(path, id, obj){
  await fetch(`${API}/${path}/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(obj)
  });
}
async function del(path, id){
  await fetch(`${API}/${path}/${id}.json`, {method: "DELETE"});
}

const FirebaseDB = {
  async createStore(s){ return create("stores", s); },
  async getStores(){ return getAll("stores"); },
  async updateStore(id,s){ return update("stores", id, s); },
  async deleteStore(id){ return del("stores", id); },
  async createProduct(p){ return create("products", p); },
  async getProducts(){ return getAll("products"); },
  async getProductsByStore(sid){ 
    let all = await getAll("products");
    return all.filter(p=>p.storeId===sid);
  },
  async deleteProduct(id){ return del("products", id); }
};
