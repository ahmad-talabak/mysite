const API = "https://crudcrud.com/api/b4a5c6d7e8f94a1b2c3d4e5f6a7b8c9d";
export const db = API;
export async function saveMerchant(data){
  let r = await fetch(API+"/merchants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  return await r.json();
}
export async function getMerchants(){
  let r = await fetch(API+"/merchants");
  return await r.json();
}
export async function updateMerchant(id,data){
  await fetch(API+"/merchants/"+id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
}
export async function deleteMerchant(id){
  await fetch(API+"/merchants/"+id,{method:"DELETE"});
}
