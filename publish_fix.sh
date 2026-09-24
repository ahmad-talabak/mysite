python3 -c "
f=open('ahmed-private-159357.html','r',encoding='utf-8').read()
if 'publishAuto' not in f:
    f=f.replace('</body>', '''
<div class=\"card\">
<button id=\"pubBtn\" class=\"btn\" onclick=\"publishAuto()\" style=\"background:#00ff88;color:#000\">📢 نشر اتوماتيك للجميع</button>
<div class=\"small\">اول مرة بطلب GitHub Token</div>
</div>
<script>
async function publishAuto(){
 let token=prompt('دخل GitHub Token:', localStorage.getItem('gh_token')||'');
 if(!token) return alert('لازم التوكن');
 localStorage.setItem('gh_token', token);
 let btn=document.getElementById('pubBtn');
 btn.innerText='جاري النشر...'; btn.disabled=true;
 try{
  let getRes=await fetch('https://api.github.com/repos/ahmad-talabak/mysite/contents/products.json');
  let getData=await getRes.json(); let sha=getData.sha;
  let content=btoa(unescape(encodeURIComponent(JSON.stringify(products,null,2))));
  let res=await fetch('https://api.github.com/repos/ahmad-talabak/mysite/contents/products.json',{
   method:'PUT',
   headers:{'Authorization':'token '+token,'Content-Type':'application/json'},
   body:JSON.stringify({message:'update products',content:content,sha:sha})
  });
  let data=await res.json();
  if(data.content){ alert('✅ اتنشر للجميع!'); }else{ alert('خطأ: '+JSON.stringify(data)); }
 }catch(e){ alert('خطأ: '+e.message); }
 btn.innerText='📢 نشر اتوماتيك للجميع'; btn.disabled=false;
}
</script>
</body>
''')
    open('ahmed-private-159357.html','w',encoding='utf-8').write(f)
    print('fixed')
"
